// Effet de scroll sur le header
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (header) header.classList.toggle('scrolled', window.scrollY > 50);
});






// Carte Alumni depuis CSV (PapaParse) + clustering (MarkerCluster) pour gros volumes

// 1) Dictionnaire ville -> [lat, lng]
const cityCoords = {
  // France (principales)
  'paris': [48.8566, 2.3522], 'marseille': [43.2965, 5.3698], 'lyon': [45.7640, 4.8357],
  'toulouse': [43.6045, 1.4442], 'nice': [43.7102, 7.2620], 'nantes': [47.2184, -1.5536],
  'montpellier': [43.6119, 3.8772], 'strasbourg': [48.5734, 7.7521], 'bordeaux': [44.8378, -0.5792],
  'lille': [50.6292, 3.0573], 'rennes': [48.1173, -1.6778], 'reims': [49.2583, 4.0317],
  'saint-etienne': [45.4397, 4.3872], 'toulon': [43.1242, 5.9280], 'grenoble': [45.1885, 5.7245],
  'dijon': [47.3220, 5.0415], 'angers': [47.4784, -0.5632], 'nimes': [43.8367, 4.3601],
  'clermont-ferrand': [45.7772, 3.0870], 'le havre': [49.4944, 0.1079], 'le-havre': [49.4944, 0.1079],
  'rouen': [49.4431, 1.0993], 'metz': [49.1193, 6.1757], 'besancon': [47.2378, 6.0241],
  'orleans': [47.9029, 1.9093], 'caen': [49.1829, -0.3707], 'brest': [48.3904, -4.4861],
  'limoges': [45.8336, 1.2611], 'perpignan': [42.6887, 2.8948], 'amiens': [49.8941, 2.2958],
  'tours': [47.3941, 0.6848], 'avignon': [43.9493, 4.8055], 'troyes': [48.2973, 4.0744],
  'pau': [43.2951, -0.3708], 'bayonne': [43.4929, -1.4748], 'annecy': [45.8992, 6.1294],
  'cannes': [43.5528, 7.0174], 'antibes': [43.5804, 7.1251], 'valence': [44.9334, 4.8924],
  // International
  'montreal': [45.5019, -73.5674], 'londres': [51.5074, -0.1278], 'new-york': [40.7128, -74.0060],
  'dubai': [25.276987, 55.296249], 'singapour': [1.3521, 103.8198]
};

// 2) Normalisation noms de ville
function normalizeCityName(name) {
  return String(name || '')
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase().trim().replace(/\s+/g, '-');
}

// 3) Carte Leaflet
const map = L.map('alumni-map', { zoomControl: true, scrollWheelZoom: true, preferCanvas: true })
  .setView([46.6, 2.2], 6);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18, attribution: '&copy; OpenStreetMap contributeurs'
}).addTo(map);

// Assure le recalcul une fois tout chargé
window.addEventListener('load', () => {
  map.invalidateSize();
  setTimeout(() => map.invalidateSize(), 100); // double appel pour forcer le recalcul
});
window.addEventListener('resize', () => map.invalidateSize()); // nouveau

// 4) Cluster (fallback si plugin absent)
const hasCluster = typeof L.markerClusterGroup === 'function';
if (!hasCluster) console.warn('[notre-reseau] MarkerCluster non chargé: fallback sans clustering.');

const cluster = hasCluster
  ? L.markerClusterGroup({
      chunkedLoading: true, chunkDelay: 50, chunkInterval: 200,
      spiderfyOnMaxZoom: true, showCoverageOnHover: false,
      maxClusterRadius: 60, disableClusteringAtZoom: 12
    })
  : L.featureGroup();

map.addLayer(cluster);

// Active le switch auto cercles <-> points
const ZOOM_THRESHOLD = 9;   // seuil de zoom pour basculer en points
let circlesGroup = null;    // sera construit après le parsing
// Ajouter un groupe pour les points par ville (cluster si dispo)
let cityPointsGroup = null;

// 5) Popup
function popupHtml(a) {
  const photo = a.photo || `https://i.pravatar.cc/120?u=${encodeURIComponent(a.nom + a.prenom)}`;
  const safeLinkedIn = a.linkedin || '#';
  return `
    <div class="alumni-card">
      <img src="${photo}" alt="${a.prenom} ${a.nom}" class="alumni-photo" loading="lazy" />
      <div class="alumni-info">
        <h4>${a.prenom} ${a.nom}</h4>
        <p>${a.job} <span class="at">chez</span> ${a.entreprise}</p>
        <p class="at">${a.ville}</p>
        <a href="${safeLinkedIn}" target="_blank" rel="noopener" class="alumni-link">
          <i class="mdi mdi-linkedin"></i> Profil LinkedIn
        </a>
      </div>
    </div>
  `;
}

