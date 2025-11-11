from sqlalchemy import Column, Integer, String
from app.database import Base # Importer la Base définie précédemment


class Entreprises(Base):
    __tablename__ = "entreprises"  # Nom de la table

    id = Column(Integer, primary_key=True, index=True)
    nom = Column(String, index=True)
    
class Alumnis(Base):
    __tablename__ = "alumni"  # Nom de la table

    id = Column(Integer, primary_key=True, index=True)
    nom = Column(String, index=True)
    prenom = Column(String, index=True)
    linkedin_url = Column(String, unique=True, index=True)
    ville = Column(String, index=True)
    
