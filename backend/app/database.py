from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# L'URL de la DB SQLite. Le fichier 'app.db' sera créé à la racine
SQLALCHEMY_DATABASE_URL = "sqlite:///./alumni.db"

# L'argument `check_same_thread=False` est nécessaire pour SQLite
# car il est par défaut très strict sur les threads.
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

# Crée une session locale pour interagir avec la DB
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class pour nos modèles de DB
Base = declarative_base()

# Fonction de dépendance pour les endpoints (gestion automatique de la session)
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()