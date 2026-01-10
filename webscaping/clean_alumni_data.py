"""
Script de nettoyage et transformation des données alumni.

Ce script charge un fichier CSV d'alumni LinkedIn, nettoie les données,
les structure et exporte le résultat en JSON.

Auteur: Alumni Data Cleaning Pipeline
Date: 2026
"""

import pandas as pd
from geopy.geocoders import Nominatim
from geopy.extra.rate_limiter import RateLimiter


# Configuration des fichiers
INPUT_CSV = "alumni liste.csv"
OUTPUT_JSON = "result alumnis.json"


def load_data(csv_path):
    """
    Charge le fichier CSV des alumni.

    Args:
        csv_path (str): Chemin vers le fichier CSV

    Returns:
        pd.DataFrame: DataFrame contenant les données brutes
    """
    print(f"Chargement du fichier {csv_path}...")
    df = pd.read_csv(csv_path, sep=",")
    print(f"✓ {len(df)} enregistrements chargés")
    return df


def create_aggregated_columns(df):
    """
    Crée des colonnes agrégées pour les écoles et les jobs.

    Args:
        df (pd.DataFrame): DataFrame original

    Returns:
        pd.DataFrame: DataFrame avec colonnes agrégées
    """
    print("Création des listes d'écoles et de jobs...")

    # Liste des écoles
    df["Liste des écoles"] = df.apply(
        lambda x: ", ".join(
            filter(
                pd.notna,
                [x.get("linkedinSchoolName"), x.get("linkedinPreviousSchoolName")],
            )
        ),
        axis=1,
    )

    # Liste des jobs
    df["Liste des jobs"] = df.apply(
        lambda x: ", ".join(
            filter(
                pd.notna, [x.get("linkedinJobTitle"), x.get("linkedinPreviousJobTitle")]
            )
        ),
        axis=1,
    )

    return df


def select_and_rename_columns(df):
    """
    Sélectionne et renomme les colonnes pertinentes.

    Args:
        df (pd.DataFrame): DataFrame avec toutes les colonnes

    Returns:
        pd.DataFrame: DataFrame avec colonnes sélectionnées et renommées
    """
    print("Sélection et renommage des colonnes...")

    columns_to_keep = {
        "lastName": "Nom",
        "firstName": "Prénom",
        "profileUrl": "URL LinkedIn",
        "linkedinProfileImageUrl": "Photo URL",
        "Liste des écoles": "Liste des écoles",
        "Liste des jobs": "Liste des jobs",
        "linkedinJobTitle": "Poste actuel",
        "companyName": "Entreprise",
    }

    # Filtrer les colonnes disponibles
    available_columns = [col for col in columns_to_keep.keys() if col in df.columns]
    final_df = df[available_columns].rename(
        columns={col: columns_to_keep[col] for col in available_columns}
    )

    return final_df


def filter_ingemedia_alumni(df):
    """
    Filtre les alumni de l'Université de Toulon et Institut Ingemedia.

    Args:
        df (pd.DataFrame): DataFrame original

    Returns:
        pd.DataFrame: DataFrame filtré
    """
    print("Filtrage des alumni Ingemedia/Université de Toulon...")

    # Sélectionner les colonnes nécessaires
    columns_needed = [
        "firstName",
        "lastName",
        "linkedinJobTitle",
        "location",
        "linkedinSchoolName",
        "linkedinSchoolDateRange",
        "linkedinProfileUrl",
        "companyName",
    ]
    df = df[columns_needed]

    # Filtrer par école
    ingemedia_df = df[
        df["linkedinSchoolName"].isin(["Université de Toulon", "Institut Ingemedia"])
    ].copy()

    print(f"  Total: {len(df)}")
    print(f"  ✓ Après filtrage: {len(ingemedia_df)} alumni")

    return ingemedia_df


def extract_and_filter_promotion(df):
    """
    Extrait l'année de promotion et filtre les années futures.

    Args:
        df (pd.DataFrame): DataFrame avec les données alumni

    Returns:
        pd.DataFrame: DataFrame avec colonne 'promo' et filtré
    """
    print("Extraction et filtrage des promotions...")

    # Extraire les 4 derniers caractères comme année
    df["promo"] = df["linkedinSchoolDateRange"].str[-4:]

    # Filtrer les promotions antérieures à 2026
    df = df[pd.to_numeric(df["promo"], errors="coerce").fillna(9999) < 2026]

    # Supprimer les colonnes d'école devenues inutiles
    df.drop(columns=["linkedinSchoolDateRange", "linkedinSchoolName"], inplace=True)

    print(f"  ✓ {len(df)} alumni avec promotions valides")

    return df


