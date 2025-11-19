import csv
import random
from faker import Faker
from datetime import datetime, timedelta

fake = Faker("fr_FR")

# ========== Génération des Entreprises ==========
print("Génération de 400 entreprises...")
entreprises = []
for i in range(400):
    entreprises.append(
        {
            "id": i + 1,
            "nom": fake.company(),
            "url": fake.url() if random.choice([True, False]) else "",
        }
    )

with open("entreprises.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.DictWriter(f, fieldnames=["id", "nom", "url"])
    writer.writeheader()
    writer.writerows(entreprises)

print("✓ entreprises.csv créé")

# ========== Génération des Alumnis ==========
print("Génération de 2000 alumnis...")
villes_france = [
    "Paris",
    "Lyon",
    "Marseille",
    "Toulouse",
    "Nice",
    "Nantes",
    "Montpellier",
    "Strasbourg",
    "Bordeaux",
    "Lille",
    "Rennes",
    "Toulon",
    "Grenoble",
    "Dijon",
    "Angers",
]
postes = [
    "Développeur Full Stack",
    "Data Scientist",
    "Chef de Projet",
    "Ingénieur DevOps",
    "Product Manager",
    "UX Designer",
    "Analyste Business",
    "Architecte Solution",
    "Consultant IT",
    "Développeur Backend",
    "Développeur Frontend",
    "Ingénieur Cloud",
]
promos = ["2018", "2019", "2020", "2021", "2022", "2023", "2024"]

alumnis = []
for i in range(2000):
    alumnis.append(
        {
            "id": i + 1,
            "nom": fake.last_name(),
            "prenom": fake.first_name(),
            "lieu": random.choice(villes_france),
            "poste": random.choice(postes),
            "url_photo": f"https://i.pravatar.cc/300?img={random.randint(1, 70)}",
            "promo": random.choice(promos),
            "entreprise_id": (
                random.choice(entreprises)["id"] if random.random() > 0.2 else ""
            ),
        }
    )

with open("alumnis.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.DictWriter(
        f,
        fieldnames=[
            "id",
            "nom",
            "prenom",
            "lieu",
            "poste",
            "url_photo",
            "promo",
            "entreprise_id",
        ],
    )
    writer.writeheader()
    writer.writerows(alumnis)

print("✓ alumnis.csv créé")

# ========== Génération des Offres de Stage ==========
print("Génération de 200 offres de stage...")
types_stage = [
    "Stage développement web",
    "Stage data science",
    "Stage marketing digital",
    "Stage gestion de projet",
    "Stage développement mobile",
    "Stage cybersécurité",
    "Stage cloud computing",
    "Stage intelligence artificielle",
    "Stage UX/UI design",
    "Stage développement backend",
    "Stage DevOps",
    "Stage analyse de données",
]

offres = []
for i in range(200):
    date_post = fake.date_between(start_date="-60d", end_date="today")
    type_stage = random.choice(types_stage)

    offres.append(
        {
            "id": i + 1,
            "nom": type_stage,
            "texte": f"{type_stage} au sein d'une entreprise innovante. {fake.text(max_nb_chars=200)} "
            f"Compétences requises: {', '.join(fake.words(nb=5))}. "
            f"Durée: {random.choice(['3 mois', '4 mois', '5 mois', '6 mois'])}. "
            f"Rémunération: {random.randint(600, 1400)}€/mois.",
            "date_post": date_post.strftime("%Y-%m-%d"),
            "lien_postuler": fake.url(),
            "entreprise_id": random.choice(entreprises)["id"],
        }
    )

with open("offres_stage.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.DictWriter(
        f,
        fieldnames=[
            "id",
            "nom",
            "texte",
            "date_post",
            "lien_postuler",
            "entreprise_id",
        ],
    )
    writer.writeheader()
    writer.writerows(offres)

print("✓ offres_stage.csv créé")
print("\n✅ Tous les fichiers CSV ont été générés avec succès!")
print("   - entreprises.csv (400 entrées)")
print("   - alumnis.csv (2000 entrées)")
print("   - offres_stage.csv (200 entrées)")
