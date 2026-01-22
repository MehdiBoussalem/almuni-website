from fastapi import FastAPI, Depends, HTTPException, UploadFile, File, Form, Query
from typing import Optional
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session
from .database import engine, Base, get_db
from . import models, schemas, crud

from fastapi.middleware.cors import CORSMiddleware
import os
import uuid


models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Créer le dossier pour les uploads
UPLOAD_DIR = "uploads/tshirts"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# Configuration CORS
origins = [
    "https://alumni-ingemedia.net",
    "https://www.alumni-ingemedia.net",
    "http://alumni-ingemedia.net",
    "http://www.alumni-ingemedia.net",
    "http://37.59.115.57",
    "http://localhost:5173",  # Vite dev server
    "http://127.0.0.1:5173",  # Vite dev server (alternative)
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"message": "Bienvenue sur l'API Alumni!"}


# ========== ENDPOINTS STAGES ==========
@app.post("/stages/", response_model=schemas.Stage)
def create_stage(stage: schemas.StageCreate, db: Session = Depends(get_db)):
    # Vérifier si l'id externe existe déjà
    existing = crud.get_stage_by_external_id(
        db, stage_id_externe=stage.stage_id_externe
    )
    if existing:
        raise HTTPException(
            status_code=400, detail="Ce stage avec cet ID externe existe déjà"
        )
    return crud.create_stage(db=db, stage=stage)


