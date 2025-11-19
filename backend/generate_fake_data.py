import csv
import random
from faker import Faker
from datetime import datetime, timedelta

fake = Faker("fr_FR")

# Coordonnées GPS approximatives des villes françaises
VILLES_COORDONNEES = {
    "Paris": {"lat": 48.8566, "lon": 2.3522},
    "Lyon": {"lat": 45.7640, "lon": 4.8357},
    "Marseille": {"lat": 43.2965, "lon": 5.3698},
    "Toulouse": {"lat": 43.6047, "lon": 1.4442},
    "Nice": {"lat": 43.7102, "lon": 7.2620},
    "Nantes": {"lat": 47.2184, "lon": -1.5536},
    "Montpellier": {"lat": 43.6108, "lon": 3.8767},
    "Strasbourg": {"lat": 48.5734, "lon": 7.7521},
    "Bordeaux": {"lat": 44.8378, "lon": -0.5792},
    "Lille": {"lat": 50.6292, "lon": 3.0573},
    "Rennes": {"lat": 48.1173, "lon": -1.6778},
    "Toulon": {"lat": 43.1242, "lon": 5.9280},
    "Grenoble": {"lat": 45.1885, "lon": 5.7245},
    "Dijon": {"lat": 47.3220, "lon": 5.0415},
    "Angers": {"lat": 47.4784, "lon": -0.5632},
}

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
villes_france = list(VILLES_COORDONNEES.keys())
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
    ville = random.choice(villes_france)
    coords = VILLES_COORDONNEES[ville]

    # Ajouter une petite variation aléatoire pour disperser les points sur la carte
    lat_variation = random.uniform(-0.05, 0.05)
    lon_variation = random.uniform(-0.05, 0.05)

    alumnis.append(
        {
            "id": i + 1,
            "nom": fake.last_name(),
            "prenom": fake.first_name(),
            "lieu": ville,
            "poste": random.choice(postes),
            "url_photo": f"https://i.pravatar.cc/300?img={random.randint(1, 70)}",
            "promo": random.choice(promos),
            "latitude": round(coords["lat"] + lat_variation, 6),
            "longitude": round(coords["lon"] + lon_variation, 6),
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
            "latitude",
            "longitude",
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
print("   - alumnis.csv (2000 entrées avec coordonnées GPS)")
print("   - offres_stage.csv (200 entrées)")
