import sqlite3
from pathlib import Path

# Connexion à la base de données dans le dossier backend
BASE_DIR = Path(__file__).resolve().parent
conn = sqlite3.connect(BASE_DIR / "alumni.db")
cursor = conn.cursor()

# Vérifier si la table stages existe
cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='stages'")
table_exists = cursor.fetchone() is not None

# Créer une nouvelle table avec les bonnes contraintes (stage_id_externe nullable)
cursor.execute(
    """
CREATE TABLE IF NOT EXISTS stages_new (
    id INTEGER PRIMARY KEY,
    stage_id_externe TEXT UNIQUE,
    titre TEXT NOT NULL,
    ville TEXT NOT NULL,
    pays TEXT,
    type TEXT NOT NULL,
    entreprise TEXT NOT NULL,
    date_publication DATETIME,
    date_creation DATETIME NOT NULL,
    texte TEXT,
    url TEXT
)
"""
)

# Copier les données de l'ancienne table vers la nouvelle (si elle existe)
if table_exists:
    cursor.execute(
        """
INSERT INTO stages_new (id, stage_id_externe, titre, ville, pays, type, entreprise, date_publication, date_creation, texte, url)
SELECT id, stage_id_externe, titre, ville, pays, type, entreprise, date_publication, date_creation, texte, url
FROM stages
"""
    )

# Supprimer l'ancienne table (si elle existe)
if table_exists:
    cursor.execute("DROP TABLE stages")


# Renommer la nouvelle table
cursor.execute("ALTER TABLE stages_new RENAME TO stages")

# Valider les changements
conn.commit()
conn.close()

print("Migration réussie ! Les contraintes NOT NULL ont été modifiées.")
