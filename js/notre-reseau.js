// Effet de scroll sur le header (Code existant conservé)
window.addEventListener('scroll', function() {
  const header = document.querySelector('header');
  if (header) header.classList.toggle('scrolled', window.scrollY > 50);
});

document.addEventListener('DOMContentLoaded', () => {
  // --- CONFIGURATION ---
  const TOTAL_ALUMNI = 2048;
  
  // Coordonnées des principales villes pour simuler la concentration
  const cities = [
      { name: "Paris", lat: 48.8566, lng: 2.3522, weight: 0.35 }, 
      { name: "Lyon", lat: 45.7640, lng: 4.8357, weight: 0.15 },
      { name: "Marseille", lat: 43.2965, lng: 5.3698, weight: 0.10 },
      { name: "Bordeaux", lat: 44.8378, lng: -0.5792, weight: 0.10 },
      { name: "Toulouse", lat: 43.6047, lng: 1.4442, weight: 0.08 },
      { name: "Nantes", lat: 47.2184, lng: -1.5536, weight: 0.07 },
      { name: "Lille", lat: 50.6292, lng: 3.0573, weight: 0.05 },
      { name: "Strasbourg", lat: 48.5734, lng: 7.7521, weight: 0.05 },
      { name: "Montpellier", lat: 43.6108, lng: 3.8767, weight: 0.05 }
  ];

  // --- DATA GENERATORS ---
  const firstNames = ["Lucas", "Emma", "Hugo", "Chloé", "Louis", "Léa", "Gabriel", "Manon", "Arthur", "Camille", "Jules", "Inès", "Raphaël", "Sarah", "Paul", "Eva", "Antoine", "Alice", "Thomas", "Julie"];
  const lastNames = ["Martin", "Bernard", "Thomas", "Petit", "Robert", "Richard", "Durand", "Dubois", "Moreau", "Laurent", "Simon", "Michel", "Lefebvre", "Leroy", "Roux", "David", "Bertrand", "Morel", "Fournier", "Girard"];
  const jobs = ["Ingénieur Logiciel", "Chef de Projet", "Architecte", "Consultant Senior", "Data Scientist", "Développeur Fullstack", "Marketing Manager", "Directeur Financier", "Responsable RH", "UX Designer", "Product Owner"];
  const companies = ["TechSolutions", "InnovCorp", "Banque Nationale", "GreenEnergy", "Consulting Group", "WebAgency", "StartUp Flow", "Groupe Industriel", "Media France", "Santé Plus"];
  const promos = [2018, 2019, 2020, 2021, 2022, 2023];

  // --- INITIALISATION DE LA CARTE ---
  const map = L.map('map', {
      scrollWheelZoom: true
  }).setView([46.603354, 1.888334], 6);

  // Utilisation de CartoDB Voyager comme demandé dans le nouveau design
  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 20
  }).addTo(map);


  // --- FONCTION DE "JITTER" (Dispersion) ---
  function getJitteredCoords(lat, lng, spread = 0.08) {
      const r = spread * Math.sqrt(Math.random());
      const theta = Math.random() * 2 * Math.PI;
      const deltaLat = r * Math.cos(theta);
      const deltaLng = r * Math.sin(theta) * 1.5;
      return {
          lat: lat + deltaLat,
          lng: lng + deltaLng
      };
  }

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

        return new L.DivIcon({ html: '<div><span>' + childCount + '</span></div>', className: 'marker-cluster-custom' + c, iconSize: new L.Point(40, 40) });
    }
  });

  // --- GÉNÉRATION ---
  const markerOptions = {
      radius: 6,
      fillColor: "#DE1251",
      color: "#fff",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8
  };

  let displayedCount = 0;

  cities.forEach(city => {
      const count = Math.floor(TOTAL_ALUMNI * city.weight);
      
      for(let i = 0; i < count; i++) {
          const coords = getJitteredCoords(city.lat, city.lng, 0.08); 
          
          // Données aléatoires
          const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
          const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
          const job = jobs[Math.floor(Math.random() * jobs.length)];
          const company = companies[Math.floor(Math.random() * companies.length)];
          const promo = promos[Math.floor(Math.random() * promos.length)];
          
          // Avatar aléatoire
          const photoUrl = `https://i.pravatar.cc/150?u=${displayedCount + 100}`;

          const circle = L.circleMarker([coords.lat, coords.lng], markerOptions);

          // HTML DU POPUP
          const popupContent = `
              <div class="alumni-popup-header">
                  <img src="${photoUrl}" alt="${firstName}" class="alumni-avatar">
                  <h4 class="alumni-name">${firstName} ${lastName}</h4>
                  <span class="alumni-promo">Promo ${promo}</span>
              </div>
              <div class="alumni-popup-body">
                  <div class="alumni-job">${job}</div>
                  <div class="alumni-company">chez <strong>${company}</strong></div>
                  <div class="alumni-location">📍 Basé(e) à ${city.name}</div>
              </div>
          `;

          circle.bindPopup(popupContent);

          circle.on('mouseover', function (e) {
              this.setStyle({ radius: 9, fillOpacity: 1, color: "#355F9B" });
          });
          circle.on('mouseout', function (e) {
              this.setStyle(markerOptions);
          });

          markers.addLayer(circle);
          displayedCount++;
      }
  });

  map.addLayer(markers);
  
  const countDisplay = document.getElementById('count-display');
  if(countDisplay) countDisplay.innerText = displayedCount;
  
  L.control.scale({ imperial: false }).addTo(map);
  
  // Force le redimensionnement correct
  setTimeout(() => { map.invalidateSize(); }, 200);
});