// Popup de ville: liste tous les alumni de la ville (réutilisé dans le panneau)
function cityPopupHtml(city) {
  const { label, count, items } = city;
  const list = items.map(p => `
    <li class="alumni-item">
      <img src="${p.photo || `https://i.pravatar.cc/64?u=${encodeURIComponent(p.nom + p.prenom)}`}" 
           alt="${p.prenom} ${p.nom}" class="alumni-thumb" loading="lazy"/>
      <div class="alumni-meta">
        <strong>${p.prenom} ${p.nom}</strong>
        <div>${p.job || ''}${p.entreprise ? ` <span class="at">chez</span> ${p.entreprise}` : ''}</div>
        ${p.linkedin ? `<a href="${p.linkedin}" target="_blank" rel="noopener" class="alumni-link"><i class="mdi mdi-linkedin"></i> LinkedIn</a>` : ''}
      </div>
    </li>
  `).join('');
  return `
    <div class="city-popup">
      <h4>${label} — ${count} alumni</h4>
      <ul class="alumni-list">${list}</ul>
    </div>
  `;
}

// 6) Chargement CSV (streaming) + ajout par lots
const inconnues = new Set();
const cityAgg = new Map(); // { key -> { coords:[lat,lng], count:n, label:'Ville', items:[alumni] } }
const CSV_URL = new URL('../alumni_fake_data_final.csv', window.location.href).href;
console.log('[notre-reseau] CSV URL résolue:', CSV_URL);

let totalRows = 0;
let totalMarkers = 0;

if (typeof Papa === 'undefined') {
  console.error('PapaParse non chargé. Vérifiez la balise <script> correspondante.');
  // Sortir proprement si Papa absent
  // return; // décommentez si besoin
}

function parseCsv(useWorker = true) {
  if (typeof Papa === 'undefined') return;

  Papa.parse(CSV_URL, {
    download: true,
    header: true,
    skipEmptyLines: true,
    worker: useWorker,
    chunk: function(results) {
      // On n’ajoute plus de marqueurs individuels ici: on agrège par ville
      results.data.forEach(row => {
        totalRows++;

        const a = {
          nom: row['Nom']?.trim() || '',
          prenom: row['Prénom']?.trim() || row['Prenom']?.trim() || '',
          linkedin: row['LinkedIn']?.trim() || '',
          photo: row['Photo']?.trim() || '',
          entreprise: row['Entreprise']?.trim() || '',
          job: row['Job']?.trim() || '',
          ville: row['Ville']?.trim() || ''
        };

        if (!a.ville) return;
        const key = normalizeCityName(a.ville);
        const coords = cityCoords[key];
        if (!coords) { inconnues.add(a.ville); return; }

        if (!cityAgg.has(key)) {
          cityAgg.set(key, { coords, count: 0, label: a.ville, items: [] });
        }
        const entry = cityAgg.get(key);
        entry.count++;
        entry.items.push(a);
      });
    },
    complete: function() {
      // Construire Cercles proportionnels (vue dézoomée)
      const canvasRenderer = L.canvas({ padding: 0.2 });
      circlesGroup = L.featureGroup(); // important pour getBounds()
      Array.from(cityAgg.values()).forEach(city => {
        const r = 4 + Math.sqrt(city.count) * 2;
        const cm = L.circleMarker(city.coords, {
          renderer: canvasRenderer,
          radius: r,
          color: '#1976d2',
          weight: 1,
          fillColor: '#2196f3',
          fillOpacity: 0.35
        })
        .bindTooltip(`${city.label}: ${city.count} alumni`, { direction: 'top' })
        .addTo(circlesGroup);
      });

      // Construire Points (un marqueur par ville, SANS popup)
      const cityMarkers = [];
      Array.from(cityAgg.values()).forEach(city => {
        const m = L.marker(city.coords);
        cityMarkers.push(m);
      });

      cityPointsGroup = hasCluster
        ? L.markerClusterGroup({
            chunkedLoading: true, chunkDelay: 50, chunkInterval: 200,
            spiderfyOnMaxZoom: true, showCoverageOnHover: false,
            maxClusterRadius: 60, disableClusteringAtZoom: 12
          })
        : L.layerGroup();

      if (typeof cityPointsGroup.addLayers === 'function') {
        cityPointsGroup.addLayers(cityMarkers);
      } else {
        cityMarkers.forEach(m => cityPointsGroup.addLayer(m));
      }

      // Cercles visibles par défaut
      if (map.hasLayer(cluster)) map.removeLayer(cluster);
      map.addLayer(circlesGroup);

      function updateLayersByZoom() {
        const z = map.getZoom();
        if (z >= ZOOM_THRESHOLD) {
          if (map.hasLayer(circlesGroup)) map.removeLayer(circlesGroup);
          if (!map.hasLayer(cityPointsGroup)) map.addLayer(cityPointsGroup);
        } else {
          if (map.hasLayer(cityPointsGroup)) map.removeLayer(cityPointsGroup);
          if (!map.hasLayer(circlesGroup)) map.addLayer(circlesGroup);
        }
      }
      map.on('zoomend', updateLayersByZoom);
      updateLayersByZoom();

      // Fit sécurisé
      if (circlesGroup && typeof circlesGroup.getBounds === 'function' && circlesGroup.getLayers().length > 0) {
        map.addLayer(circlesGroup);
        map.fitBounds(circlesGroup.getBounds(), { padding: [20, 20] });
      } else {
        map.setView([46.6, 2.2], 6);
      }
      setTimeout(() => map.invalidateSize(), 0);

      // Logs
      totalMarkers = cityMarkers.length;
      console.log(`[notre-reseau] Villes: ${totalMarkers}, lignes CSV: ${totalRows}`);
      if (inconnues.size) console.warn('Villes non trouvées dans le dictionnaire:', [...inconnues]);
    },
    error: function(err) {
      if (useWorker) {
        console.warn('[notre-reseau] Échec avec worker, on retente sans worker.', err);
        parseCsv(false);
      } else {
        console.error('Erreur de chargement CSV:', err);
      }
    }
  });
}

// Lancer le parsing (worker par défaut)
parseCsv(true);