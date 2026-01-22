from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime


# ========== Stages ==========
class StageBase(BaseModel):
    stage_id_externe: str
    titre: str
    ville: str
    pays: str
    type: str  # "Stage" ou "Alternance"
    entreprise: str
    date_publication: datetime
    texte: str
    url: str


class StageCreate(StageBase):
    pass


class Stage(StageBase):
    id: int
    date_creation: datetime

    class Config:
        from_attributes = True


# ========== Alumnis ==========
class AlumniBase(BaseModel):
    nom: str
    prenom: str
    ville: Optional[str] = None
    poste: Optional[str] = None
    linkedin: Optional[str] = None
    promo: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    entreprise: Optional[str] = None


class AlumniCreate(AlumniBase):
    pass


class Alumni(AlumniBase):
    id: int

    class Config:
        from_attributes = True


# ========== Inscrits Soirée ==========
class InscritSoireeBase(BaseModel):
    nom: str
    prenom: str
    mail: EmailStr
    statut: str  # "Étudiant", "Ancien étudiant", "Autre"
    precision_statut: Optional[str] = None  # Si statut == "Autre"
    autorisation_captation: str  # "Oui" ou "Non"


class InscritSoireeCreate(InscritSoireeBase):
    pass


class InscritSoiree(InscritSoireeBase):
    id: int

    class Config:
        from_attributes = True


# ========== Tshirts ==========
class TshirtBase(BaseModel):
    nom: str
    prenom: str
    description: Optional[str] = None


class TshirtCreate(TshirtBase):
    pass


class Tshirt(TshirtBase):
    id: int
    image_path: str
    upload_date: datetime

    class Config:
        from_attributes = True
