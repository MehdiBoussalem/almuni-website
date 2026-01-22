import csv
from sqlalchemy.orm import Session
from app.database import SessionLocal, engine
from app.models import Base, Alumnis

INPUT_FILE = "alumnis_export_20260120_134911.csv"


def main():
    print("Création/validation des tables...")
    Base.metadata.create_all(bind=engine)

    print(f"Chargement CSV: {INPUT_FILE}\n")

    db: Session = SessionLocal()
    try:
        added = 0
        duplicates = 0
        errors = 0

        with open(INPUT_FILE, "r", encoding="utf-8") as f:
            reader = csv.DictReader(f)
            for row in reader:
                try:
                    # Vérifier si l'alumni existe déjà (par nom + prénom + promo)
                    existing = (
                        db.query(Alumnis)
                        .filter(
                            Alumnis.nom == row.get("Nom"),
                            Alumnis.prenom == row.get("Prénom"),
                            Alumnis.promo == row.get("Promo"),
                        )
                        .first()
                    )

                    if existing:
                        duplicates += 1
                        continue

                    # Parser les coordonnées géographiques
                    latitude = None
                    longitude = None
                    try:
                        latitude = (
                            float(row.get("Latitude")) if row.get("Latitude") else None
                        )
                        longitude = (
                            float(row.get("Longitude"))
                            if row.get("Longitude")
                            else None
                        )
                    except (ValueError, TypeError):
                        pass

                    alumni = Alumnis(
                        nom=row.get("Nom"),
                        prenom=row.get("Prénom"),
                        ville=row.get("Ville"),
                        poste=row.get("Poste"),
                        linkedin=row.get("LinkedIn"),
                        promo=row.get("Promo"),
                        latitude=latitude,
                        longitude=longitude,
                        entreprise=row.get("Entreprise"),
                    )
                    db.add(alumni)
                    added += 1
                except Exception as e:
                    print(f"❌ Erreur ligne {row}: {e}")
                    errors += 1

        db.commit()
        print(f"✅ Import terminé!")
        print(f"   - Alumnis ajoutés: {added}")
        print(f"   - Doublons ignorés: {duplicates}")
        print(f"   - Erreurs: {errors}")
        print(f"\n📊 Total en base de données: {db.query(Alumnis).count()}")

    except Exception as e:
        print(f"❌ Erreur: {e}")
        db.rollback()
    finally:
        db.close()


if __name__ == "__main__":
    main()
