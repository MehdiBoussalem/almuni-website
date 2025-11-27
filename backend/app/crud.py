from sqlalchemy.orm import Session
from . import models, schemas


# ========== ENTREPRISES ==========
def get_entreprise(db: Session, entreprise_id: int):
    return (
        db.query(models.Entreprises)
        .filter(models.Entreprises.id == entreprise_id)
        .first()
    )


def get_entreprises(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Entreprises).offset(skip).limit(limit).all()


def create_entreprise(db: Session, entreprise: schemas.EntrepriseCreate):
    db_entreprise = models.Entreprises(**entreprise.model_dump())
    db.add(db_entreprise)
    db.commit()
    db.refresh(db_entreprise)
    return db_entreprise


def update_entreprise(
    db: Session, entreprise_id: int, entreprise: schemas.EntrepriseCreate
):
    db_entreprise = get_entreprise(db, entreprise_id)
    if db_entreprise:
        for key, value in entreprise.model_dump().items():
            setattr(db_entreprise, key, value)
        db.commit()
        db.refresh(db_entreprise)
    return db_entreprise


def delete_entreprise(db: Session, entreprise_id: int):
    db_entreprise = get_entreprise(db, entreprise_id)
    if db_entreprise:
        db.delete(db_entreprise)
        db.commit()
    return db_entreprise


# ========== ALUMNIS ==========
def get_alumni(db: Session, alumni_id: int):
    return db.query(models.Alumnis).filter(models.Alumnis.id == alumni_id).first()


def get_alumnis(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Alumnis).offset(skip).limit(limit).all()


def create_alumni(db: Session, alumni: schemas.AlumniCreate):
    db_alumni = models.Alumnis(**alumni.model_dump())
    db.add(db_alumni)
    db.commit()
    db.refresh(db_alumni)
    return db_alumni


def update_alumni(db: Session, alumni_id: int, alumni: schemas.AlumniCreate):
    db_alumni = get_alumni(db, alumni_id)
    if db_alumni:
        for key, value in alumni.model_dump().items():
            setattr(db_alumni, key, value)
        db.commit()
        db.refresh(db_alumni)
    return db_alumni


def delete_alumni(db: Session, alumni_id: int):
    db_alumni = get_alumni(db, alumni_id)
    if db_alumni:
        db.delete(db_alumni)
        db.commit()
    return db_alumni


# ========== OFFRES DE STAGE ==========
def get_offre_stage(db: Session, offre_id: int):
    return (
        db.query(models.OffresStage).filter(models.OffresStage.id == offre_id).first()
    )


def get_offres_stage(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.OffresStage).offset(skip).limit(limit).all()


def create_offre_stage(db: Session, offre: schemas.OffreStageCreate):
    db_offre = models.OffresStage(**offre.model_dump())
    db.add(db_offre)
    db.commit()
    db.refresh(db_offre)
    return db_offre


def update_offre_stage(db: Session, offre_id: int, offre: schemas.OffreStageCreate):
    db_offre = get_offre_stage(db, offre_id)
    if db_offre:
        for key, value in offre.model_dump().items():
            setattr(db_offre, key, value)
        db.commit()
        db.refresh(db_offre)
    return db_offre


def delete_offre_stage(db: Session, offre_id: int):
    db_offre = get_offre_stage(db, offre_id)
    if db_offre:
        db.delete(db_offre)
        db.commit()
    return db_offre


# ========== ETUDIANTS ==========
def get_etudiant(db: Session, etudiant_id: int):
    return db.query(models.Etudiant).filter(models.Etudiant.id == etudiant_id).first()


def get_etudiants(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Etudiant).offset(skip).limit(limit).all()


def create_etudiant(db: Session, etudiant: schemas.EtudiantCreate):
    db_etudiant = models.Etudiant(**etudiant.model_dump())
    db.add(db_etudiant)
    db.commit()
    db.refresh(db_etudiant)
    return db_etudiant


def update_etudiant(db: Session, etudiant_id: int, etudiant: schemas.EtudiantUpdate):
    db_etudiant = get_etudiant(db, etudiant_id)
    if db_etudiant:
        for key, value in etudiant.model_dump(exclude_unset=True).items():
            setattr(db_etudiant, key, value)
        db.commit()
        db.refresh(db_etudiant)
    return db_etudiant


def delete_etudiant(db: Session, etudiant_id: int):
    db_etudiant = get_etudiant(db, etudiant_id)
    if db_etudiant:
        db.delete(db_etudiant)
        db.commit()
    return db_etudiant


def count_etudiants_soiree(db: Session):
    return db.query(models.Etudiant).filter(models.Etudiant.soiree == True).count()


def get_etudiants_soiree(db: Session, skip: int = 0, limit: int = 100):
    return (
        db.query(models.Etudiant)
        .filter(models.Etudiant.soiree == True)
        .offset(skip)
        .limit(limit)
        .all()
    )


def get_etudiant_by_mail_and_numero(db: Session, mail: str, numero_etudiant: str):
    return (
        db.query(models.Etudiant)
        .filter(
            models.Etudiant.mail == mail,
            models.Etudiant.numero_etudiant == numero_etudiant,
        )
        .first()
    )
