from pydantic import BaseModel
from datetime import date
from typing import Optional


# ========== Entreprises ==========
class EntrepriseBase(BaseModel):
    nom: str
    url: Optional[str] = None


class EntrepriseCreate(EntrepriseBase):
    pass


class Entreprise(EntrepriseBase):
    id: int

    class Config:
        from_attributes = True


# ========== Alumnis ==========
class AlumniBase(BaseModel):
    nom: str
    prenom: str
    lieu: Optional[str] = None
    poste: Optional[str] = None
    url_photo: Optional[str] = None
    promo: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    entreprise_id: Optional[int] = None


class AlumniCreate(AlumniBase):
    pass


class Alumni(AlumniBase):
    id: int
    entreprise: Optional[Entreprise] = None

    class Config:
        from_attributes = True


# ========== Offres de Stage ==========
class OffreStageBase(BaseModel):
    nom: str
    texte: str
    date_post: date
    lien_postuler: str
    entreprise_id: int


class OffreStageCreate(OffreStageBase):
    pass


class OffreStage(OffreStageBase):
    id: int
    entreprise: Entreprise

    class Config:
        from_attributes = True


# ========== Etudiants ==========
class EtudiantBase(BaseModel):
    mail: str
    numero_etudiant: str
    nom: str
    prenom: str
    soiree: bool = False


class EtudiantCreate(EtudiantBase):
    pass


class Etudiant(EtudiantBase):
    id: int

    class Config:
        from_attributes = True



