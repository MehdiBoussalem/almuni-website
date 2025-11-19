import csv
from datetime import datetime
from sqlalchemy.orm import Session
from app.database import SessionLocal, engine
from app.models import Base, Entreprises, Alumnis, OffresStage

# Créer les tables
print("Création des tables...")
Base.metadata.create_all(bind=engine)

db = SessionLocal()

try:
    # ========== Import des Entreprises ==========
    print("\nImport des entreprises...")
    with open("entreprises.csv", "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        entreprises = []
        for row in reader:
            entreprise = Entreprises(
                id=int(row["id"]),
                nom=row["nom"],
                url=row["url"] if row["url"] else None,
            )
            entreprises.append(entreprise)

        db.bulk_save_objects(entreprises)
        db.commit()
        print(f"✓ {len(entreprises)} entreprises importées")

    # ========== Import des Alumnis ==========
    print("\nImport des alumnis...")
    with open("alumnis.csv", "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        alumnis = []
        for row in reader:
            alumni = Alumnis(
                id=int(row["id"]),
                nom=row["nom"],
                prenom=row["prenom"],
                lieu=row["lieu"] if row["lieu"] else None,
                poste=row["poste"] if row["poste"] else None,
                url_photo=row["url_photo"] if row["url_photo"] else None,
                promo=row["promo"] if row["promo"] else None,
                latitude=float(row["latitude"]) if row["latitude"] else None,
                longitude=float(row["longitude"]) if row["longitude"] else None,
                entreprise_id=(
                    int(row["entreprise_id"]) if row["entreprise_id"] else None
                ),
            )
            alumnis.append(alumni)

        db.bulk_save_objects(alumnis)
        db.commit()
        print(f"✓ {len(alumnis)} alumnis importés")

    # ========== Import des Offres de Stage ==========
    print("\nImport des offres de stage...")
    with open("offres_stage.csv", "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        offres = []
        for row in reader:
            offre = OffresStage(
                id=int(row["id"]),
                nom=row["nom"],
                texte=row["texte"],
                date_post=datetime.strptime(row["date_post"], "%Y-%m-%d").date(),
                lien_postuler=row["lien_postuler"],
                entreprise_id=int(row["entreprise_id"]),
            )
            offres.append(offre)

        db.bulk_save_objects(offres)
        db.commit()
        print(f"✓ {len(offres)} offres de stage importées")

    print("\n✅ Toutes les données ont été importées avec succès!")
    print(f"   - Base de données: alumni.db")
    print(
        f"   - Total: {len(entreprises)} entreprises, {len(alumnis)} alumnis, {len(offres)} offres"
    )

except Exception as e:
    print(f"\n❌ Erreur lors de l'import: {e}")
    db.rollback()
finally:
    db.close()