def rename_columns_stage1(df):
    """
    Première étape de renommage des colonnes en français.

    Args:
        df (pd.DataFrame): DataFrame avec colonnes anglaises

    Returns:
        pd.DataFrame: DataFrame avec colonnes en français
    """
    print("Renommage des colonnes (étape 1)...")

    rename_mapping = {
        "lastName": "nom",
        "firstName": "prenom",
        "location": "lieu",
        "linkedinJobTitle": "poste",
        "promo": "promo",
        "linkedinProfileUrl": "profil_url",
        "companyName": "entreprise",
    }

    df.rename(columns=rename_mapping, inplace=True)
    return df


def map_cities(df):
    """
    Mappe les villes LinkedIN vers des formats standardisés.

    Args:
        df (pd.DataFrame): DataFrame avec colonne 'lieu'

    Returns:
        pd.DataFrame: DataFrame avec colonne 'lieu_clean'
    """
    print("Normalisation des villes...")

    city_mapping = {
        "Greater Toulon Metropolitan Area": "Toulon, France",
        "Greater Paris Metropolitan Region": "Paris, France",
        "Greater Lyon Area": "Lyon, France",
        "Greater Marseille Metropolitan Area": "Marseille, France",
        "Greater Montpellier Metropolitan Area": "Montpellier, France",
        "Greater Grenoble Metropolitan Area": "Grenoble, France",
        "Greater Nice Metropolitan Area": "Nice, France",
        "Greater Metz Area": "Metz, France",
        "Greater Saint-Etienne Metropolitan Area": "Saint-Étienne, France",
        "Greater Rennes Metropolitan Area": "Rennes, France",
        "Greater Nantes Metropolitan Area": "Nantes, France",
        "Greater Rouen Metropolitan Area": "Rouen, France",
        "Greater Caen Area": "Caen, France",
        "Greater Limoges Area": "Limoges, France",
        "Greater Troyes Area": "Troyes, France",
        "Greater Lille Metropolitan Area": "Lille, France",
        "Greater Reims Area": "Reims, France",
        "Greater Mulhouse Area": "Mulhouse, France",
        "Greater Perpignan Area": "Perpignan, France",
        "Greater Tours Area": "Tours, France",
        "Greater Angers Area": "Angers, France",
        "Greater Toulouse Metropolitan Area": "Toulouse, France",
        "Greater Strasbourg Metropolitan Area": "Strasbourg, France",
        "Greater Avignon Area": "Avignon, France",
        "Greater Saint-Brieuc Area": "Saint-Brieuc, France",
        "Wroclaw Metropolitan Area": "Wrocław, Poland",
        "Greater Tokyo Area": "Tokyo, Japan",
        "Greater Montreal Metropolitan Area": "Montreal, Canada",
        "Cologne Bonn Region": "Cologne, Germany",
        "Greater Bilbao Metropolitan Area": "Bilbao, Spain",
    }

    df["lieu_clean"] = df["lieu"].map(city_mapping).fillna(df["lieu"])

    # Afficher les villes non mappées
    unmapped = df[~df["lieu"].isin(city_mapping.keys()) & df["lieu"].notna()]
    if len(unmapped) > 0:
        print(f"  ⚠ {len(unmapped)} villes non mappées:")
        print(f"    {unmapped['lieu'].unique()}")

    return df


