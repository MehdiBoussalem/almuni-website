import csv
import os
from datetime import datetime
from sqlalchemy.orm import Session
from sqlalchemy import text
from app.database import SessionLocal, engine
from app import models, schemas

# Créer les tables si elles n'existent pas
models.Base.metadata.create_all(bind=engine)


def add_entreprise_column_if_missing(db: Session):
    """Ajoute la colonne entreprise à la table stages si elle n'existe pas"""
    try:
        # Vérifier si la colonne existe
        db.execute(text("SELECT entreprise FROM stages LIMIT 1"))
    except Exception:
        # La colonne n'existe pas, l'ajouter
        try:
            db.execute(
                text(
                    "ALTER TABLE stages ADD COLUMN entreprise VARCHAR DEFAULT '' NOT NULL"
                )
            )
            db.commit()
            print("✅ Colonne 'entreprise' ajoutée à la table 'stages'\n")
        except Exception as e:
            print(f"⚠️  Impossible d'ajouter la colonne: {e}\n")
            db.rollback()


def parse_date(date_str):
    """Parse une date au format YYYY-MM-DD"""
    try:
        return datetime.strptime(date_str.strip(), "%Y-%m-%d")
    except ValueError:
        print(f"Format de date invalide: {date_str}")
        return None


def import_csv_file(db: Session, filepath: str):
    """Importe les stages depuis un fichier CSV"""
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            reader = csv.DictReader(f)
            count = 0
            duplicates = 0
            errors = 0

            for row in reader:
                try:
                    # Normaliser les noms de colonnes (ignorer les espaces)
                    row = {k.strip(): v.strip() for k, v in row.items()}

                    # Extraire les données
                    stage_id_externe = row.get("ID", "").strip()
                    titre = row.get("Titre", "").strip()
                    ville = row.get("Ville", "").strip()
                    pays = row.get("Pays", "").strip()
                    type_stage = row.get("Type", "Stage").strip()
                    date_pub_str = row.get("Date de publication", "").strip()
                    texte = row.get("Texte") or row.get("Texte de l'offre", "")
                    texte = texte.strip() if texte else ""
                    url = row.get("url") or row.get("Lien Original", "")
                    url = url.strip() if url else ""
                    entreprise = row.get("entreprise", "").strip()

                    # Valider les champs obligatoires
                    if (
                        not stage_id_externe
                        or not titre
                        or not ville
                        or not pays
                        or not entreprise
                    ):
                        print(
                            f"Ligne ignorée - champs obligatoires manquants: {row.get('ID', 'N/A')}"
                        )
                        errors += 1
                        continue

                    # Parser la date
                    date_publication = parse_date(date_pub_str)
                    if not date_publication:
                        print(f"Ligne ignorée - date invalide pour {titre}")
                        errors += 1
                        continue

                    # Vérifier si l'offre existe déjà
                    existing = (
                        db.query(models.Stage)
                        .filter(models.Stage.stage_id_externe == stage_id_externe)
                        .first()
                    )
                    if existing:
                        print(f"Doublon ignoré: {stage_id_externe} - {titre}")
                        duplicates += 1
                        continue

                    # Créer le nouvel objet Stage
                    new_stage = models.Stage(
                        stage_id_externe=stage_id_externe,
                        titre=titre,
                        ville=ville,
                        pays=pays,
                        type=type_stage,
                        date_publication=date_publication,
                        texte=texte,
                        url=url,
                        entreprise=entreprise,
                    )

                    db.add(new_stage)
                    count += 1

                except Exception as e:
                    print(f"Erreur lors du traitement d'une ligne: {e}")
                    errors += 1
                    continue

            # Commit à la fin
            try:
                db.commit()
                print(f"\n✅ {filepath}")
                print(f"   - Offres ajoutées: {count}")
                print(f"   - Doublons ignorés: {duplicates}")
                print(f"   - Erreurs: {errors}\n")
            except Exception as e:
                db.rollback()
                print(f"❌ Erreur lors du commit: {e}\n")

    except FileNotFoundError:
        print(f"❌ Fichier non trouvé: {filepath}\n")
    except Exception as e:
        print(f"❌ Erreur lors de l'import: {e}\n")


def main():
    """Fonction principale"""
    db = SessionLocal()

    try:
        # Ajouter la colonne entreprise si elle n'existe pas
        add_entreprise_column_if_missing(db)

        # Chemin du dossier offres
        offres_dir = "offres"

        if not os.path.exists(offres_dir):
            print(f"❌ Le dossier '{offres_dir}' n'existe pas")
            return

        # Lister tous les fichiers CSV
        csv_files = [f for f in os.listdir(offres_dir) if f.endswith(".csv")]

        if not csv_files:
            print(f"❌ Aucun fichier CSV trouvé dans le dossier '{offres_dir}'")
            return

        print(f"🚀 Début de l'import depuis {len(csv_files)} fichier(s) CSV\n")

        total_added = 0
        total_duplicates = 0

        # Importer chaque fichier CSV
        for csv_file in csv_files:
            filepath = os.path.join(offres_dir, csv_file)
            import_csv_file(db, filepath)

        # Compter le total des offres
        total_count = db.query(models.Stage).count()
        print(f"📊 Total des offres en base de données: {total_count}")

    finally:
        db.close()


if __name__ == "__main__":
    main()
