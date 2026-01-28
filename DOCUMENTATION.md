# 📖 Documentation Complète - Alumni Website

## 📑 Table des matières
1. [Vue d'ensemble](#vue-densemble)
2. [Architecture Applicative](#architecture-applicative)
3. [Fonctionnalités & Pages](#fonctionnalités--pages)
4. [Guide Utilisateur](#guide-utilisateur)
5. [Gestion des Données](#gestion-des-données)
6. [Administration](#administration)

---

## 🌐 Vue d'ensemble

**Alumni Ingemedia** est une application web moderne (SPA) conçue pour fédérer la communauté des étudiants et anciens de l'UFR Ingémédia.

### Points Clés
- **Type**: Single Page Application (SPA)
- **Frontend**: React 18 + Vite (Haute performance)
- **Backend**: API REST FastAPI (Python)
- **Sécurité**: HTTPS, Validation des données stricte

---

## 🏗️ Architecture Applicative

L'application est divisée en deux parties distinctes qui communiquent via API.

### Frontend (`mon-nouveau-site`)
Le frontend gère toute l'interface utilisateur et la logique de navigation.
- **Routing**: `react-router-dom` gère la navigation sans rechargement de page.
- **État**: Gestion d'état local et contextuel pour la fluidité.
- **Styles**: `Tailwind CSS` pour un design responsive et moderne.
- **Cartes**: `Leaflet` pour la géolocalisation des offres de stages.

### Backend (`backend`)
Le backend expose une API RESTful documentée ([API.md](API.md)).
- **Serveur**: `Uvicorn` (ASGI) pour des performances asynchrones élevées.
- **Framework**: `FastAPI` avec validation automatique Pydantic.
- **Base de données**: `SQLite` avec ORM `SQLAlchemy`.

---

## 📱 Fonctionnalités & Pages

### 1. **Accueil** (`/`)
Point d'entrée de l'application. Présente les dernières actualités et l'accès rapide aux sections.
- Hero banner dynamique.
- Aperçu des derniers événements.

### 2. **Notre Réseau** (`/notre-reseau`)
Annuaire interactif des alumni.
- **Recherche**: Par nom, promo, entreprise, poste.
- **Filtres**: Facettes dynamiques.
- **Fiches profils**: Détails complets sur chaque alumni.

### 3. **Stages & Carrières** (`/stages`)
[NOUVEAU] Plateforme d'offres de stages et d'emplois.
- **Carte interactive**: Visualisation des offres sur une carte.
- **Matching**: Algorithme de suggestion basé sur les compétences.
- **Lien Alumni**: Voir les anciens travaillant dans l'entreprise proposant le stage.

### 4. **Soirée Alumni** (`/soiree`)
Gestion des événements annuels.
- Formulaire d'inscription temps réel.
- Compteur de places restantes.
- Informations logistiques.

### 5. **Boutique T-Shirts** (`/tshirt`)
Espace communautaire et boutique.
- Galerie photos des promotions passées.
- Commande de goodies (T-shirts, hoodies).
- Upload de photos par les étudiants.

### 6. **Archives** (`/archives`)
Historique des promotions depuis 2015.
- Photos de classe.
- Listes des étudiants par année.
- Projets marquants.

---

## 👥 Guide Utilisateur

### Rechercher un ancien étudiant
1. Aller dans la section **"Notre Réseau"**.
2. Utiliser la barre de recherche principale.
3. Affiner avec les filtres à gauche (Année, Secteur).

### Trouver un stage
1. Aller dans **"Offres de Stages"**.
2. Parcourir la liste ou la carte.
3. Cliquer sur une offre pour voir le détail.
4. Si un alumni travaille dans l'entreprise, son contact apparaîtra dans "Contacts suggérés".

### Commander un T-Shirt
1. Aller dans **"Boutique"**.
2. Sélectionner le modèle et la taille.
3. Valider le formulaire.
4. Un email de confirmation récapitulatif est envoyé (simulation).

---

## 💾 Gestion des Données

### Modèle de Données (SQLite)
La base de données `alumni.db` contient :
- `alumnis`: Profils complets.
- `stages`: Offres d'emploi/stage.
- `inscrits_soiree`: Participants aux événements.
- `tshirts`: Commandes et galerie photo.

### Import/Export
Des scripts Python dans `backend/` permettent la maintenance :
- `import_alumnis_csv.py`: Import en masse depuis CSV.
- `export_inscrits.py`: Export des listes d'élus.
- `clean_alumni_data.py`: Nettoyage et déduplication.

---

## 🔐 Administration

Une section admin (`/admin`) permet de gérer le contenu (accès restreint).
- Validation des offres de stages.
- Modération des photos importées.
- Gestion des fiches alumni.

---

**Documentation mise à jour le 28 janvier 2026**
