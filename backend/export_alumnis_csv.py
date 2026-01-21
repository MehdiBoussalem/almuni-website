"""
Script pour exporter tous les alumnis de la base de données dans un fichier CSV
Usage: python export_alumnis_csv.py
"""

import csv
from datetime import datetime
from app.database import SessionLocal
from app.models import Alumnis


def export_alumnis_to_csv(filename=None):
    """Exporte tous les alumnis dans un fichier CSV"""

    # Nom du fichier avec timestamp
    if filename is None:
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"alumnis_export_{timestamp}.csv"

    # Créer une session de base de données
    db = SessionLocal()

    try:
        # Récupérer tous les alumnis
        alumnis = db.query(Alumnis).all()

        print(f"📊 {len(alumnis)} alumnis trouvés dans la base de données")

        # Créer le fichier CSV
        with open(filename, "w", newline="", encoding="utf-8") as csvfile:
            writer = csv.writer(csvfile)

            # Écrire l'en-tête
            writer.writerow(
                [
                    "ID",
                    "Nom",
                    "Prénom",
                    "Ville",
                    "Poste",
                    "LinkedIn",
                    "Promo",
                    "Latitude",
                    "Longitude",
                    "Entreprise",
                ]
            )

            # Écrire les données
            for alumni in alumnis:
                writer.writerow(
                    [
                        alumni.id,
                        alumni.nom,
                        alumni.prenom,
                        alumni.ville or "",
                        alumni.poste or "",
                        alumni.linkedin or "",
                        alumni.promo or "",
                        alumni.latitude or "",
                        alumni.longitude or "",
                        alumni.entreprise or "",
                    ]
                )

        print(f"✅ Export réussi ! Fichier créé : {filename}")
        return filename

    except Exception as e:
        print(f"❌ Erreur lors de l'export : {str(e)}")
        raise
    finally:
        db.close()


if __name__ == "__main__":
    export_alumnis_to_csv()
