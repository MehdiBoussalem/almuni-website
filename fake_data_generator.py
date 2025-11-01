import csv
from faker import Faker
import random

# --- CONFIGURATION ---
NUM_ALUMNI = 1500
OUTPUT_FILENAME = "alumni_fake_data_final.csv"
# Liste des villes pour la répartition (France et International)
VILLES = [
    "Paris",
    "Lyon",
    "Marseille",
    "Bordeaux",
    "Toulouse",
    "Nantes",
    "Lille",
    "Strasbourg",
    "Rennes",
    "Montpellier",
    "Nice",
    "Grenoble",
    "Montréal",
    "Londres",
    "New York",
    "Dubaï",
    "Singapour",
]

# Initialisation de Faker avec la locale française
fake = Faker("fr_FR")


# --- FONCTION DE GÉNÉRATION ---
def generate_alumni_data(num_records):
    """Génère une liste de dictionnaires pour les données des alumni."""
    data = []

    for i in range(1, num_records + 1):
        # Génération des noms et prénoms
        prenom = fake.first_name()
        nom = fake.last_name()

        # Création d'un nom d'utilisateur LinkedIn plausible
        linkedin_user = (prenom.lower() + nom.lower()).replace(" ", "-")

        # Sélection aléatoire pour les autres champs
        ville = random.choice(VILLES)

        record = {
            "Nom": nom,
            "Prénom": prenom,
            # Simule une URL LinkedIn
            "LinkedIn": f"https://www.linkedin.com/in/{linkedin_user}",
            # Nom de fichier pour la photo
            "Photo": f"https://i.pravatar.cc/150?img={random.randint(1, 20)}",
            # Simule le nom d'une entreprise (plus crédible avec les noms d'entreprises)
            "Entreprise": fake.company(),
            # Simule un titre de poste
            "Job": fake.job(),
            "Ville": ville,
        }
        data.append(record)

    return data


# --- EXPORT CSV ---
def export_to_csv(data, filename):
    """Écrit la liste de dictionnaires dans un fichier CSV."""
    if not data:
        return

    # Utilise les clés du premier enregistrement comme en-têtes de colonne
    fieldnames = list(data[0].keys())

    with open(filename, "w", newline="", encoding="utf-8") as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)

        # Écrit l'en-tête (les noms de colonnes)
        writer.writeheader()

        # Écrit toutes les lignes de données
        writer.writerows(data)

    print(f"✅ {NUM_ALUMNI} enregistrements générés et sauvegardés dans '{filename}'.")


# --- EXÉCUTION ---
if __name__ == "__main__":
    alumni_list = generate_alumni_data(NUM_ALUMNI)
    export_to_csv(alumni_list, OUTPUT_FILENAME)
