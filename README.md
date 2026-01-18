# 🎓 Alumni Website - IngeMedia

**Un réseau, une communauté, une ambition commune !**

## 🚀 Démarrage rapide

- 🌐 **Site**: https://alumni-ingemedia.net
- 🔌 **API**: https://alumni-ingemedia.net/api/
- 📚 **Documentation**: Voir les fichiers `.md` ci-dessous

### Status Production
✅ **Production en HTTPS - Entièrement Fonctionnel**  
- Serveur: 37.59.115.57 (HTTPS)
- SSL: Let's Encrypt (valide jusqu'au 13 avril 2026)
- API: FastAPI + SQLite
- Frontend: HTML5, CSS3, JavaScript

---

## 📖 Documentation

### 📘 [DOCUMENTATION.md](DOCUMENTATION.md)
**Guide complet du site web**
- Pages et fonctionnalités détaillées
- Guide utilisateur
- Architecture technique
- Gestion des données
- Commandes de maintenance

### 🔌 [API.md](API.md)
**Documentation complète de l'API REST**
- Endpoints Alumni, Soirée, T-Shirts
- Exemples de requêtes (cURL, JavaScript, Python)
- Gestion des erreurs
- Pagination

### 🚀 [DEPLOYMENT.md](DEPLOYMENT.md)
**Guide de déploiement**
- Configuration du serveur
- Certificat SSL
- Commandes de redémarrage
- Troubleshooting

---

## 🎯 Fonctionnalités principales

- 👥 **Annuaire Alumni** - Recherche et consulter le réseau
- 🎫 **Inscriptions** - S'inscrire aux événements (soirées)
- 👕 **Commandes T-Shirts** - Commander des T-shirts personnalisés
- 📚 **Archives** - Consulter les promotions (2015-2025)
- 📱 **Responsive Design** - Optimisé pour mobile

---

## 📂 Structure du projet

```
almuni-website/
├── index.html                    # Accueil
├── pages/                        # Pages du site
│   ├── evenement.html
│   ├── soiree.html
│   ├── tshirt.html
│   ├── notre-reseau.html
│   └── archives/
├── styles/                       # CSS
├── js/                          # JavaScript
├── backend/                     # API FastAPI
│   └── app/
│       ├── main.py
│       ├── models.py
│       ├── schemas.py
│       └── crud.py
├── DOCUMENTATION.md             # Guide complet
├── API.md                       # Documentation API
└── DEPLOYMENT.md                # Guide déploiement
```

---

## 📝 TODO

- Ajouter un formulaire de désinscription alumni
- Ajouter l'archive 2026
- Sécuriser l'API

---

## 🎨 Design

| Élément | Valeur |
|---------|--------|
| **Bleu foncé** | `#355F9B` |
| **Bleu clair** | `#7AC9F2` |
| **Bordeaux** | `#B11A5F` |
| **Rouge** | `#DE1251` |
| **Titres** | BEBAS NEUE REGULAR |
| **Texte** | Montserrat |

---

## ⚡ Commandes utiles

### Gestion du service
```bash
# Redémarrer l'API
sudo systemctl restart almuni

# Statut du service
sudo systemctl status almuni

# Redémarrer Apache
sudo systemctl restart apache2
```

### Renouvellement SSL
```bash
# Test renouvellement
sudo certbot renew --dry-run

# Renouveler maintenant
sudo certbot renew

# Voir les certificats
sudo certbot certificates
```

### Logs
```bash
# Logs Apache
sudo tail -f /var/log/apache2/almuni-error.log

# Logs API
journalctl -u almuni -f
```

---

## 📞 Support

Pour toute question :
- 📘 Consulter la [Documentation complète](DOCUMENTATION.md)
- 🔌 Voir l'[API Documentation](API.md)
- 🚀 Voir le [Guide de déploiement](DEPLOYMENT.md)
