from sqlalchemy import Column, Integer, String, ForeignKey, Date, Float
from sqlalchemy.orm import relationship
from app.database import Base


class Entreprises(Base):
    __tablename__ = "entreprises"

    id = Column(Integer, primary_key=True, index=True)
    nom = Column(String, index=True, nullable=False)
    url = Column(String, nullable=True)

    # Relations
    alumnis = relationship("Alumnis", back_populates="entreprise")
    offres = relationship("OffresStage", back_populates="entreprise")


class Alumnis(Base):
    __tablename__ = "alumnis"

    id = Column(Integer, primary_key=True, index=True)
    nom = Column(String, index=True, nullable=False)
    prenom = Column(String, index=True, nullable=False)
    lieu = Column(String, nullable=True)
    poste = Column(String, nullable=True)
    url_photo = Column(String, nullable=True)
    promo = Column(String, nullable=True)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    entreprise_id = Column(Integer, ForeignKey("entreprises.id"), nullable=True)

    # Relation
    entreprise = relationship("Entreprises", back_populates="alumnis")


class OffresStage(Base):
    __tablename__ = "offres_stage"

    id = Column(Integer, primary_key=True, index=True)
    nom = Column(String, index=True, nullable=False)
    texte = Column(String, nullable=False)
    date_post = Column(Date, nullable=False)
    lien_postuler = Column(String, nullable=False)
    entreprise_id = Column(Integer, ForeignKey("entreprises.id"), nullable=False)

    # Relation
    entreprise = relationship("Entreprises", back_populates="offres")
