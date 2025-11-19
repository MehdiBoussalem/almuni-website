// Effet de scroll sur le header (Code existant conservé)
window.addEventListener('scroll', function() {
  const header = document.querySelector('header');
  if (header) header.classList.toggle('scrolled', window.scrollY > 50);
});

document.addEventListener('DOMContentLoaded', () => {
  // --- CONFIGURATION ---
  const API_BASE_URL = 'http://localhost:8000'; // URL du backend FastAPI
  
  // --- INITIALISATION DE LA CARTE ---
  const map = L.map('map', {
      scrollWheelZoom: true
  }).setView([46.603354, 1.888334], 6);

  // Utilisation de CartoDB Voyager
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
      
      // Afficher le nombre d'alumnis chargés
      if(countDisplay) countDisplay.innerText = alumnis.length;

      // Créer un marqueur pour chaque alumni
      alumnis.forEach(alumni => {
        // Vérifier que l'alumni a des coordonnées valides
        if (!alumni.latitude || !alumni.longitude) {
          return; // Ignorer cet alumni s'il n'a pas de coordonnées
        }

        const circle = L.circleMarker([alumni.latitude, alumni.longitude], markerOptions);

        // Récupérer le nom de l'entreprise si disponible
        const entrepriseInfo = alumni.entreprise_id 
          ? `chez <strong>${alumni.entreprise?.nom || 'Entreprise inconnue'}</strong>` 
          : '';

        // HTML DU POPUP
        const popupContent = `
            <div class="alumni-popup-header">
                <img src="${alumni.url_photo || 'https://i.pravatar.cc/150'}" 
                     alt="${alumni.prenom}" 
                     class="alumni-avatar"
                     onerror="this.src='https://i.pravatar.cc/150'">
                <h4 class="alumni-name">${alumni.prenom} ${alumni.nom}</h4>
                <span class="alumni-promo">Promo ${alumni.promo}</span>
            </div>
            <div class="alumni-popup-body">
                <div class="alumni-job">${alumni.poste}</div>
                ${entrepriseInfo ? `<div class="alumni-company">${entrepriseInfo}</div>` : ''}
                <div class="alumni-location">📍 Basé(e) à ${alumni.lieu}</div>
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