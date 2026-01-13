# �배 Déploiement Alumni Website - Guide Complet

## 📋 Table des matières
1. [État actuel du déploiement](#état-actuel)
2. [Architecture](#architecture)
3. [Étapes complétées](#étapes-complétées)
4. [Prochaines étapes (SSL/HTTPS)](#prochaines-étapes)
5. [Commandes utiles](#commandes-utiles)
6. [Troubleshooting](#troubleshooting)

---

## 🟢 État actuel du déploiement

**Date**: 13 janvier 2026  
**Status**: ✅ **Production en HTTPS - Entièrement Fonctionnel**  
**IP**: 37.59.115.57  
**Domaine**: alumni-ingemedia.net (DNS ✅ Correct)

### URLs actuelles:
- Frontend: `https://alumni-ingemedia.net/`
- API: `https://alumni-ingemedia.net/api/`
- Accès HTTP: `http://alumni-ingemedia.net/` → Redirige vers HTTPS ✅
- Certificat SSL: Let's Encrypt (valide jusqu'au 13 avril 2026)

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────┐
│         Internet (37.59.115.57)                 │
└────────────────────┬────────────────────────────┘
                     │
         ┌───────────▼───────────┐
         │    Apache2 (Port 80)  │
         │   VirtualHost almuni  │
         └───────────┬───────────┘
                     │
        ┌────────────┴────────────┐
        │                         │
   ┌────▼─────┐           ┌──────▼──────┐
   │ Frontend  │           │ API Proxy   │
   │ (HTML/CSS)│           │   /api/     │
   │   /js     │           │             │
   └───────────┘           └──────┬──────┘
                                  │
                           ┌──────▼───────┐
                           │  Uvicorn     │
                           │ :8000        │
                           │ (FastAPI)    │
                           └──────┬───────┘
                                  │
                           ┌──────▼───────┐
                           │  SQLite      │
                           │ alumni.db    │
                           └──────────────┘
```

---

## ✅ Étapes complétées

### 1. Infrastructure serveur Linux
```bash
✓ Ubuntu/Debian installé
✓ Apache2 installé avec modules proxy et rewrite
✓ Python 3.13 avec pip
✓ Certbot et python3-certbot-apache installés
```

### 2. Configuration Apache VirtualHost
**Fichier**: `/etc/apache2/sites-available/almuni.conf`

```apache
<VirtualHost *:80>
    ServerName alumni-ingemedia.net
    ServerAlias www.alumni-ingemedia.net
    
    # Frontend (fichiers statiques)
    DocumentRoot /home/adminstg/almuni-website
    
    <Directory /home/adminstg/almuni-website>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
        
        # Rewrite rules pour SPA
        <IfModule mod_rewrite.c>
            RewriteEngine On
            RewriteBase /
            RewriteRule ^index\.html$ - [L]
            RewriteCond %{REQUEST_FILENAME} !-f
            RewriteCond %{REQUEST_FILENAME} !-d
            RewriteRule . /index.html [L]
        </IfModule>
    </Directory>
    
    # Proxy pour l'API
    ProxyPreserveHost On
    ProxyPass /api/ http://127.0.0.1:8000/
    ProxyPassReverse /api/ http://127.0.0.1:8000/
    
    # Logs
    ErrorLog ${APACHE_LOG_DIR}/almuni-error.log
    CustomLog ${APACHE_LOG_DIR}/almuni-access.log combined
</VirtualHost>
```

**Status**: ✅ Activé et fonctionnel
```bash
sudo a2ensite almuni.conf  # Déjà fait
sudo apache2ctl configtest # Syntax OK
sudo systemctl status apache2 # active (running)
```

### 3. Virtualenv et dépendances Python
**Emplacement**: `/home/adminstg/almuni-website/backend/venv`

```bash
✓ Python virtualenv créé
✓ Toutes les dépendances installées:
  - fastapi
  - uvicorn
  - sqlalchemy
  - python-dotenv
  - email-validator
  - faker
  - (+ autres)
```

### 4. Service Uvicorn (API FastAPI)
**Fichier**: `/etc/systemd/system/almuni-api.service`

```ini
[Unit]
Description=Almuni API Backend (FastAPI + Uvicorn)
After=network.target

[Service]
User=adminstg
WorkingDirectory=/home/adminstg/almuni-website/backend
Environment="PATH=/home/adminstg/almuni-website/backend/venv/bin"
ExecStart=/home/adminstg/almuni-website/backend/venv/bin/uvicorn app.main:app --host 127.0.0.1 --port 8000 --workers 4
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

**Status**: ✅ Active et démarrée
```bash
sudo systemctl status almuni-api.service
# ● almuni-api.service - Almuni API Backend (FastAPI + Uvicorn)
#    Active: active (running)
```

### 5. Configuration CORS (BackEnd)
**Fichier**: `/home/adminstg/almuni-website/backend/app/main.py` (lignes 13-17)

```python
# Configuration CORS
origins = [
    "https://alumni-ingemedia.net",
    "https://www.alumni-ingemedia.net",
]
```

**Note**: Actuellement en HTTPS dans le code (prêt pour le SSL).

### 6. Base de données SQLite
**Emplacement**: `/home/adminstg/almuni-website/backend/alumni.db`
- ✅ Créée automatiquement par SQLAlchemy
- ✅ Contient les tables alumni et inscrits_soiree
- ✅ Les données sont persistantes

---

## ✅ SSL/HTTPS - Configuration complétée

### 🔒 Certificat Let's Encrypt installé

```bash
Certificate Name: alumni-ingemedia.net
  Serial Number: 53f9c253702b32bbc071b90da6b7b809a9d
  Key Type: ECDSA
  Domains: alumni-ingemedia.net www.alumni-ingemedia.net
  Expiry Date: 2026-04-13 12:33:17+00:00 (VALID: 89 days)
  Certificate Path: /etc/letsencrypt/live/alumni-ingemedia.net/fullchain.pem
  Private Key Path: /etc/letsencrypt/live/alumni-ingemedia.net/privkey.pem
```

### 🔄 Configuration Apache HTTPS

**Fichier**: `/etc/apache2/sites-available/alumni-le-ssl.conf`

Proxy correctement configuré avec `/api/` (avec slash final):
```apache
ProxyPass /api/ http://127.0.0.1:8000/
ProxyPassReverse /api/ http://127.0.0.1:8000/
```

**Status**: ✅ Actif et fonctionnel

### 🔄 Redirection HTTP → HTTPS

**Fichier**: `/etc/apache2/sites-available/alumni.conf`

Redirige tous les appels HTTP vers HTTPS:
```apache
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

**Status**: ✅ Actif

### ✅ Renouvellement automatique SSL

```bash
# Status
sudo systemctl status certbot.timer
# ● certbot.timer - Run certbot twice daily
#    Active: active (waiting)

# Test renouvellement (dry-run)
sudo certbot renew --dry-run
# The following simulated renewals succeeded:
#   /etc/letsencrypt/live/alumni-ingemedia.net/fullchain.pem (success)
```

**Résultat final**: 
- ✅ Site accessible en HTTPS
- ✅ Certificat valide (cadenas vert 🔒)
- ✅ Redirection automatique HTTP → HTTPS
- ✅ Renouvellement automatique tous les 90 jours

---

## 📝 Commandes utiles

### Gestion du service API
```bash
# Statut
sudo systemctl status almuni-api.service

# Restart
sudo systemctl restart almuni-api.service

# Logs temps réel
sudo journalctl -u almuni-api.service -f

# Logs des 50 dernières lignes
sudo journalctl -u almuni-api.service -n 50
```

### Gestion d'Apache
```bash
# Statut
sudo systemctl status apache2

# Test config
sudo apache2ctl configtest

# Reload (sans arrêt)
sudo systemctl reload apache2

# Restart complet
sudo systemctl restart apache2

# Logs erreurs
sudo tail -f /var/log/apache2/almuni-error.log

# Logs accès
sudo tail -f /var/log/apache2/almuni-access.log
```

### Gestion du SSL
```bash
# Lister les certificats
sudo certbot certificates

# Renouveler maintenant
sudo certbot renew --force-renewal

# Tester le renouvellement
sudo certbot renew --dry-run
```

### Tests API (HTTPS)
```bash
# Test direct API (en local)
curl http://127.0.0.1:8000/

# Test via Apache proxy en HTTPS
curl https://alumni-ingemedia.net/api/

# Récupérer les alumni
curl https://alumni-ingemedia.net/api/alumnis/

# Récupérer avec limite
curl 'https://alumni-ingemedia.net/api/alumnis/?limit=100'

# Compter les inscrits
curl https://alumni-ingemedia.net/api/inscrits-soiree/count

# Récupérer un alumni spécifique
curl https://alumni-ingemedia.net/api/alumnis/1
```

---

## 🐛 Troubleshooting

### Problème: "Connection refused" sur l'API
```bash
# Vérifier que le service tourne
sudo systemctl status almuni-api.service

# Redémarrer
sudo systemctl restart almuni-api.service

# Vérifier les logs
sudo journalctl -u almuni-api.service -n 20
```

### Problème: Apache retourne 404 sur /api/
```bash
# Vérifier la config proxy (HTTPS)
grep -A 2 "ProxyPass" /etc/apache2/sites-available/alumni-le-ssl.conf

# Doit afficher:
# ProxyPass /api/ http://127.0.0.1:8000/
# ProxyPassReverse /api/ http://127.0.0.1:8000/

# ⚠️ IMPORTANT: Le "/" final après "api" est OBLIGATOIRE!
# ProxyPass /api/ ✅
# ProxyPass /api ❌ (va causer des 404)

# Si modifié:
sudo apache2ctl configtest
sudo systemctl reload apache2
```

### Problème: CORS errors depuis le navigateur
```bash
# Vérifier que le domaine est dans CORS
cat /home/adminstg/almuni-website/backend/app/main.py | grep -A 5 "origins ="

# Doit contenir votre domaine (https://alumni-ingemedia.net)

# Si modifié, redémarrer l'API:
sudo systemctl restart almuni-api.service
```

### Problème: SSL certificate not valid
```bash
# Après correction du DNS, générer le certificat:
sudo certbot --apache -d alumni-ingemedia.net -d www.alumni-ingemedia.net

# Vérifier les certificats:
sudo certbot certificates

# Renouveler manuellement:
sudo certbot renew --force-renewal
```

### Problème: Base de données bloquée
```bash
# SQLite est single-file, rarement problématique
# Mais si erreur de verrous:

# 1. Redémarrer l'API
sudo systemctl restart almuni-api.service

# 2. Vérifier les processus
lsof /home/adminstg/almuni-website/backend/alumni.db

# 3. Vérifier l'espace disque
df -h
```

---

## 📊 Checklist de déploiement (COMPLÉTÉE ✅)

### Infrastructure
- [x] ✅ DNS pointe vers 37.59.115.57
- [x] ✅ `dig alumni-ingemedia.net +short` retourne 37.59.115.57
- [x] ✅ Apache2 installé et configuré
- [x] ✅ Python 3.13 + FastAPI backend
- [x] ✅ SQLite database persistante

### Déploiement HTTP
- [x] ✅ Frontend accessible en HTTP: `http://37.59.115.57/`
- [x] ✅ API répond en HTTP: `curl http://37.59.115.57/api/`
- [x] ✅ Proxy Apache configuré: `/api/` → `localhost:8000`

### SSL/HTTPS
- [x] ✅ Certificat SSL généré et installé
- [x] ✅ Site accessible en HTTPS: `https://alumni-ingemedia.net` ✅
- [x] ✅ Redirection HTTP → HTTPS fonctionne ✅
- [x] ✅ Renouvellement automatique activé ✅
- [x] ✅ Certificate valide (89 jours)

### Tests finaux
- [x] ✅ Logs Apache clean (aucune erreur 5xx)
- [x] ✅ API accessible depuis navigateur
- [x] ✅ `/api/alumnis/` retourne les données
- [x] ✅ Pas d'erreurs CORS
- [x] ✅ Performance acceptable

---

## 📚 Ressources

- **FastAPI Docs**: http://127.0.0.1:8000/docs (API en développement)
- **Let's Encrypt**: https://letsencrypt.org
- **Apache Docs**: https://httpd.apache.org/docs/
- **Certbot Guide**: https://certbot.eff.org/instructions

---

## 🎯 Résumé du déploiement

### ✅ COMPLÉTÉ
1. ✅ DNS corrigé (37.59.115.57) - Propagation confirmée
2. ✅ SSL généré et installé via Let's Encrypt
3. ✅ Apache configuré avec HTTPS + Proxy API
4. ✅ Redirection HTTP → HTTPS activée
5. ✅ API backend fonctionnelle en HTTPS
6. ✅ Renouvellement SSL automatique

### 📍 Production Status

| Composant | Status | URL |
|-----------|--------|-----|
| Frontend | ✅ | https://alumni-ingemedia.net |
| API | ✅ | https://alumni-ingemedia.net/api/ |
| SSL Cert | ✅ | Valid until 2026-04-13 |
| Auto Renew | ✅ | certbot.timer active |
| HTTP → HTTPS | ✅ | 301 Redirect |

### 🚀 Prêt pour la production

Le site **alumni-ingemedia.net** est maintenant opérationnel en **HTTPS** avec:
- ✅ Certificat SSL valide (Let's Encrypt)
- ✅ Backend API fully functional
- ✅ Renouvellement automatique chaque 90 jours
- ✅ Redirection HTTP → HTTPS
- ✅ Architecture sécurisée

---

**Dernière mise à jour**: 13 janvier 2026 (SSL ✅ Complété)  
**Responsable déploiement**: Mehdi Boussalem  
**Email support**: mehdiboussalem95@gmail.com
