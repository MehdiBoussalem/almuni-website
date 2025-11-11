from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from .database import engine, Base, get_db # Importer les outils de DB
from . import models, schemas, crud # Importer les modèles, schémas et opérations CRUD

# 1. Crée les tables dans la DB au démarrage de l'application
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Endpoint de base
@app.get("/")
def read_root():
    return {"message": "Bienvenue sur l'API FastAPI et SQLite!"}

# 2. Endpoint pour CRÉER un élément (POST)
@app.post("/items/", response_model=schemas.Item)
def create_new_item(item: schemas.ItemCreate, db: Session = Depends(get_db)):
    # Utilise la fonction CRUD pour insérer l'élément
    return crud.create_item(db=db, item=item)

# 3. Endpoint pour LIRE la liste des éléments (GET)
@app.get("/items/", response_model=list[schemas.Item])
def read_all_items(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    # Utilise la fonction CRUD pour récupérer les éléments
    items = crud.get_items(db, skip=skip, limit=limit)
    return items

# 4. Endpoint pour LIRE un élément spécifique par ID (GET)
@app.get("/items/{item_id}", response_model=schemas.Item)
def read_single_item(item_id: int, db: Session = Depends(get_db)):
    item = crud.get_item(db, item_id=item_id)
    if item is None:
        # Renvoie une erreur si l'ID n'existe pas
        raise HTTPException(status_code=404, detail="Item non trouvé")
    return item