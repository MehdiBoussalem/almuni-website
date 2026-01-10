from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from .database import engine, Base, get_db
from . import models, schemas, crud

from fastapi.middleware.cors import CORSMiddleware


models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Configuration CORS
origins = [
    "http://localhost:5500",
    "http://127.0.0.1:5500",
    "http://localhost:5501",
    "http://127.0.0.1:5501",
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
