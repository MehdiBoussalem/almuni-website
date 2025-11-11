from pydantic import BaseModel

# Modèle pour l'entrée (Création)
class ItemCreate(BaseModel):
    title: str
    description: str | None = None

# Modèle pour la sortie (Réponse de l'API)
class Item(ItemCreate):
    id: int

    class Config:
        # Permet d'interagir avec les objets ORM SQLAlchemy
        from_attributes = True # Anciennement orm_mode = True