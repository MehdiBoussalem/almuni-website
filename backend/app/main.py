from fastapi import FastAPI, Depends, HTTPException, UploadFile, File, Form
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


# ========== ENDPOINTS ALUMNIS ==========
@app.post("/alumnis/", response_model=schemas.Alumni)
def create_alumni(alumni: schemas.AlumniCreate, db: Session = Depends(get_db)):
    return crud.create_alumni(db=db, alumni=alumni)


@app.get("/alumnis/", response_model=list[schemas.Alumni])
def read_alumnis(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_alumnis(db, skip=skip, limit=limit)


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
