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


# ========== ENDPOINTS ENTREPRISES ==========
@app.post("/entreprises/", response_model=schemas.Entreprise)
def create_entreprise(
    entreprise: schemas.EntrepriseCreate, db: Session = Depends(get_db)
):
    return crud.create_entreprise(db=db, entreprise=entreprise)


@app.get("/entreprises/", response_model=list[schemas.Entreprise])
def read_entreprises(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_entreprises(db, skip=skip, limit=limit)


@app.get("/entreprises/{entreprise_id}", response_model=schemas.Entreprise)
def read_entreprise(entreprise_id: int, db: Session = Depends(get_db)):
    entreprise = crud.get_entreprise(db, entreprise_id=entreprise_id)
    if entreprise is None:
        raise HTTPException(status_code=404, detail="Entreprise non trouvée")
    return entreprise


@app.put("/entreprises/{entreprise_id}", response_model=schemas.Entreprise)
def update_entreprise(
    entreprise_id: int,
    entreprise: schemas.EntrepriseCreate,
    db: Session = Depends(get_db),
):
    updated = crud.update_entreprise(
        db, entreprise_id=entreprise_id, entreprise=entreprise
    )
    if updated is None:
        raise HTTPException(status_code=404, detail="Entreprise non trouvée")
    return updated


@app.delete("/entreprises/{entreprise_id}")
def delete_entreprise(entreprise_id: int, db: Session = Depends(get_db)):
    deleted = crud.delete_entreprise(db, entreprise_id=entreprise_id)
    if deleted is None:
        raise HTTPException(status_code=404, detail="Entreprise non trouvée")
    return {"message": "Entreprise supprimée"}


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


# ========== ENDPOINTS OFFRES DE STAGE ==========
@app.post("/offres-stage/", response_model=schemas.OffreStage)
def create_offre_stage(offre: schemas.OffreStageCreate, db: Session = Depends(get_db)):
    return crud.create_offre_stage(db=db, offre=offre)


@app.get("/offres-stage/", response_model=list[schemas.OffreStage])
def read_offres_stage(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_offres_stage(db, skip=skip, limit=limit)


@app.get("/offres-stage/{offre_id}", response_model=schemas.OffreStage)
def read_offre_stage(offre_id: int, db: Session = Depends(get_db)):
    offre = crud.get_offre_stage(db, offre_id=offre_id)
    if offre is None:
        raise HTTPException(status_code=404, detail="Offre de stage non trouvée")
    return offre


@app.put("/offres-stage/{offre_id}", response_model=schemas.OffreStage)
def update_offre_stage(
    offre_id: int, offre: schemas.OffreStageCreate, db: Session = Depends(get_db)
):
    updated = crud.update_offre_stage(db, offre_id=offre_id, offre=offre)
    if updated is None:
        raise HTTPException(status_code=404, detail="Offre de stage non trouvée")
    return updated


@app.delete("/offres-stage/{offre_id}")
def delete_offre_stage(offre_id: int, db: Session = Depends(get_db)):
    deleted = crud.delete_offre_stage(db, offre_id=offre_id)
    if deleted is None:
        raise HTTPException(status_code=404, detail="Offre de stage non trouvée")
    return {"message": "Offre de stage supprimée"}

# ========== ENDPOINTS ETUDIANTS ===    

@app.post("/etudiant/", response_model=schemas.Etudiant)
def create_etudiant(etudiant: schemas.EtudiantCreate, db: Session = Depends(get_db)):
    return crud.create_etudiant(db=db, etudiant=etudiant)

@app.get("/etudiants/", response_model=list[schemas.Etudiant])
def read_etudiants(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_etudiants(db, skip=skip, limit=limit)

@app.get("/etudiant/{etudiant_id}", response_model=schemas.Etudiant)
def read_etudiant(etudiant_id: int, db: Session = Depends(get_db)):
    etudiant = crud.get_etudiant(db, etudiant_id=etudiant_id)
    if etudiant is None:
        raise HTTPException(status_code=404, detail="Etudiant non trouvé")
    return etudiant

@app.patch("/etudiant/{etudiant_id}", response_model=schemas.Etudiant)
def update_etudiant(
    etudiant_id: int, etudiant: schemas.EtudiantUpdate, db: Session = Depends(get_db)
):
    updated = crud.update_etudiant(db, etudiant_id=etudiant_id, etudiant=etudiant)
    if updated is None:
        raise HTTPException(status_code=404, detail="Etudiant non trouvé")
    return updated

@app.delete("/etudiant/{etudiant_id}")
def delete_etudiant(etudiant_id: int, db: Session = Depends(get_db)):
    deleted = crud.delete_etudiant(db, etudiant_id=etudiant_id)
    if deleted is None:
        raise HTTPException(status_code=404, detail="Etudiant non trouvé")
    return {"message": "Etudiant supprimé"}


@app.get("/etudiants/soiree/count")
def count_etudiants_soiree(db: Session = Depends(get_db)):
    count = crud.count_etudiants_soiree(db)
    return {"count": count}


@app.get("/etudiants/soiree", response_model=list[schemas.Etudiant])
def read_etudiants_soiree(
    skip: int = 0, limit: int = 100, db: Session = Depends(get_db)
):
    return crud.get_etudiants_soiree(db, skip=skip, limit=limit)

@app.get("/etudiants/recognize", response_model=schemas.Etudiant)
def recognize_etudiant(
    mail: str, numero_etudiant: str, db: Session = Depends(get_db)
):
    etudiant = crud.get_etudiant_by_mail_and_numero(
        db, mail=mail, numero_etudiant=numero_etudiant
    )
    if etudiant is None:
        raise HTTPException(status_code=404, detail="Etudiant non trouvé")
    return etudiant


@app.patch("/etudiants/inscription", response_model=schemas.Etudiant)
def inscrire_etudiant(
    inscription: schemas.EtudiantInscription, db: Session = Depends(get_db)
):
    etudiant = crud.get_etudiant_by_mail_and_numero(
        db, mail=inscription.mail, numero_etudiant=inscription.numero_etudiant
    )
    if etudiant is None:
        raise HTTPException(status_code=404, detail="Etudiant non trouvé")

    etudiant_update = schemas.EtudiantUpdate(soiree=True)
    updated_etudiant = crud.update_etudiant(
        db, etudiant_id=etudiant.id, etudiant=etudiant_update
    )
    return updated_etudiant


@app.patch("/etudiants/desinscription", response_model=schemas.Etudiant)
def desinscrire_etudiant(
    inscription: schemas.EtudiantInscription, db: Session = Depends(get_db)
):
    etudiant = crud.get_etudiant_by_mail_and_numero(
        db, mail=inscription.mail, numero_etudiant=inscription.numero_etudiant
    )
    if etudiant is None:
        raise HTTPException(status_code=404, detail="Etudiant non trouvé")

    etudiant_update = schemas.EtudiantUpdate(soiree=False)
    updated_etudiant = crud.update_etudiant(
        db, etudiant_id=etudiant.id, etudiant=etudiant_update
    )
    return updated_etudiant





