"""
Script pour enrichir les données alumni existantes avec le pays via géocodage inverse
À exécuter une seule fois pour remplir le champ 'pays' pour tous les alumni
"""

import sys
from sqlalchemy.orm import Session
from app.database import SessionLocal, engine
from app import models
from app.geocoding import enrich_alumni_with_country


def enrich_database():
    """Enrichit la base de données avec les pays manquants"""
    db = SessionLocal()

    try:
        # Récupérer tous les alumni
        alumnis = db.query(models.Alumnis).all()
        print(f"Total alumni: {len(alumnis)}")

        # Limiter à 100 pour tester
        alumnis = alumnis[:100]
        print(f"Traitement de: {len(alumnis)} alumni")

        updated_count = 0

        for i, alumni in enumerate(alumnis):
            # Vérifier si le pays est manquant
            if not alumni.pays:
                enriched = enrich_alumni_with_country(alumni)
                pays = enriched.get("pays", "France")
                alumni.pays = pays
                db.add(alumni)  # S'assurer que l'objet est en track
                updated_count += 1

                print(f"[{i+1}/{len(alumnis)}] {alumni.prenom} {alumni.nom} -> {pays}")

                # Commit par batch de 50 pour éviter les timeouts
                if updated_count % 50 == 0:
                    db.commit()
                    print(f"  -> {updated_count} alumni mis à jour...")

        # Sauvegarder les changements restants
        db.commit()
        print(f"\n✅ Enrichissement terminé! {updated_count} alumni mis à jour")

    except Exception as e:
        print(f"❌ Erreur: {e}")
        db.rollback()
        return False
    finally:
        db.close()

    return True


if __name__ == "__main__":
    print("🌍 Enrichissement des données alumni avec géocodage inverse...")
    success = enrich_database()
    sys.exit(0 if success else 1)
