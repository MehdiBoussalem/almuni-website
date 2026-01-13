# 🎓 Alumni Website - IngeMedia

## 🎨 Design & Couleurs

### Fonts
- **Titre**: BEBAS NEUE REGULAR
- **Textes**: Montserrat (Light, Bold)

### Palette de couleurs
- Bleu foncé: `#355F9B`
- Bleu clair: `#7AC9F2`
- Bordeaux: `#B11A5F`
- Rouge: `#DE1251`

---

## ✅ État du déploiement (13 Janvier 2026)

**Status**: ✅ **Production en HTTPS - Entièrement Fonctionnel**

### URLs actuelles
- 🌐 **Site**: https://alumni-ingemedia.net
- 🔌 **API**: https://alumni-ingemedia.net/api/
- 📍 **IP Serveur**: 37.59.115.57
- 🔒 **Certificat SSL**: Let's Encrypt (valide jusqu'au 13 avril 2026)

### Fonctionnalités déployées
✅ Frontend (HTML/CSS/JS) - Responsive design  
✅ API FastAPI (Backend) - Full CRUD  
✅ Base de données SQLite - Persistante  
✅ SSL/HTTPS - Certificat Let's Encrypt  
✅ Redirection HTTP → HTTPS  
✅ Renouvellement SSL automatique  
✅ Proxy Apache vers API Uvicorn  

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────┐
│    Internet (37.59.115.57 - HTTPS)         │
└─────────────────────┬───────────────────────┘
                      │
        ┌─────────────▼─────────────┐
        │     Apache2 (Port 443)    │
        │  VirtualHost alumni-le-ssl│
        └──────────┬────────────┬───┘
                   │            │
          ┌────────▼──────┐  ┌──▼──────────┐
          │   Frontend    │  │  API Proxy  │
          │ (HTML/CSS/JS) │  │   /api/ →   │
          │               │  │  localhost  │
          └────────────────┘  │   :8000    │
                              └──────┬─────┘
                                     │
                            ┌────────▼──────┐
                            │   Uvicorn     │
                            │  FastAPI App  │
                            │  :8000        │
                            └────────┬──────┘
                                     │
                            ┌────────▼──────┐
                            │   SQLite      │
                            │ alumni.db     │
                            └───────────────┘
```

---

## 🚀 Utilisation

### Accès au site
```bash
# Production (HTTPS)
https://alumni-ingemedia.net

# Redirection automatique
http://alumni-ingemedia.net → https://alumni-ingemedia.net
```

### Endpoints API disponibles

#### Alumni
```bash
GET /api/alumnis/
GET /api/alumnis/?limit=100
GET /api/alumnis/{id}
POST /api/alumnis/
PUT /api/alumnis/{id}
DELETE /api/alumnis/{id}
```

#### Inscriptions Soirée
```bash
GET /api/inscrits-soiree/
POST /api/inscrits-soiree/
```

#### Événements
```bash
GET /api/evenements/
```

---

## 📝 Fichiers importants

- `index.html` - Page d'accueil
- `pages/` - Pages statiques (soirée, événements, etc.)
- `styles/` - Feuilles CSS
- `js/` - Scripts JavaScript
- `backend/app/main.py` - API FastAPI
- `backend/alumni.db` - Base de données SQLite
- `DEPLOYMENT.md` - Guide de déploiement détaillé

---

## 🔒 SSL/HTTPS

### Certificate Let's Encrypt
- **Domaines**: alumni-ingemedia.net, www.alumni-ingemedia.net
- **Validité**: 13 janvier 2026 → 13 avril 2026
- **Renouvellement**: Automatique (Certbot Timer actif)

### Commandes utiles
```bash
# Vérifier certificat
sudo certbot certificates

# Test renouvellement
sudo certbot renew --dry-run

# Voir logs Apache
sudo tail -f /var/log/apache2/almuni-error.log
```

---

## 📋 TODO

- [ ] Rendre Responsive Accueil
- [ ] Améliorer performances API
- [ ] Ajouter pagination endpoints

---

## 📞 Support

Pour plus d'informations, voir `DEPLOYMENT.md`
