from sqlalchemy import Column, Integer, String, Float, DateTime
from datetime import datetime
from app.database import Base


class Stage(Base):
    __tablename__ = "stages"

    id = Column(Integer, primary_key=True, index=True)
    stage_id_externe = Column(
        String, unique=True, index=True, nullable=True
    )  # ID du site scrappé
    titre = Column(String, nullable=False)
    ville = Column(String, nullable=False)
    pays = Column(String, nullable=True)
    type = Column(String, nullable=False)  # "Stage" ou "Alternance"
    entreprise = Column(String, nullable=False)
    date_publication = Column(
        DateTime, nullable=True
    )  # Pas de default, doit être fourni
    date_creation = Column(
        DateTime, default=datetime.utcnow, nullable=False
    )  # Généré automatiquement
    texte = Column(String, nullable=True)
    url = Column(String, nullable=True)


class Alumnis(Base):
    __tablename__ = "alumnis"

    id = Column(Integer, primary_key=True, index=True)
    nom = Column(String, index=True, nullable=False)
    prenom = Column(String, index=True, nullable=False)
    ville = Column(String, nullable=True)
    poste = Column(String, nullable=True)
    linkedin = Column(String, nullable=True)
    promo = Column(String, nullable=True)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    entreprise = Column(String, nullable=True)


class InscritSoiree(Base):
    __tablename__ = "inscrits_soiree"

    id = Column(Integer, primary_key=True, index=True)
    nom = Column(String, nullable=False)
    prenom = Column(String, nullable=False)
    mail = Column(String, unique=True, index=True, nullable=False)
    statut = Column(String, nullable=False)  # "Étudiant", "Ancien étudiant", "Autre"
    precision_statut = Column(String, nullable=True)  # Si statut == "Autre"
    autorisation_captation = Column(String, nullable=False)  # "Oui" ou "Non"


class Tshirt(Base):
    __tablename__ = "tshirts"

    id = Column(Integer, primary_key=True, index=True)
    nom = Column(String, nullable=False)
    prenom = Column(String, nullable=False)
    image_path = Column(String, nullable=False)
    upload_date = Column(DateTime, default=datetime.utcnow, nullable=False)
    description = Column(String, nullable=True)
