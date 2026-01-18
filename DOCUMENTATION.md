# 📖 Documentation Complète - Alumni Website

## 📑 Table des matières
1. [Vue d'ensemble](#vue-densemble)
2. [Pages du site](#pages-du-site)
3. [Fonctionnalités](#fonctionnalités)
4. [Guide utilisateur](#guide-utilisateur)
5. [Architecture technique](#architecture-technique)
6. [Gestion des données](#gestion-des-données)

---

## 🌐 Vue d'ensemble

**Alumni Ingemedia** est un site web communautaire pour les anciens et actuels étudiants de l'UFR Ingémédia. Le site permet :
- La consultation des informations du réseau alumni
- L'inscription aux événements (soirées, ateliers)
- La gestion de commandes de T-shirts
- La consultation des archives par promotion
- L'accès au réseau professionnel

### Informations du site
- **URL**: https://alumni-ingemedia.net
- **Type**: Site statique + API REST
- **Technologie Frontend**: HTML5, CSS3, JavaScript vanilla
- **Technologie Backend**: FastAPI (Python)
- **Base de données**: SQLite

---

## 📄 Pages du site

### 1. **Accueil** (`index.html`)
**URL**: https://alumni-ingemedia.net/

**Contenu**:
- Hero banner avec logo alumni
- Présentation générale du réseau
- Information sur la mission d'Ingémédia ALUMNI
- Navigation vers les autres sections

**Fichiers associés**:
- `styles/index.css` - Styling
- `js/index.js` - Interactivité

---

### 2. **Événement 2026** (`pages/evenement.html`)
**URL**: https://alumni-ingemedia.net/pages/evenement.html

**Contenu**:
- Détails de l'événement 2026
- Date, lieu, programme
- Informations pratiques

**Fichiers associés**:
- `styles/evenement.css`
- `js/index.js`

---

### 3. **Soirée Alumni** (`pages/soiree.html`)
**URL**: https://alumni-ingemedia.net/pages/soiree.html

**Fonctionnalités**:
- 📝 **Formulaire d'inscription** aux soirées
- 🎫 Gestion des inscriptions en temps réel
- 📊 Suivi des participants

**Données collectées**:
- Nom
- Email
- Numéro de téléphone
- Date de participation

**Fichiers associés**:
- `styles/soiree.css`
- `js/soiree.js` - Gestion du formulaire et appels API

**Endpoints API utilisés**:
```
POST /api/inscrits-soiree/  - Créer une inscription
GET /api/inscrits-soiree/   - Lister les inscriptions
```

---

### 4. **T-Shirts** (`pages/tshirt.html`)
**URL**: https://alumni-ingemedia.net/pages/tshirt.html

**Fonctionnalités**:
- 👕 Commande de T-shirts personnalisés
- 📦 Gestion des stocks
- 💾 Sauvegarde des commandes

**Données collectées**:
- Nom du client
- Taille (XS, S, M, L, XL, XXL)
- Couleur
- Quantité

**Fichiers associés**:
- `styles/tshirt.css`
- `js/tshirt.js` - Gestion du formulaire
- `backend/uploads/tshirts/` - Stockage des données

**Endpoints API utilisés**:
```
POST /api/tshirts/  - Créer une commande
GET /api/tshirts/   - Lister les commandes
```

---

### 5. **Notre Réseau** (`pages/notre-reseau.html`)
**URL**: https://alumni-ingemedia.net/pages/notre-reseau.html

**Fonctionnalités**:
- 👥 Annuaire des alumni
- 🔍 Recherche par promotion
- 📊 Statistiques du réseau

**Fichiers associés**:
- `styles/notre-reseau.css`
- `js/notre-reseau.js` - Recherche et filtrage
- `backend/app/models.py` - Modèle Alumni

**Endpoints API utilisés**:
```
GET /api/alumnis/               - Lister tous les alumni
GET /api/alumnis/?limit=100     - Pagination
GET /api/alumnis/{id}           - Détails d'un alumni
```

---

### 6. **Archives** (`pages/archives/index.html`)
**URL**: https://alumni-ingemedia.net/pages/archives/

**Contenu**:
- 📚 Fiches par promotion (2015-2025)
- 🎓 Statistiques par année
- 🏆 Événements passés

**Pages disponibles**:
- `alumni-2015.html` à `alumni-2025.html` - Une page par promotion
- `index.html` - Page d'index

**Fichiers associés**:
- `styles/archives.css`

---

### 7. **Événements en Direct** (`pages/live.html`)
**URL**: https://alumni-ingemedia.net/pages/live.html

**Fonctionnalités**:
- 📡 Retransmission en direct (optional)
- 💬 Chat/Commentaires
- 🎥 Vidéo en streaming

**Fichiers associés**:
- `styles/live.css`

---

## 🎯 Fonctionnalités principales

### 1. **Gestion des Inscriptions**
- Formulaires d'inscription aux événements
- Validation des données
- Stockage en base de données
- Confirmation par email (optionnel)

### 2. **Gestion des Alumni**
- Annuaire des anciens étudiants
- Recherche et filtrage
- Import/Export de données

**Commandes disponibles**:
```bash
# Importer les alumni depuis JSON
python backend/import_alumnis_json.py

# Exporter les inscrits
python backend/export_inscrits.py
```

### 3. **Gestion des T-Shirts**
- Commande personnalisée
- Suivi du stock
- Téléchargement des données

### 4. **Responsive Design**
- Tous les styles sont optimisés pour mobile
- Breakpoints : 320px, 768px, 1024px, 1440px

---

## 👥 Guide utilisateur

### Pour les visiteurs

#### 1. Consulter le réseau alumni
1. Aller sur **Notre réseau**
2. Parcourir l'annuaire des alumni
3. Utiliser la barre de recherche pour trouver des personnes

#### 2. S'inscrire à une soirée
1. Aller sur **Soirée Alumni**
2. Remplir le formulaire avec :
   - Nom complet
   - Email
   - Téléphone
3. Cliquer sur "S'inscrire"
4. Confirmation affichée à l'écran

#### 3. Commander un T-shirt
1. Aller sur **T-Shirts**
2. Remplir le formulaire avec :
   - Nom
   - Taille
   - Couleur
   - Quantité
3. Cliquer sur "Commander"
4. Les données sont sauvegardées

#### 4. Consulter les archives
1. Cliquer sur **Archives** dans le menu
2. Sélectionner une année (2015-2025)
3. Consulter les informations de la promotion

---

## 🏗️ Architecture technique

### Structure des fichiers

```
almuni-website/
├── index.html                    # Page d'accueil
├── pages/
│   ├── evenement.html
│   ├── soiree.html
│   ├── tshirt.html
│   ├── notre-reseau.html
│   ├── live.html
│   └── archives/
│       ├── index.html
│       ├── alumni-2015.html
│       └── ... alumni-YYYY.html
├── styles/                       # Feuilles CSS
├── js/                          # Scripts JavaScript
│   ├── index.js
│   ├── soiree.js
│   ├── tshirt.js
│   └── notre-reseau.js
├── backend/                     # API FastAPI
│   ├── app/
│   │   ├── main.py
│   │   ├── models.py
│   │   ├── schemas.py
│   │   ├── crud.py
│   │   └── database.py
│   ├── requirements.txt
│   └── alumni.db               # Base de données SQLite
├── assets/                      # Ressources (images, logo)
└── webscaping/                 # Scripts de web scraping
```

### Stack technique

| Composant | Technologie | Version |
|-----------|-------------|---------|
| **Frontend** | HTML5, CSS3, JavaScript | -
| **Backend** | FastAPI | Python 3.x |
| **Base de données** | SQLite | -
| **Serveur web** | Apache2 | 2.x |
| **SSL/HTTPS** | Let's Encrypt | Certbot |
| **Déploiement** | Linux (Ubuntu) | -

---

## 💾 Gestion des données

### Base de données SQLite

**Fichier**: `backend/alumni.db`

**Modèles disponibles**:

#### 1. Alumni
```python
id: int (primary key)
nom: str
prenom: str
email: str
telephone: str
promotion: int (year)
entreprise: str
poste: str
description: str
```

#### 2. Inscriptions Soirée
```python
id: int (primary key)
nom: str
email: str
telephone: str
date_inscription: datetime
confirmed: bool
```

#### 3. Commandes T-Shirts
```python
id: int (primary key)
nom: str
taille: str (XS, S, M, L, XL, XXL)
couleur: str
quantite: int
date_commande: datetime
```

### Import/Export de données

#### Import d'alumni
```bash
cd backend
python import_alumnis_json.py
```
Importe les données depuis un fichier JSON vers la base SQLite.

#### Export des inscrits
```bash
cd backend
python export_inscrits.py
```
Exporte les inscriptions aux soirées en CSV ou Excel.

### Web Scraping
```bash
cd webscaping
python clean_alumni_data.py
```
Nettoie et formate les données alumni importées.

---

## 🔐 Sécurité et SSL

### Certificat SSL
- **Provider**: Let's Encrypt
- **Domaines**: alumni-ingemedia.net, www.alumni-ingemedia.net
- **Valide jusqu'à**: 13 avril 2026
- **Renouvellement**: Automatique (Certbot)

### Redirection HTTPS
Tous les accès HTTP sont redirigés automatiquement vers HTTPS.

---

## 📊 Design et styling

### Palette de couleurs
| Couleur | Hex | Utilisation |
|---------|-----|-----------|
| Bleu foncé | `#355F9B` | Titres, headers |
| Bleu clair | `#7AC9F2` | Accents, boutons |
| Bordeaux | `#B11A5F` | Highlights |
| Rouge | `#DE1251` | Erreurs, alertes |

### Typographie
- **Titres**: BEBAS NEUE REGULAR
- **Texte**: Montserrat (Light, Bold)

### Responsive Design
- Mobile-first approach
- Breakpoints: 320px, 768px, 1024px, 1440px
- Toutes les images sont optimisées

---

## 🚀 Déploiement

Pour des informations détaillées sur le déploiement, voir [DEPLOYMENT.md](DEPLOYMENT.md).

Résumé:
- 🌐 Serveur: 37.59.115.57
- 🔌 Port: 443 (HTTPS)
- 📡 API: Port 8000 (Uvicorn)
- 🔒 Certificat: Let's Encrypt

---

## 📞 Support et maintenance

### Fichiers importants
- [README.md](README.md) - Informations générales
- [DEPLOYMENT.md](DEPLOYMENT.md) - Guide de déploiement
- [API.md](API.md) - Documentation API détaillée

### Logs
```bash
# Logs Apache
sudo tail -f /var/log/apache2/almuni-error.log
sudo tail -f /var/log/apache2/almuni-access.log

# Logs Uvicorn
journalctl -u almuni -f
```

### Commandes utiles
```bash
# Redémarrer l'API
sudo systemctl restart almuni

# Vérifier le statut
sudo systemctl status almuni

# Renouveler le certificat SSL
sudo certbot renew

# Redémarrer Apache
sudo systemctl restart apache2
```

---

**Dernière mise à jour**: 18 janvier 2026
