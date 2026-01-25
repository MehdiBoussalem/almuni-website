"""
Script de migration pour ajouter la colonne 'pays' à la table 'alumnis'
Préserve toutes les données existantes
"""

import sqlite3
from pathlib import Path


def migrate():
    # Placer la base dans le dossier backend
    BASE_DIR = Path(__file__).resolve().parent
    DB_PATH = BASE_DIR / "alumni.db"

    if not DB_PATH.exists():
        print("❌ La base de données n'existe pas")
        return False

    try:
        conn = sqlite3.connect(str(DB_PATH))
        cursor = conn.cursor()

        # Vérifier si la colonne existe déjà
        cursor.execute("PRAGMA table_info(alumnis)")
        columns = [column[1] for column in cursor.fetchall()]

        if "pays" in columns:
            print("✅ La colonne 'pays' existe déjà!")
            conn.close()
            return True

        # Ajouter la colonne 'pays'
        print("Ajout de la colonne 'pays' à la table 'alumnis'...")
        cursor.execute("ALTER TABLE alumnis ADD COLUMN pays VARCHAR NULL")

        conn.commit()
        conn.close()

        print("✅ Migration réussie! La colonne 'pays' a été ajoutée.")
        print("   Toutes les données existantes ont été conservées.")
        return True

    except Exception as e:
        print(f"❌ Erreur lors de la migration: {e}")
        return False


if __name__ == "__main__":
    success = migrate()
    exit(0 if success else 1)
