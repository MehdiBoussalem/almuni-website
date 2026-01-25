"""
Module de géocodage inverse pour enrichir les données alumni avec le pays
Utilise geopy avec Nominatim (OpenStreetMap)
"""

from geopy.geocoders import Nominatim
from geopy.exc import GeocoderTimedOut, GeocoderServiceError
import time
from functools import lru_cache

# Initialiser le géocodeur
geolocator = Nominatim(user_agent="alumni_ingemedia")


# Cache pour éviter les appels répétés
@lru_cache(maxsize=500)
def get_country_from_coordinates(latitude: float, longitude: float) -> str:
    """
    Effectue un géocodage inverse pour obtenir le pays à partir des coordonnées

    Args:
        latitude: Latitude de la localisation
        longitude: Longitude de la localisation

    Returns:
        Nom du pays ou "France" par défaut si impossible
    """
    try:
        # Ajouter un petit délai pour respecter les limites de Nominatim (~1 req/sec)
        time.sleep(1)

        location = geolocator.reverse(
            f"{latitude}, {longitude}", language="en", timeout=10
        )
        address = location.raw.get("address", {})

        # Extraire le pays depuis l'adresse
        country = address.get("country")
        if country:
            return country

        # Fallback sur country_code et conversion en nom
        country_code = address.get("country_code", "").upper()
        return _country_code_to_name(country_code) or "France"

    except (GeocoderTimedOut, GeocoderServiceError):
        print(f"Géocodage timeout pour {latitude}, {longitude}")
        return "France"
    except Exception as e:
        print(f"Erreur géocodage: {e}")
        return "France"


def _country_code_to_name(code: str) -> str:
    """Convertit un code pays ISO-2 en nom de pays"""
    country_codes = {
        "FR": "France",
        "GB": "United Kingdom",
        "DE": "Germany",
        "ES": "Spain",
        "IT": "Italy",
        "NL": "Netherlands",
        "BE": "Belgium",
        "CH": "Switzerland",
        "AT": "Austria",
        "CZ": "Czech Republic",
        "HU": "Hungary",
        "PL": "Poland",
        "SE": "Sweden",
        "DK": "Denmark",
        "NO": "Norway",
        "FI": "Finland",
        "PT": "Portugal",
        "GR": "Greece",
        "RO": "Romania",
        "BG": "Bulgaria",
        "RS": "Serbia",
        "SI": "Slovenia",
        "US": "United States",
        "CA": "Canada",
        "MX": "Mexico",
        "BR": "Brazil",
        "AR": "Argentina",
        "CL": "Chile",
        "PE": "Peru",
        "CO": "Colombia",
        "VE": "Venezuela",
        "CN": "China",
        "JP": "Japan",
        "KR": "South Korea",
        "TH": "Thailand",
        "SG": "Singapore",
        "HK": "Hong Kong",
        "IN": "India",
        "VN": "Vietnam",
        "PH": "Philippines",
        "ID": "Indonesia",
        "MY": "Malaysia",
        "AE": "United Arab Emirates",
        "SA": "Saudi Arabia",
        "IR": "Iran",
        "TR": "Turkey",
        "EG": "Egypt",
        "NG": "Nigeria",
        "ZA": "South Africa",
        "MA": "Morocco",
        "TN": "Tunisia",
        "SN": "Senegal",
        "KE": "Kenya",
        "GH": "Ghana",
        "AU": "Australia",
        "NZ": "New Zealand",
    }
    return country_codes.get(code, "France")


def enrich_alumni_with_country(alumni) -> dict:
    """
    Enrichit les données alumni avec le pays si manquant

    Args:
        alumni: Objet Alumni ou dictionnaire alumni

    Returns:
        Dictionnaire avec le champ pays rempli
    """
    # Convertir en dictionnaire si nécessaire
    alumni_dict = alumni.__dict__ if hasattr(alumni, "__dict__") else alumni

    # Si le pays est déjà renseigné, retourner tel quel
    if alumni_dict.get("pays"):
        return alumni_dict

    # Si les coordonnées sont disponibles, effectuer le géocodage inverse
    if alumni_dict.get("latitude") and alumni_dict.get("longitude"):
        country = get_country_from_coordinates(
            alumni_dict["latitude"], alumni_dict["longitude"]
        )
        alumni_dict["pays"] = country
    else:
        # Par défaut, assigner "France"
        alumni_dict["pays"] = alumni_dict.get("pays") or "France"

    return alumni_dict
