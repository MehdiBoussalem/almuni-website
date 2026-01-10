"""
Script pour exporter les inscrits à la soirée en fichier CSV
"""

import os
import csv
from datetime import datetime
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.models import InscritSoiree

# Configuration
DB_PATH = "sqlite:///alumni.db"
OUTPUT_DIR = "exports"

# Créer le dossier exports s'il n'existe pas
os.makedirs(OUTPUT_DIR, exist_ok=True)


def export_inscrits():
    """Exporte les inscrits à la soirée en CSV"""

    # Connexion à la base de données
    engine = create_engine(DB_PATH)
    Session = sessionmaker(bind=engine)
    session = Session()

    try:
        # Récupérer tous les inscrits
        inscrits = session.query(InscritSoiree).all()

        if not inscrits:
            print("❌ Aucun inscrit trouvé dans la base de données.")
            return

        # Timestamp pour le fichier
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")

        # EXPORT CSV
        csv_filename = f"{OUTPUT_DIR}/inscrits_soiree_{timestamp}.csv"

        with open(csv_filename, "w", newline="", encoding="utf-8") as f:
            writer = csv.writer(f, delimiter=";")

            # En-têtes
            writer.writerow(
                [
                    "ID",
                    "Nom",
                    "Prénom",
                    "E-mail",
                    "Statut",
                    "Précision Statut",
                    "Autorisation Captation",
                ]
            )

            # Données
            for inscrit in inscrits:
                writer.writerow(
                    [
                        inscrit.id,
                        inscrit.nom,
                        inscrit.prenom,
                        inscrit.mail,
                        inscrit.statut,
                        inscrit.precision_statut or "",
                        inscrit.autorisation_captation,
                    ]
                )

        print(f"✅ CSV exporté : {csv_filename}")
        print(f"📊 Total inscrits : {len(inscrits)}")

    except Exception as e:
        print(f"❌ Erreur lors de l'export : {e}")

    finally:
        session.close()


if __name__ == "__main__":
    print("🔄 Export des inscrits à la soirée...\n")
    export_inscrits()
