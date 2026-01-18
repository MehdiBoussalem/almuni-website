// Effet de scroll sur le header (Code existant conservé)
window.addEventListener('scroll', function() {
  const header = document.querySelector('header');
  if (header) header.classList.toggle('scrolled', window.scrollY > 50);
});

document.addEventListener('DOMContentLoaded', () => {
  // --- CONFIGURATION ---
  // Utilise l'origine courante du site (Apache reverse proxy) pour cibler l'API
  const API_BASE_URL = `${window.location.origin}/api`;
  
  // --- INITIALISATION DE LA CARTE ---
  const map = L.map('map', {
      scrollWheelZoom: true
  }).setView([46.603354, 1.888334], 6);

  // Utilisation de CartoDB Voyager (affiche automatiquement en français pour la France)
  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 20
  }).addTo(map);

  // --- CONFIGURATION DU CLUSTERING ---
  const markers = L.markerClusterGroup({
      showCoverageOnHover: false,
      maxClusterRadius: 60,
      spiderfyOnMaxZoom: true,
      
      iconCreateFunction: function (cluster) {
        var childCount = cluster.getChildCount();
        var c = ' marker-cluster-';
        if (childCount < 10) { c += 'small'; }
        else if (childCount < 100) { c += 'medium'; }
        else { c += 'large'; }

        return new L.DivIcon({ 
          html: '<div><span>' + childCount + '</span></div>', 
          className: 'marker-cluster-custom' + c, 
          iconSize: new L.Point(40, 40) 
        });
      }
  });

  // --- OPTIONS DES MARQUEURS ---
  const markerOptions = {
      radius: 6,
      fillColor: "#DE1251",
      color: "#fff",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8
  };

  // Répartit légèrement les points lorsqu'ils partagent la même localisation
  const buildLocationKey = (alumni) => `${Number(alumni.latitude).toFixed(4)}|${Number(alumni.longitude).toFixed(4)}`;
  const jitterCoordinates = (lat, lng, index, total) => {
    if (total <= 1) return [lat, lng];
    const angle = (index * 137.508) * Math.PI / 180; // angle d'or pour espacer
    const maxOffsetDeg = 0.002; // ~200m
    const radius = maxOffsetDeg * (0.4 + 0.6 * (index / Math.max(total - 1, 1)));
    const latOffset = radius * Math.sin(angle);
    const lngOffset = radius * Math.cos(angle) / Math.cos(lat * Math.PI / 180);
    return [lat + latOffset, lng + lngOffset];
  };

  // --- FONCTION POUR CHARGER LES ALUMNIS DEPUIS L'API ---
  async function loadAlumnis() {
    try {
      // Afficher un indicateur de chargement
      const countDisplay = document.getElementById('count-display');
      if(countDisplay) countDisplay.innerText = 'Chargement...';

      // Récupérer tous les alumnis (augmenter la limite si nécessaire)
      const response = await fetch(`${API_BASE_URL}/alumnis/?limit=10000`);
      
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const alumnis = await response.json();
      
      // Debug: Afficher les données pour vérifier
      console.log('Alumnis chargés:', alumnis);
      console.log('Exemple d\'alumni avec photo:', alumnis.find(a => a.photo));
      
      // Afficher le nombre d'alumnis chargés
      if(countDisplay) countDisplay.innerText = alumnis.length;

      // Calculer les doublons de localisation pour appliquer un léger bruit
      const locationCounts = new Map();
      alumnis.forEach(alumni => {
        if (!alumni.latitude || !alumni.longitude) return;
        const key = buildLocationKey(alumni);
        locationCounts.set(key, (locationCounts.get(key) || 0) + 1);
      });
      const locationProgress = new Map();

      // Créer un marqueur pour chaque alumni
      alumnis.forEach(alumni => {
        // Vérifier que l'alumni a des coordonnées valides
        if (!alumni.latitude || !alumni.longitude) {
          return; // Ignorer cet alumni s'il n'a pas de coordonnées
        }

        const locationKey = buildLocationKey(alumni);
        const totalAtLocation = locationCounts.get(locationKey) || 1;
        const currentIndex = locationProgress.get(locationKey) || 0;
        const [jitteredLat, jitteredLng] = jitterCoordinates(alumni.latitude, alumni.longitude, currentIndex, totalAtLocation);
        locationProgress.set(locationKey, currentIndex + 1);

        const circle = L.circleMarker([jitteredLat, jitteredLng], markerOptions);

        // Récupérer le nom de l'entreprise si disponible
        const entrepriseInfo = alumni.entreprise 
          ? `chez <strong>${alumni.entreprise}</strong>` 
          : '';

        // Créer le bouton LinkedIn s'il y a un lien
        const linkedinButton = alumni.linkedin 
          ? `<a href="${alumni.linkedin}" target="_blank" rel="noopener noreferrer" class="linkedin-button"><i class="mdi mdi-linkedin"></i> Profil LinkedIn</a>` 
          : '';

        // HTML DU POPUP
        const popupContent = `
            <div class="alumni-popup-header">
                <h4 class="alumni-name">${alumni.prenom} ${alumni.nom}</h4>
                <span class="alumni-promo">Promo ${alumni.promo}</span>
            </div>
            <div class="alumni-popup-body">
                <div class="alumni-job">${alumni.poste}</div>
                ${entrepriseInfo ? `<div class="alumni-company">${entrepriseInfo}</div>` : ''}
                <div class="alumni-location">📍 Basé(e) à ${alumni.ville}</div>
                ${linkedinButton ? `<div class="alumni-linkedin-section">${linkedinButton}</div>` : ''}
            </div>
        `;

        circle.bindPopup(popupContent);

        // Effets au survol
        circle.on('mouseover', function (e) {
            this.setStyle({ radius: 9, fillOpacity: 1, color: "#355F9B" });
        });
        circle.on('mouseout', function (e) {
            this.setStyle(markerOptions);
        });

        markers.addLayer(circle);
      });

      map.addLayer(markers);
      
      // Ajouter une échelle
      L.control.scale({ imperial: false }).addTo(map);
      
      // Force le redimensionnement correct
      setTimeout(() => { map.invalidateSize(); }, 200);

    } catch (error) {
      console.error('Erreur lors du chargement des alumnis:', error);
      const countDisplay = document.getElementById('count-display');
      if(countDisplay) {
        countDisplay.innerText = 'Erreur de chargement';
        countDisplay.style.color = 'red';
      }
      
      // Afficher un message d'erreur à l'utilisateur
      alert('Impossible de charger les données des alumnis. Veuillez vérifier que le serveur backend est démarré.');
    }
  }

  // Charger les alumnis au démarrage
  loadAlumnis();
});