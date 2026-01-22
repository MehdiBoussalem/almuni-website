from sqlalchemy.orm import Session
from . import models, schemas


# ========== STAGES ==========
def get_stage(db: Session, stage_id: int):
    return db.query(models.Stage).filter(models.Stage.id == stage_id).first()


def get_stage_by_external_id(db: Session, stage_id_externe: str):
    return (
        db.query(models.Stage)
        .filter(models.Stage.stage_id_externe == stage_id_externe)
        .first()
    )


def get_stages(db: Session, skip: int = 0, limit: int = 100):
    return (
        db.query(models.Stage)
        .order_by(models.Stage.date_publication.desc())
        .offset(skip)
        .limit(limit)
        .all()
    )


def create_stage(db: Session, stage: schemas.StageCreate):
    db_stage = models.Stage(**stage.model_dump())
    db.add(db_stage)
    db.commit()
    db.refresh(db_stage)
    return db_stage


def update_stage(db: Session, stage_id: int, stage: schemas.StageCreate):
    db_stage = get_stage(db, stage_id)
    if db_stage:
        for key, value in stage.model_dump().items():
            setattr(db_stage, key, value)
        db.commit()
        db.refresh(db_stage)
    return db_stage


def delete_stage(db: Session, stage_id: int):
    db_stage = get_stage(db, stage_id)
    if db_stage:
        db.delete(db_stage)
        db.commit()
    return db_stage


def count_stages(db: Session):
    return db.query(models.Stage).count()


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


# ========== INSCRITS SOIREE ==========
def get_inscrit_soiree(db: Session, inscrit_id: int):
    return (
        db.query(models.InscritSoiree)
        .filter(models.InscritSoiree.id == inscrit_id)
        .first()
    )


def get_inscrits_soiree(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.InscritSoiree).offset(skip).limit(limit).all()


def get_inscrit_by_mail(db: Session, mail: str):
    return (
        db.query(models.InscritSoiree).filter(models.InscritSoiree.mail == mail).first()
    )


def create_inscrit_soiree(db: Session, inscrit: schemas.InscritSoireeCreate):
    db_inscrit = models.InscritSoiree(**inscrit.model_dump())
    db.add(db_inscrit)
    db.commit()
    db.refresh(db_inscrit)
    return db_inscrit


def delete_inscrit_soiree(db: Session, inscrit_id: int):
    db_inscrit = get_inscrit_soiree(db, inscrit_id)
    if db_inscrit:
        db.delete(db_inscrit)
        db.commit()
    return db_inscrit


def count_inscrits_soiree(db: Session):
    return db.query(models.InscritSoiree).count()


# ========== TSHIRTS ==========
def get_tshirt(db: Session, tshirt_id: int):
    return db.query(models.Tshirt).filter(models.Tshirt.id == tshirt_id).first()


def get_tshirts(db: Session, skip: int = 0, limit: int = 100):
    return (
        db.query(models.Tshirt)
        .order_by(models.Tshirt.upload_date.desc())
        .offset(skip)
        .limit(limit)
        .all()
    )


def create_tshirt(db: Session, tshirt: schemas.TshirtCreate, image_path: str):
    db_tshirt = models.Tshirt(**tshirt.model_dump(), image_path=image_path)
    db.add(db_tshirt)
    db.commit()
    db.refresh(db_tshirt)
    return db_tshirt


def delete_tshirt(db: Session, tshirt_id: int):
    db_tshirt = get_tshirt(db, tshirt_id)
    if db_tshirt:
        db.delete(db_tshirt)
        db.commit()
    return db_tshirt


def delete_all_tshirts(db: Session):
    count = db.query(models.Tshirt).count()
    db.query(models.Tshirt).delete()
    db.commit()
    return count