@app.get("/stages/", response_model=list[schemas.Stage])
def read_stages(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_stages(db, skip=skip, limit=limit)


@app.get("/stages/search", response_model=schemas.PaginatedStages)
def search_stages(
    q: Optional[str] = Query(None),
    type: Optional[str] = Query(None, alias="type"),
    city: Optional[str] = Query(None),
    enterprise: Optional[str] = Query(None),
    skip: int = 0,
    limit: int = 25,
    db: Session = Depends(get_db),
):
    total, items = crud.search_stages(
        db,
        q=q,
        type_filter=type,
        city=city,
        enterprise=enterprise,
        skip=skip,
        limit=limit,
    )
    return {"total": total, "items": items}


@app.get("/stages/count")
def count_stages(db: Session = Depends(get_db)):
    count = crud.count_stages(db)
    return {"count": count}


@app.get("/stages/{stage_id}", response_model=schemas.Stage)
def read_stage(stage_id: int, db: Session = Depends(get_db)):
    stage = crud.get_stage(db, stage_id=stage_id)
    if stage is None:
        raise HTTPException(status_code=404, detail="Stage non trouvé")
    return stage


@app.put("/stages/{stage_id}", response_model=schemas.Stage)
def update_stage(
    stage_id: int, stage: schemas.StageCreate, db: Session = Depends(get_db)
):
    updated = crud.update_stage(db, stage_id=stage_id, stage=stage)
    if updated is None:
        raise HTTPException(status_code=404, detail="Stage non trouvé")
    return updated


@app.delete("/stages/{stage_id}")
def delete_stage(stage_id: int, db: Session = Depends(get_db)):
    deleted = crud.delete_stage(db, stage_id=stage_id)
    if deleted is None:
        raise HTTPException(status_code=404, detail="Stage non trouvé")
    return {"message": "Stage supprimé"}


@app.get("/stages/{stage_id}/related-alumnis", response_model=list[schemas.Alumni])
def get_stage_related_alumnis(
    stage_id: int,
    threshold: int = Query(
        70, ge=0, le=100, description="Score de similarité minimum (0-100)"
    ),
    db: Session = Depends(get_db),
):
    """
    Retourne les alumnis travaillant dans une entreprise similaire au stage (fuzzy matching)

    Args:
        stage_id: ID du stage
        threshold: Score minimum de similarité (défaut: 70%)

    Returns:
        Liste d'alumnis à contacter
    """
    stage = crud.get_stage(db, stage_id=stage_id)
    if stage is None:
        raise HTTPException(status_code=404, detail="Stage non trouvé")

    if not stage.entreprise:
        return []

    alumnis = crud.find_matching_alumnis(
        db, company=stage.entreprise, threshold=threshold
    )
    return alumnis


# ========== ENDPOINTS ALUMNIS ==========
@app.post("/alumnis/", response_model=schemas.Alumni)
def create_alumni(alumni: schemas.AlumniCreate, db: Session = Depends(get_db)):
    return crud.create_alumni(db=db, alumni=alumni)


@app.get("/alumnis/", response_model=list[schemas.Alumni])
def read_alumnis(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_alumnis(db, skip=skip, limit=limit)


@app.get("/alumnis/search", response_model=schemas.PaginatedAlumnis)
def search_alumnis(
    q: Optional[str] = Query(None),
    skip: int = 0,
    limit: int = 25,
    db: Session = Depends(get_db),
):
    total, items = crud.search_alumnis(db, q=q, skip=skip, limit=limit)
    return {"total": total, "items": items}


@app.get("/alumnis/{alumni_id}", response_model=schemas.Alumni)
def read_alumni(alumni_id: int, db: Session = Depends(get_db)):
    alumni = crud.get_alumni(db, alumni_id=alumni_id)
    if alumni is None:
        raise HTTPException(status_code=404, detail="Alumni non trouvé")
    return alumni


@app.put("/alumnis/{alumni_id}", response_model=schemas.Alumni)
def update_alumni(
    alumni_id: int, alumni: schemas.AlumniCreate, db: Session = Depends(get_db)
):
    updated = crud.update_alumni(db, alumni_id=alumni_id, alumni=alumni)
    if updated is None:
        raise HTTPException(status_code=404, detail="Alumni non trouvé")
    return updated


@app.delete("/alumnis/{alumni_id}")
def delete_alumni(alumni_id: int, db: Session = Depends(get_db)):
    deleted = crud.delete_alumni(db, alumni_id=alumni_id)
    if deleted is None:
        raise HTTPException(status_code=404, detail="Alumni non trouvé")
    return {"message": "Alumni supprimé"}


# ========== ENDPOINTS STATISTIQUES ==========
@app.get("/stats/companies")
def get_grouped_companies(threshold: int = Query(85), db: Session = Depends(get_db)):
    """
    Retourne le top 5 des entreprises regroupées par similarité (fuzzy matching)

    Args:
        threshold: score minimum pour regrouper (défaut 85%)

    Returns:
        Liste: [{"nom": "Orange", "count": 15, "variations": ["Orange", "Orange Business"]}, ...]
    """
    return crud.get_grouped_companies_stats(db, threshold=threshold)


@app.get("/stats/jobs")
def get_grouped_jobs(threshold: int = Query(80), db: Session = Depends(get_db)):
    """
    Retourne le top 12 des métiers regroupés par similarité (fuzzy matching)

    Args:
        threshold: score minimum pour regrouper (défaut 80%)

    Returns:
        Liste: [{"nom": "Développeur Web", "count": 25, "variations": [...]}, ...]
    """
    return crud.get_grouped_jobs_stats(db, threshold=threshold)


# ========== ENDPOINTS INSCRITS SOIREE ==========
@app.post("/inscrits-soiree/", response_model=schemas.InscritSoiree)
def create_inscription_soiree(
    inscrit: schemas.InscritSoireeCreate, db: Session = Depends(get_db)
):
    # Vérifier si l'email existe déjà
    existing = crud.get_inscrit_by_mail(db, mail=inscrit.mail)
    if existing:
        raise HTTPException(
            status_code=400, detail="Cette adresse email est déjà inscrite"
        )

    return crud.create_inscrit_soiree(db=db, inscrit=inscrit)


@app.get("/inscrits-soiree/", response_model=list[schemas.InscritSoiree])
def read_inscrits_soiree(
    skip: int = 0, limit: int = 1000, db: Session = Depends(get_db)
):
    return crud.get_inscrits_soiree(db, skip=skip, limit=limit)


@app.get("/inscrits-soiree/count")
def count_inscrits_soiree(db: Session = Depends(get_db)):
    count = crud.count_inscrits_soiree(db)
    return {"count": count}


@app.put("/inscrits-soiree/{inscrit_id}", response_model=schemas.InscritSoiree)
def update_inscription_soiree(
    inscrit_id: int, inscrit: schemas.InscritSoireeCreate, db: Session = Depends(get_db)
):
    updated = crud.update_inscrit_soiree(db, inscrit_id=inscrit_id, inscrit=inscrit)
    if updated is None:
        raise HTTPException(status_code=404, detail="Inscription non trouvée")
    return updated


@app.delete("/inscrits-soiree/{inscrit_id}")
def delete_inscription_soiree(inscrit_id: int, db: Session = Depends(get_db)):
    deleted = crud.delete_inscrit_soiree(db, inscrit_id=inscrit_id)
    if deleted is None:
        raise HTTPException(status_code=404, detail="Inscription non trouvée")
    return {"message": "Inscription supprimée"}


# ========== ENDPOINTS TSHIRTS ==========
@app.post("/tshirts/", response_model=schemas.Tshirt)
async def upload_tshirt(
    file: UploadFile = File(...),
    nom: str = Form(...),
    prenom: str = Form(...),
    description: str = Form(None),
    db: Session = Depends(get_db),
):
    # Validation du type de fichier
    allowed_types = ["image/jpeg", "image/png", "image/jpg", "image/webp"]
    if file.content_type not in allowed_types:
        raise HTTPException(
            status_code=400,
            detail="Format d'image non supporté (JPEG, PNG, WebP uniquement)",
        )

    # Validation de la taille (5MB max)
    content = await file.read()
    if len(content) > 5 * 1024 * 1024:
        raise HTTPException(status_code=400, detail="Fichier trop volumineux (max 5MB)")

    # Générer un nom unique pour le fichier
    file_extension = file.filename.split(".")[-1]
    unique_filename = f"{uuid.uuid4()}.{file_extension}"
    file_path = os.path.join(UPLOAD_DIR, unique_filename)

    # Sauvegarder le fichier
    with open(file_path, "wb") as buffer:
        buffer.write(content)

    # Créer l'entrée en base de données
    tshirt_data = schemas.TshirtCreate(nom=nom, prenom=prenom, description=description)
    return crud.create_tshirt(
        db=db, tshirt=tshirt_data, image_path=f"/uploads/tshirts/{unique_filename}"
    )


@app.get("/tshirts/", response_model=list[schemas.Tshirt])
def get_tshirts(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_tshirts(db, skip=skip, limit=limit)


@app.get("/tshirts/{tshirt_id}", response_model=schemas.Tshirt)
def get_tshirt(tshirt_id: int, db: Session = Depends(get_db)):
    tshirt = crud.get_tshirt(db, tshirt_id=tshirt_id)
    if tshirt is None:
        raise HTTPException(status_code=404, detail="Tshirt non trouvé")
    return tshirt


@app.delete("/tshirts/{tshirt_id}")
def delete_tshirt(tshirt_id: int, db: Session = Depends(get_db)):
    deleted = crud.delete_tshirt(db, tshirt_id=tshirt_id)
    if deleted is None:
        raise HTTPException(status_code=404, detail="Tshirt non trouvé")

    # Supprimer aussi le fichier physique
    if deleted.image_path:
        file_path = deleted.image_path.replace("/uploads/", "uploads/")
        if os.path.exists(file_path):
            os.remove(file_path)

    return {"message": "Tshirt supprimé avec succès"}


@app.delete("/tshirts/")
def delete_all_tshirts(db: Session = Depends(get_db)):
    deleted_count = crud.delete_all_tshirts(db)

    # Supprimer tous les fichiers du dossier
    if os.path.exists(UPLOAD_DIR):
        for filename in os.listdir(UPLOAD_DIR):
            file_path = os.path.join(UPLOAD_DIR, filename)
            if os.path.isfile(file_path):
                os.remove(file_path)

    return {"message": f"{deleted_count} tshirt(s) supprimé(s)", "count": deleted_count}


# ========== MONTAGE DES FICHIERS STATIQUES ==========
# Important : doit être fait APRÈS toutes les routes
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")
