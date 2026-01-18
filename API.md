# 🔌 Documentation API - Alumni Website

## 📑 Table des matières
1. [Vue d'ensemble](#vue-densemble)
2. [Endpoints Alumni](#endpoints-alumni)
3. [Endpoints Inscriptions Soirée](#endpoints-inscriptions-soirée)
4. [Endpoints T-Shirts](#endpoints-tshirts)
5. [Gestion des erreurs](#gestion-des-erreurs)
6. [Exemples de requêtes](#exemples-de-requêtes)

---

## 🌐 Vue d'ensemble

### URL de base
```
https://alumni-ingemedia.net/api/
```

### En développement local
```
http://localhost:8000/api/
```

### Format des réponses
- **Content-Type**: `application/json`
- **Encodage**: UTF-8
- **Pagination**: Supported avec `limit` et `offset`

### Authentication
Actuellement, l'API est **publique** (sans authentication requise).

---

## 👥 Endpoints Alumni

### Liste tous les alumni

```http
GET /api/alumnis/
```

**Paramètres de requête**:
| Paramètre | Type | Description |
|-----------|------|-------------|
| `limit` | integer | Nombre max d'alumni (défaut: 100) |
| `offset` | integer | Décalage pour pagination (défaut: 0) |
| `promotion` | integer | Filtrer par année de promotion |

**Exemple de requête**:
```bash
curl "https://alumni-ingemedia.net/api/alumnis/?limit=10&offset=0"
```

**Exemple de réponse** (200 OK):
```json
[
  {
    "id": 1,
    "nom": "Dupont",
    "prenom": "Jean",
    "email": "jean.dupont@example.com",
    "telephone": "06 12 34 56 78",
    "promotion": 2020,
    "entreprise": "Google",
    "poste": "Software Engineer",
    "description": "Spécialiste en développement web"
  },
  {
    "id": 2,
    "nom": "Martin",
    "prenom": "Marie",
    "email": "marie.martin@example.com",
    "telephone": "06 87 65 43 21",
    "promotion": 2021,
    "entreprise": "Microsoft",
    "poste": "Product Manager",
    "description": "Gestion de projets numériques"
  }
]
```

---

### Récupérer un alumni spécifique

```http
GET /api/alumnis/{id}
```

**Paramètres de chemin**:
| Paramètre | Type | Description |
|-----------|------|-------------|
| `id` | integer | ID de l'alumni |

**Exemple de requête**:
```bash
curl "https://alumni-ingemedia.net/api/alumnis/1"
```

**Exemple de réponse** (200 OK):
```json
{
  "id": 1,
  "nom": "Dupont",
  "prenom": "Jean",
  "email": "jean.dupont@example.com",
  "telephone": "06 12 34 56 78",
  "promotion": 2020,
  "entreprise": "Google",
  "poste": "Software Engineer",
  "description": "Spécialiste en développement web"
}
```

**Codes d'erreur**:
- `404` - Alumni non trouvé

---

### Créer un nouvel alumni

```http
POST /api/alumnis/
Content-Type: application/json
```

**Corps de la requête**:
```json
{
  "nom": "Durand",
  "prenom": "Pierre",
  "email": "pierre.durand@example.com",
  "telephone": "06 11 22 33 44",
  "promotion": 2022,
  "entreprise": "Facebook",
  "poste": "Data Scientist",
  "description": "Spécialiste en machine learning"
}
```

**Exemple de requête**:
```bash
curl -X POST "https://alumni-ingemedia.net/api/alumnis/" \
  -H "Content-Type: application/json" \
  -d '{
    "nom": "Durand",
    "prenom": "Pierre",
    "email": "pierre.durand@example.com",
    "telephone": "06 11 22 33 44",
    "promotion": 2022,
    "entreprise": "Facebook",
    "poste": "Data Scientist",
    "description": "Spécialiste en machine learning"
  }'
```

**Exemple de réponse** (201 Created):
```json
{
  "id": 3,
  "nom": "Durand",
  "prenom": "Pierre",
  "email": "pierre.durand@example.com",
  "telephone": "06 11 22 33 44",
  "promotion": 2022,
  "entreprise": "Facebook",
  "poste": "Data Scientist",
  "description": "Spécialiste en machine learning"
}
```

---

### Mettre à jour un alumni

```http
PUT /api/alumnis/{id}
Content-Type: application/json
```

**Paramètres de chemin**:
| Paramètre | Type | Description |
|-----------|------|-------------|
| `id` | integer | ID de l'alumni |

**Corps de la requête** (partiellement optionnel):
```json
{
  "nom": "Durand",
  "poste": "Senior Data Scientist",
  "entreprise": "Amazon"
}
```

**Exemple de requête**:
```bash
curl -X PUT "https://alumni-ingemedia.net/api/alumnis/3" \
  -H "Content-Type: application/json" \
  -d '{
    "poste": "Senior Data Scientist",
    "entreprise": "Amazon"
  }'
```

**Exemple de réponse** (200 OK):
```json
{
  "id": 3,
  "nom": "Durand",
  "prenom": "Pierre",
  "email": "pierre.durand@example.com",
  "telephone": "06 11 22 33 44",
  "promotion": 2022,
  "entreprise": "Amazon",
  "poste": "Senior Data Scientist",
  "description": "Spécialiste en machine learning"
}
```

---

### Supprimer un alumni

```http
DELETE /api/alumnis/{id}
```

**Paramètres de chemin**:
| Paramètre | Type | Description |
|-----------|------|-------------|
| `id` | integer | ID de l'alumni |

**Exemple de requête**:
```bash
curl -X DELETE "https://alumni-ingemedia.net/api/alumnis/3"
```

**Exemple de réponse** (204 No Content):
```
(pas de corps de réponse)
```

---

## 🎫 Endpoints Inscriptions Soirée

### Liste toutes les inscriptions

```http
GET /api/inscrits-soiree/
```

**Paramètres de requête**:
| Paramètre | Type | Description |
|-----------|------|-------------|
| `limit` | integer | Nombre max d'inscriptions (défaut: 100) |
| `offset` | integer | Décalage pour pagination (défaut: 0) |

**Exemple de requête**:
```bash
curl "https://alumni-ingemedia.net/api/inscrits-soiree/?limit=20"
```

**Exemple de réponse** (200 OK):
```json
[
  {
    "id": 1,
    "nom": "Dupont",
    "email": "jean.dupont@example.com",
    "telephone": "06 12 34 56 78",
    "date_inscription": "2026-01-15T14:30:00Z",
    "confirmed": true
  },
  {
    "id": 2,
    "nom": "Martin",
    "email": "marie.martin@example.com",
    "telephone": "06 87 65 43 21",
    "date_inscription": "2026-01-16T10:15:00Z",
    "confirmed": false
  }
]
```

---

### Créer une inscription à la soirée

```http
POST /api/inscrits-soiree/
Content-Type: application/json
```

**Corps de la requête**:
```json
{
  "nom": "Dubois",
  "email": "sophie.dubois@example.com",
  "telephone": "06 98 76 54 32"
}
```

**Exemple de requête**:
```bash
curl -X POST "https://alumni-ingemedia.net/api/inscrits-soiree/" \
  -H "Content-Type: application/json" \
  -d '{
    "nom": "Dubois",
    "email": "sophie.dubois@example.com",
    "telephone": "06 98 76 54 32"
  }'
```

**Exemple de réponse** (201 Created):
```json
{
  "id": 3,
  "nom": "Dubois",
  "email": "sophie.dubois@example.com",
  "telephone": "06 98 76 54 32",
  "date_inscription": "2026-01-18T08:45:00Z",
  "confirmed": false
}
```

---

## 👕 Endpoints T-Shirts

### Liste toutes les commandes de T-shirts

```http
GET /api/tshirts/
```

**Paramètres de requête**:
| Paramètre | Type | Description |
|-----------|------|-------------|
| `limit` | integer | Nombre max de commandes (défaut: 100) |
| `offset` | integer | Décalage pour pagination (défaut: 0) |

**Exemple de requête**:
```bash
curl "https://alumni-ingemedia.net/api/tshirts/"
```

**Exemple de réponse** (200 OK):
```json
[
  {
    "id": 1,
    "nom": "Dupont",
    "taille": "M",
    "couleur": "Bleu",
    "quantite": 2,
    "date_commande": "2026-01-15T14:30:00Z"
  },
  {
    "id": 2,
    "nom": "Martin",
    "taille": "L",
    "couleur": "Rouge",
    "quantite": 1,
    "date_commande": "2026-01-16T10:15:00Z"
  }
]
```

---

### Créer une commande de T-shirt

```http
POST /api/tshirts/
Content-Type: application/json
```

**Corps de la requête**:
```json
{
  "nom": "Dubois",
  "taille": "S",
  "couleur": "Noir",
  "quantite": 3
}
```

**Valeurs acceptées pour `taille`**: XS, S, M, L, XL, XXL

**Exemple de requête**:
```bash
curl -X POST "https://alumni-ingemedia.net/api/tshirts/" \
  -H "Content-Type: application/json" \
  -d '{
    "nom": "Dubois",
    "taille": "S",
    "couleur": "Noir",
    "quantite": 3
  }'
```

**Exemple de réponse** (201 Created):
```json
{
  "id": 3,
  "nom": "Dubois",
  "taille": "S",
  "couleur": "Noir",
  "quantite": 3,
  "date_commande": "2026-01-18T08:45:00Z"
}
```

---

## ⚠️ Gestion des erreurs

### Codes d'erreur HTTP

| Code | Description |
|------|-------------|
| `200` | OK - Requête réussie |
| `201` | Created - Ressource créée avec succès |
| `204` | No Content - Suppression réussie |
| `400` | Bad Request - Erreur dans les paramètres |
| `404` | Not Found - Ressource non trouvée |
| `422` | Unprocessable Entity - Données invalides |
| `500` | Internal Server Error - Erreur serveur |

### Exemple d'erreur

**Requête**:
```bash
curl "https://alumni-ingemedia.net/api/alumnis/999"
```

**Réponse** (404 Not Found):
```json
{
  "detail": "Alumni non trouvé"
}
```

---

## 💡 Exemples de requêtes

### JavaScript/Fetch API

**Récupérer tous les alumni**:
```javascript
fetch('https://alumni-ingemedia.net/api/alumnis/')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Erreur:', error));
```

**Créer une inscription à la soirée**:
```javascript
const inscription = {
  nom: "Dubois",
  email: "sophie.dubois@example.com",
  telephone: "06 98 76 54 32"
};

fetch('https://alumni-ingemedia.net/api/inscrits-soiree/', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(inscription)
})
  .then(response => response.json())
  .then(data => console.log('Inscription créée:', data))
  .catch(error => console.error('Erreur:', error));
```

### Python/Requests

**Récupérer tous les alumni avec pagination**:
```python
import requests

response = requests.get(
    'https://alumni-ingemedia.net/api/alumnis/',
    params={'limit': 50, 'offset': 0}
)
alumnis = response.json()
print(alumnis)
```

**Créer un nouvel alumni**:
```python
import requests

nouvel_alumni = {
    "nom": "Durand",
    "prenom": "Pierre",
    "email": "pierre.durand@example.com",
    "telephone": "06 11 22 33 44",
    "promotion": 2022,
    "entreprise": "Facebook",
    "poste": "Data Scientist",
    "description": "Spécialiste en machine learning"
}

response = requests.post(
    'https://alumni-ingemedia.net/api/alumnis/',
    json=nouvel_alumni
)
print(response.json())
```

### cURL

**Lister les inscriptions à la soirée**:
```bash
curl "https://alumni-ingemedia.net/api/inscrits-soiree/"
```

**Créer une commande de T-shirt**:
```bash
curl -X POST "https://alumni-ingemedia.net/api/tshirts/" \
  -H "Content-Type: application/json" \
  -d '{
    "nom": "Dubois",
    "taille": "M",
    "couleur": "Bleu",
    "quantite": 2
  }'
```

---

## 🔄 Pagination

Pour les endpoints qui supportent la pagination, utilisez les paramètres `limit` et `offset`:

```bash
# Premiers 10 résultats
curl "https://alumni-ingemedia.net/api/alumnis/?limit=10&offset=0"

# 10 résultats suivants
curl "https://alumni-ingemedia.net/api/alumnis/?limit=10&offset=10"

# 20 résultats avec décalage de 50
curl "https://alumni-ingemedia.net/api/alumnis/?limit=20&offset=50"
```

---

**Dernière mise à jour**: 18 janvier 2026
