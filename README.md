# 🎓 Alumni Website - IngeMedia

> **Un réseau, une communauté, une ambition commune !**

Plateforme communautaire pour les étudiants et anciens de l'UFR Ingémédia (Université de Toulon).

## 🚀 Liens Rapides

- 🌐 **Site Web**: [https://alumni-ingemedia.net](https://alumni-ingemedia.net)
- 🔌 **API**: [https://alumni-ingemedia.net/api/](https://alumni-ingemedia.net/api/)
- 📄 **Documentation**: [DOCUMENTATION.md](DOCUMENTATION.md)

---

## 🛠️ Stack Technique

Le projet a évolué vers une architecture moderne séparant le frontend et le backend :

### Frontend (`mon-nouveau-site/`)
- **Framework**: React 18 avec Vite
- **Langage**: TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **Cartographie**: Leaflet

### Backend (`backend/`)
- **Framework**: FastAPI (Python 3.13)
- **Serveur**: Uvicorn
- **Base de données**: SQLite (`alumni.db`)
- **Stats & Data**: Pandas, RapidFuzz, GeoPy

---

## 📂 Structure du projet

```
almuni-website/
├── mon-nouveau-site/      # 🎨 Frontend React
│   ├── src/
│   │   ├── components/    # Composants réutilisables
│   │   ├── pages/         # Pages de l'application
│   │   └── utils/         # Fonctions utilitaires
│   └── package.json
│
├── backend/               # 🔌 Backend API
│   ├── app/
│   │   ├── main.py        # Point d'entrée API
│   │   ├── models.py      # Modèles DB (SQLAlchemy)
│   │   └── crud.py        # Logique métier
│   ├── requirements.txt
│   └── alumni.db          # Base de données
│
├── API.md                 # 📘 Documentation API détaillée
├── DEPLOYMENT.md          # 🚀 Guide de déploiement
└── DOCUMENTATION.md       # 📚 Guide fonctionnel et architecture
```

---

## 💻 Installation et Développement

### Prérequis
- Node.js 22+
- Python 3.13+

### 1. Backend (FastAPI)

```bash
cd backend

# Créer l'environnement virtuel
python -m venv venv
source venv/bin/activate  # ou venv\Scripts\activate sous Windows

# Installer les dépendances
pip install -r requirements.txt

# Lancer le serveur de développement
uvicorn app.main:app --reload
```
L'API sera accessible sur `http://localhost:8000`.

### 2. Frontend (React)

```bash
cd mon-nouveau-site

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```
Le site sera accessible sur `http://localhost:5173`.

---

## ✨ Fonctionnalités

- 👥 **Annuaire Alumni** : Recherche avancée, filtrage par promotion/entreprise.
- 🎓 **Gestion des Stages** : Offres de stages, matching intelligent avec les anciens.
- 📊 **Statistiques** : Visualisation des débouchés par entreprise et métier.
- 👕 **T-Shirts** : Galerie photo collaborative des promos.
- 🎫 **Événements** : Inscriptions aux soirées alumni.
- 🔐 **Administration** : Interface de gestion complète.

---

## 📝 To Do List

- [ ] Faire le responsive (🚨 **URGENT**)
- [ ] Rajouter des scripts de scrapping entreprise
- [ ] Faire un cron job pour automatiser les scrapping d'entreprise
- [ ] Rajouter des alumnis dans la BDD avec PhantomBuster (Voir Mr Ben Amor)
- [ ] Sécuriser l'API

---

## �📚 Documentation

Pour plus de détails, consultez les guides spécifiques :

- **[DOCUMENTATION.md](DOCUMENTATION.md)** : Guide complet de l'application (Architecture, Fonctionnalités, Guide Utilisateur).
- **[API.md](API.md)** : Documentation technique de l'API REST (Endpoints, Exemples).
- **[DEPLOYMENT.md](DEPLOYMENT.md)** : Procédures de mise en production et maintenance serveur.

---

## ✍️ Auteurs

- Mehdi Boussalem
- Cherif Miloua