def geocode_locations(df):
    """
    Ajoute les coordonnées géographiques (latitude, longitude) via géocodage.

    Args:
        df (pd.DataFrame): DataFrame avec colonne 'lieu_clean'

    Returns:
        pd.DataFrame: DataFrame avec colonnes 'latitude' et 'longitude'
    """
    print("Géocodage des localités...")

    geolocator = Nominatim(user_agent="ingemedia_alumni_app")
    geocode = RateLimiter(geolocator.geocode, min_delay_seconds=1)

    def get_coordinates(lieu):
        """Obtient les coordonnées d'une localité."""
        try:
            if pd.isna(lieu) or lieu == "":
                return None, None
            location = geocode(lieu)
            if location:
                return location.latitude, location.longitude
            return None, None
        except Exception as e:
            print(f"  ✗ Erreur pour '{lieu}': {e}")
            return None, None

    df[["latitude", "longitude"]] = df["lieu_clean"].apply(
        lambda x: pd.Series(get_coordinates(x))
    )

    # Afficher les lieux sans coordonnées
    null_coords = df[df["latitude"].isnull() | df["longitude"].isnull()]
    if len(null_coords) > 0:
        print(f"  ⚠ {len(null_coords)} lieux sans coordonnées géographiques")

    return df


def reverse_geocode_cities(df):
    """
    Récupère les noms de ville à partir des coordonnées géographiques.

    Args:
        df (pd.DataFrame): DataFrame avec latitude/longitude

    Returns:
        pd.DataFrame: DataFrame avec colonne 'ville'
    """
    print("Reverse géocodage pour obtenir les noms de ville...")

    geolocator = Nominatim(user_agent="ingemedia_alumni_app")
    reverse_geocode = RateLimiter(geolocator.reverse, min_delay_seconds=1)

    def get_city_from_coordinates(lat, lon):
        """Récupère le nom de la ville à partir des coordonnées."""
        try:
            if pd.isna(lat) or pd.isna(lon):
                return None
            location = reverse_geocode(f"{lat}, {lon}")
            if location:
                address = location.raw["address"]
                city = (
                    address.get("city") or address.get("town") or address.get("village")
                )
                return city
            return None
        except Exception as e:
            print(f"  ✗ Erreur pour ({lat}, {lon}): {e}")
            return None

    df["ville"] = df.apply(
        lambda row: get_city_from_coordinates(row["latitude"], row["longitude"]), axis=1
    )

    return df


def cleanup_columns(df):
    """
    Supprime les colonnes temporaires et renomme les colonnes finales.

    Args:
        df (pd.DataFrame): DataFrame avec colonnes temporaires

    Returns:
        pd.DataFrame: DataFrame nettoyé et prêt à l'export
    """
    print("Nettoyage final des colonnes...")

    # Supprimer les colonnes inutiles
    df.drop(columns=["lieu_clean", "lieu"], inplace=True)

    # Renommer les colonnes finales
    final_rename = {"profil_url": "linkedin"}
    df.rename(columns=final_rename, inplace=True)

    # Remplir les entreprises manquantes
    df["entreprise"] = df["entreprise"].fillna("Aucune")

    # Remplir les postes manquants
    df["poste"] = df["poste"].fillna("Aucun Poste")

    return df


def export_to_json(df, output_path):
    """
    Exporte le DataFrame au format JSON.

    Args:
        df (pd.DataFrame): DataFrame à exporter
        output_path (str): Chemin du fichier JSON de sortie
    """
    print(f"Export vers {output_path}...")

    df.to_json(output_path, orient="records", force_ascii=False, indent=4)
    print(f"✓ {len(df)} enregistrements exportés")


def main():
    """
    Fonction principale orchestrant le pipeline de nettoyage.
    """
    print("=" * 60)
    print("Pipeline de nettoyage des données alumni")
    print("=" * 60)
    print()

    try:
        # Charger les données
        df = load_data(INPUT_CSV)
        print()

        # Filtrer les alumni Ingemedia
        df = filter_ingemedia_alumni(df)
        print()

        # Extraire et filtrer les promotions
        df = extract_and_filter_promotion(df)
        print()

        # Renommer les colonnes
        df = rename_columns_stage1(df)
        print()

        # Mapper les villes
        df = map_cities(df)
        print()

        # Géocoder les localités
        df = geocode_locations(df)
        print()

        # Reverse géocoder pour les villes
        df = reverse_geocode_cities(df)
        print()

        # Nettoyage final
        df = cleanup_columns(df)
        print()

        # Exporter en JSON
        export_to_json(df, OUTPUT_JSON)
        print()

        print("=" * 60)
        print("✓ Nettoyage complété avec succès!")
        print("=" * 60)

    except Exception as e:
        print(f"\n✗ Erreur lors du nettoyage: {e}")
        raise


if __name__ == "__main__":
    main()
