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

**Date**: 10 janvier 2026  
**Status**: ✅ **Production en HTTP - Fonctionnel**  
**IP**: 37.59.115.57  
**Domaine**: alumni-ingemedia.net (DNS non encore correct)

### URLs actuelles:
- Frontend: `http://37.59.115.57/`
- API: `http://37.59.115.57/api/`
- Accès direct: `http://alumni-ingemedia.net/` (IPv6 temporaire)

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

## 🔄 Prochaines étapes (DNS + SSL)

### ⚠️ Problème actuel

Le domaine `alumni-ingemedia.net` pointe actuellement vers **IPv6** (2001:41d0:301::26) au lieu de **IPv4** (37.59.115.57).

**Vérification**:
```bash
dig alumni-ingemedia.net +short
# Retourne: 2001:41d0:301::26 (MAUVAIS)
# Devrait retourner: 37.59.115.57 (BON)
```

### ✅ Solution: Corriger le DNS

**Où**: Chez votre registraire de domaine (OVH, Namecheap, etc.) ou console OVHcloud

**À faire**:
1. Accédez au panneau de gestion de votre domaine
2. Modifiez l'enregistrement DNS **A** pour alumni-ingemedia.net
3. Mettez la valeur: **37.59.115.57**
4. Attendez la propagation DNS (~5-30 minutes)

**Vérification**:
```bash
# Attendre puis tester
dig alumni-ingemedia.net +short
# Devrait retourner: 37.59.115.57
```

### 🔒 Étape 1: Générer le certificat SSL

Une fois le DNS corrigé, exécutez:

```bash
sudo certbot --apache \
  -d alumni-ingemedia.net \
  -d www.alumni-ingemedia.net \
  --agree-tos \
  --no-eff-email \
  -m mehdiboussalem95@gmail.com
```

**Certbot va**:
- Valider que vous êtes propriétaire du domaine
- Générer le certificat Let's Encrypt (gratuit)
- Modifier automatiquement le VirtualHost Apache
- Ajouter la redirection HTTP → HTTPS
- Configurer le renouvellement automatique

**Résultat**: Votre site sera accessible en **HTTPS** 🔐

### 🔒 Étape 2: Vérifier le renouvellement automatique SSL

Let's Encrypt émet des certificats valides **90 jours**. Le renouvellement est automatique via:

```bash
# Vérifier
sudo systemctl status certbot.timer
# ✓ Active: active (waiting)

# Ou forcer un test de renouvellement
sudo certbot renew --dry-run
```

### 🔒 Étape 3: Redémarrer Apache après SSL

```bash
sudo systemctl reload apache2
```

**Résultat final**: 
- ✅ Site accessible en HTTPS
- ✅ Certificat valide (cadenas vert)
- ✅ Redirection automatique HTTP → HTTPS
- ✅ Score SSL A+

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

### Tests API
```bash
# Test direct API
curl http://127.0.0.1:8000/

# Test via Apache proxy
curl http://37.59.115.57/api/

# Test sur le domaine (une fois DNS correct)
curl http://alumni-ingemedia.net/api/
curl https://alumni-ingemedia.net/api/  # Après SSL

# Récupérer les alumni
curl http://37.59.115.57/api/alumnis/

# Compter les inscrits
curl http://37.59.115.57/api/inscrits-soiree/count
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
# Vérifier la config proxy
grep -A 2 "ProxyPass" /etc/apache2/sites-available/almuni.conf

# Doit afficher:
# ProxyPass /api/ http://127.0.0.1:8000/
# ProxyPassReverse /api/ http://127.0.0.1:8000/

# Si manquant le "/" après "api", recharger Apache
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

## 📊 Checklist avant déploiement final (HTTPS)

- [ ] ✅ DNS pointe vers 37.59.115.57
- [ ] ✅ `dig alumni-ingemedia.net +short` retourne 37.59.115.57
- [ ] ✅ Frontend accessible en HTTP: `http://37.59.115.57/`
- [ ] ✅ API répond en HTTP: `curl http://37.59.115.57/api/`
- [ ] ✅ Certificat SSL généré: `sudo certbot --apache -d alumni-ingemedia.net`
- [ ] ✅ Site accessible en HTTPS: `https://alumni-ingemedia.net`
- [ ] ✅ Redirection HTTP → HTTPS fonctionne
- [ ] ✅ Logs Apache clean (aucune erreur 5xx)
- [ ] ✅ API accessible depuis navigateur (pas de CORS errors)
- [ ] ✅ Cron renouvellement SSL activé

---

## 📚 Ressources

- **FastAPI Docs**: http://127.0.0.1:8000/docs (API en développement)
- **Let's Encrypt**: https://letsencrypt.org
- **Apache Docs**: https://httpd.apache.org/docs/
- **Certbot Guide**: https://certbot.eff.org/instructions

---

## 🎯 Résumé actions à faire

### **IMMÉDIATEMENT** (avant SSL):
1. ✅ **DNS**: Corriger chez votre registraire (alumni-ingemedia.net → 37.59.115.57)
2. ✅ **Attendre**: Propagation DNS (~5-30 min)
3. ✅ **Tester**: `dig alumni-ingemedia.net +short` retourne 37.59.115.57

### **APRÈS** (DNS correct):
1. ✅ **SSL**: Exécuter `sudo certbot --apache -d alumni-ingemedia.net -d www.alumni-ingemedia.net`
2. ✅ **Reload**: `sudo systemctl reload apache2`
3. ✅ **Vérifier**: Accéder à `https://alumni-ingemedia.net` ✓

---

**Dernière mise à jour**: 10 janvier 2026  
**Responsable déploiement**: Mehdi Boussalem  
**Email support**: mehdiboussalem95@gmail.com
