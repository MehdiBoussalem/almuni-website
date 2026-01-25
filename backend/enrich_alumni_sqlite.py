"""
Script pour enrichir les données alumni directement avec SQLite
"""

import sqlite3
from app.geocoding import get_country_from_coordinates


# Dictionnaire de traduction des pays en français
COUNTRY_TO_FRENCH = {
    "France": "France",
    "United Kingdom": "Royaume-Uni",
    "Germany": "Allemagne",
    "Spain": "Espagne",
    "Italy": "Italie",
    "Netherlands": "Pays-Bas",
    "Belgium": "Belgique",
    "Switzerland": "Suisse",
    "Austria": "Autriche",
    "Czech Republic": "République Tchèque",
    "Hungary": "Hongrie",
    "Poland": "Pologne",
    "Sweden": "Suède",
    "Denmark": "Danemark",
    "Norway": "Norvège",
    "Finland": "Finlande",
    "Portugal": "Portugal",
    "Greece": "Grèce",
    "Romania": "Roumanie",
    "Bulgaria": "Bulgarie",
    "Serbia": "Serbie",
    "Slovenia": "Slovénie",
    "United States": "États-Unis",
    "Canada": "Canada",
    "Mexico": "Mexique",
    "Brazil": "Brésil",
    "Argentina": "Argentine",
    "Chile": "Chili",
    "Peru": "Pérou",
    "Colombia": "Colombie",
    "Venezuela": "Venezuela",
    "China": "Chine",
    "Japan": "Japon",
    "South Korea": "Corée du Sud",
    "Thailand": "Thaïlande",
    "Singapore": "Singapour",
    "Hong Kong": "Hong Kong",
    "India": "Inde",
    "Vietnam": "Viêtnam",
    "Philippines": "Philippines",
    "Indonesia": "Indonésie",
    "Malaysia": "Malaisie",
    "United Arab Emirates": "Émirats Arabes Unis",
    "Saudi Arabia": "Arabie Saoudite",
    "Iran": "Iran",
    "Turkey": "Turquie",
    "Egypt": "Égypte",
    "Nigeria": "Nigéria",
    "South Africa": "Afrique du Sud",
    "Morocco": "Maroc",
    "Tunisia": "Tunisie",
    "Senegal": "Sénégal",
    "Kenya": "Kenya",
    "Ghana": "Ghana",
    "Australia": "Australie",
    "New Zealand": "Nouvelle-Zélande",
}


def country_to_french(country: str) -> str:
    """Convertit le nom du pays en français"""
    return COUNTRY_TO_FRENCH.get(country, country)


def enrich_database_sqlite():
    """Enrichit la base de données avec les pays manquants via SQLite direct"""
    conn = sqlite3.connect("alumni.db")
    cursor = conn.cursor()

    try:
        # Récupérer TOUS les alumni sans pays
        cursor.execute(
            """
            SELECT id, latitude, longitude, nom, prenom 
            FROM alumnis 
            WHERE (pays IS NULL OR pays = '') 
            AND latitude IS NOT NULL 
            AND longitude IS NOT NULL 
            ORDER BY id
        """
        )

        rows = cursor.fetchall()
        print(f"Total alumni à enrichir: {len(rows)}")

        updated_count = 0

        for i, (alumni_id, lat, lon, nom, prenom) in enumerate(rows):
            # Géocodage inverse
            country_en = get_country_from_coordinates(lat, lon)
            # Conversion en français
            country_fr = country_to_french(country_en)

            # Mise à jour directe
            cursor.execute(
                "UPDATE alumnis SET pays = ? WHERE id = ?", (country_fr, alumni_id)
            )
            updated_count += 1

            print(f"[{i+1}/{len(rows)}] {prenom} {nom} -> {country_fr}")

            # Commit par batch de 50
            if updated_count % 50 == 0:
                conn.commit()
                print(f"  -> {updated_count} alumni mis à jour...")

        # Commit final
        conn.commit()
        print(f"\n✅ Enrichissement terminé! {updated_count} alumni mis à jour")

    except Exception as e:
        print(f"❌ Erreur: {e}")
        conn.rollback()
        return False
    finally:
        conn.close()

    return True


if __name__ == "__main__":
    print("🌍 Enrichissement des données alumni avec géocodage inverse...")
    success = enrich_database_sqlite()
    exit(0 if success else 1)
