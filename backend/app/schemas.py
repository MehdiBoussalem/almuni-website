from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime


# ========== Stages ==========
class StageBase(BaseModel):
    stage_id_externe: Optional[str] = None
    titre: str
    ville: str
    pays: Optional[str] = None
    type: str  # "Stage" ou "Alternance"
    entreprise: str
    date_publication: Optional[datetime] = None
    texte: Optional[str] = None
    url: Optional[str] = None


class StageCreate(StageBase):
    pass


class Stage(StageBase):
    id: int
    date_creation: datetime

    class Config:
        from_attributes = True


class PaginatedStages(BaseModel):
    total: int
    items: List[Stage]


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


class PaginatedAlumnis(BaseModel):
    total: int
    items: List[Alumni]


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
