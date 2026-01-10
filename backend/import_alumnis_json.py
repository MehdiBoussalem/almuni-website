import json
from typing import List, Dict, Any
from sqlalchemy.orm import Session
from app.database import SessionLocal, engine
from app.models import Base, Alumnis

INPUT_FILE = "result alumnis.json"


def load_json(path: str) -> List[Dict[str, Any]]:
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def main():
    print("Création/validation des tables...")
    Base.metadata.create_all(bind=engine)

    data = load_json(INPUT_FILE)
    print(f"Chargement JSON: {len(data)} enregistrements")

    db: Session = SessionLocal()
    try:
        objs: List[Alumnis] = []
        for row in data:
            alumni = Alumnis(
                nom=row.get("nom"),
                prenom=row.get("prenom"),
                ville=row.get("ville"),
                poste=row.get("poste"),
                linkedin=row.get("linkedin"),
                promo=row.get("promo"),
                latitude=row.get("latitude"),
                longitude=row.get("longitude"),
                entreprise=row.get("entreprise"),
            )
            objs.append(alumni)

        db.bulk_save_objects(objs)
        db.commit()
        print(f"✓ {len(objs)} alumnis importés dans alumni.db")
    except Exception as e:
        print(f"❌ Erreur lors de l'import: {e}")
        db.rollback()
    finally:
        db.close()


if __name__ == "__main__":
    main()
