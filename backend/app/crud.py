from sqlalchemy.orm import Session
from . import models, schemas # Importer les modèles de DB et les schémas Pydantic

# Fonction pour lire un élément par ID
def get_item(db: Session, item_id: int):
    return db.query(models.Item).filter(models.Item.id == item_id).first()

# Fonction pour lire tous les éléments
def get_items(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Item).offset(skip).limit(limit).all()

# Fonction pour créer un nouvel élément
def create_item(db: Session, item: schemas.ItemCreate):
    # Crée un objet du modèle de DB à partir du schéma Pydantic
    db_item = models.Item(title=item.title, description=item.description)
    db.add(db_item)
    db.commit() # Sauvegarde dans la DB
    db.refresh(db_item) # Rafraîchit l'instance avec les nouvelles données (comme l'ID)
    return db_item