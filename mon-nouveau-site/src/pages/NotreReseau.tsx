import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster";
import Dashboard from "../components/Dashboard";

interface Alumni {
  latitude: number;
  longitude: number;
  prenom: string;
  nom: string;
  promo: string | number;
  poste?: string;
  entreprise?: string;
  linkedin?: string;
  ville?: string;
  pays?: string;
}

// Base de l'API FastAPI (pas de préfixe /api sur ce backend)
const API_BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

type TabType = "map" | "dashboard";

export default function NotreReseau() {
  const mapRef = useRef<L.Map | null>(null);
  const clusterRef = useRef<L.MarkerClusterGroup | null>(null);
  const markerIndexRef = useRef<Map<string, L.CircleMarker>>(new Map());
  const [activeTab, setActiveTab] = useState<TabType>("map");
  const [alumnis, setAlumnis] = useState<Alumni[]>([]);
  const [alumniCount, setAlumniCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [showRemovalForm, setShowRemovalForm] = useState<boolean>(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Alumni[]>([]);
  const [removalForm, setRemovalForm] = useState({
    prenom: "",
    nom: "",
    email: "",
    linkedin: "",
  });
  const [registrationForm, setRegistrationForm] = useState({
    prenom: "",
    nom: "",
    email: "",
    promo: "",
    linkedin: "",
    ville: "",
    poste: "",
    entreprise: "",
  });

  // Ajoute un léger jitter pour séparer des points qui se superposent
  const jitterCoordinates = (lat: number, lng: number, index: number, total: number) => {
    if (total <= 1) return [lat, lng];
    const angle = (index * 137.508) * Math.PI / 180; // angle d'or
    const maxOffsetDeg = 0.002; // ~200m
    const radius = maxOffsetDeg * (0.4 + 0.6 * (index / Math.max(total - 1, 1)));
    const latOffset = radius * Math.sin(angle);
    const lngOffset = radius * Math.cos(angle) / Math.cos(lat * Math.PI / 180);
    return [lat + latOffset, lng + lngOffset];
  };

  // Clef unique pour retrouver le marker correspondant
  const buildAlumniKey = (a: Alumni) => `${a.prenom.toLowerCase()}|${a.nom.toLowerCase()}|${a.promo}|${Number(a.latitude).toFixed(5)}|${Number(a.longitude).toFixed(5)}`;

  // Génère l'icône de cluster avec couleurs custom
  const buildClusterIcon = (childCount: number) => {
    let outer = "rgba(122, 201, 242, 0.6)";
    let inner = "#7AC9F2";

    if (childCount >= 100) {
      outer = "rgba(177, 26, 95, 0.6)";
      inner = "#B11A5F";
    } else if (childCount >= 10) {
      outer = "rgba(53, 95, 155, 0.6)";
      inner = "#355F9B";
    }

    const html = `
      <div style="background:${outer}; border-radius:20px; width:40px; height:40px; display:flex; align-items:center; justify-content:center;">
        <div style="background:${inner}; width:30px; height:30px; border-radius:15px; display:flex; align-items:center; justify-content:center; color:#fff; font-family:'Bebas Neue', sans-serif; font-size:14px; line-height:30px;">${childCount}</div>
      </div>
    `;

    return new L.DivIcon({ html, className: "", iconSize: new L.Point(40, 40) });
  };

  // Construit le HTML du popup en Tailwind inline
  const buildPopupContent = (alumni: Alumni) => {
    const entrepriseInfo = alumni.entreprise ? `chez <strong>${alumni.entreprise}</strong>` : "";
    const linkedinButton = alumni.linkedin
      ? `<a href="${alumni.linkedin}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-[#0A66C2] text-white font-semibold text-sm shadow-sm transition hover:bg-[#084298] no-underline">`+
        `<span class="text-lg" aria-hidden="true">🔗</span> Profil LinkedIn</a>`
      : "";

    return `
      <div class="bg-bleu-fonce text-white text-center px-4 py-5 space-y-2">
        <h4 class="font-title text-xl tracking-wide leading-tight m-0">${alumni.prenom} ${alumni.nom}</h4>
        <span class="inline-block text-xs bg-bordeau px-3 py-1 rounded-full font-semibold">Promo ${alumni.promo}</span>
      </div>
      <div class="p-4 text-center">
        ${alumni.poste ? `<div class="font-bold text-rouge text-base mb-1">${alumni.poste}</div>` : ""}
        ${entrepriseInfo ? `<div class="text-gray-600 text-sm mb-3">${entrepriseInfo}</div>` : ""}
        ${alumni.ville ? `<div class="text-gray-500 text-sm border-t border-gray-200 pt-3 mt-2">📍 Basé(e) à ${alumni.ville}</div>` : ""}
        ${linkedinButton ? `<div class="mt-3 pt-3 border-t border-gray-200 flex justify-center">${linkedinButton}</div>` : ""}
      </div>
    `;
  };

  useEffect(() => {
    let isMounted = true;

    const initMap = async () => {
      // Initialise la carte
      const map = L.map("alumni-map", { scrollWheelZoom: true }).setView([46.603354, 1.888334], 6);
      mapRef.current = map;

      L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
        attribution:
          "&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors &copy; <a href=\"https://carto.com/attributions\">CARTO</a>",
        subdomains: "abcd",
        maxZoom: 20,
      }).addTo(map);

      // Cluster config
      const markers = L.markerClusterGroup({
        showCoverageOnHover: false,
        maxClusterRadius: 60,
        spiderfyOnMaxZoom: true,
        iconCreateFunction: (cluster) => buildClusterIcon(cluster.getChildCount()),
      });

      clusterRef.current = markers;

      const markerOptions: L.CircleMarkerOptions = {
        radius: 6,
        fillColor: "#DE1251",
        color: "#fff",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8,
      };

      try {
        setLoading(true);
        setError("");
        const response = await fetch(`${API_BASE}/alumnis/?limit=10000`);
        if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);

        const alumnis: Alumni[] = await response.json();
        if (!isMounted) return;

        setAlumnis(alumnis);
        setAlumniCount(alumnis.length);

        // Gestion des doublons de localisation
        const buildLocationKey = (a: Alumni) => `${Number(a.latitude).toFixed(4)}|${Number(a.longitude).toFixed(4)}`;
        const locationCounts = new Map<string, number>();
        alumnis.forEach((a) => {
          if (!a.latitude || !a.longitude) return;
          const key = buildLocationKey(a);
          locationCounts.set(key, (locationCounts.get(key) || 0) + 1);
        });
        const locationProgress = new Map<string, number>();

        alumnis.forEach((alumni) => {
          if (!alumni.latitude || !alumni.longitude) return;

          const key = buildLocationKey(alumni);
          const totalAtLocation = locationCounts.get(key) || 1;
          const currentIndex = locationProgress.get(key) || 0;
          const [jitterLat, jitterLng] = jitterCoordinates(alumni.latitude, alumni.longitude, currentIndex, totalAtLocation);
          locationProgress.set(key, currentIndex + 1);

          const circle = L.circleMarker([jitterLat, jitterLng], markerOptions);
          const popupContent = buildPopupContent(alumni);
          circle.bindPopup(popupContent);

          circle.on("mouseover", function (this: L.CircleMarker) {
            this.setStyle({ radius: 9, fillOpacity: 1, color: "#355F9B" });
          });
          circle.on("mouseout", function (this: L.CircleMarker) {
            this.setStyle(markerOptions);
          });

          const alumniKey = buildAlumniKey(alumni);
          markerIndexRef.current.set(alumniKey, circle);
          markers.addLayer(circle);
        });

        map.addLayer(markers);
        L.control.scale({ imperial: false }).addTo(map);
        setTimeout(() => map.invalidateSize(), 200);
      } catch (err) {
        console.error("Erreur lors du chargement des alumnis", err);
        if (!isMounted) return;
        setError("Impossible de charger les données. Vérifiez que le backend est démarré.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    initMap();

    return () => {
      isMounted = false;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
      clusterRef.current = null;
    };
  }, []);

  // Redimensionne la carte quand on revient sur l'onglet "map"
  useEffect(() => {
    if (activeTab === "map" && mapRef.current) {
      setTimeout(() => {
        mapRef.current?.invalidateSize();
      }, 100);
    }
  }, [activeTab]);

  // Recherche par nom/prénom avec suggestions
  useEffect(() => {
    const term = searchTerm.trim().toLowerCase();
    if (term.length < 2) {
      setSearchResults([]);
      return;
    }
    const results = alumnis.filter((a) => {
      const full = `${a.prenom} ${a.nom}`.toLowerCase();
      return full.includes(term);
    });
    setSearchResults(results.slice(0, 8));
  }, [searchTerm, alumnis]);

  const handleSelectAlumni = (alumni: Alumni) => {
    setSearchTerm(`${alumni.prenom} ${alumni.nom}`);
    setSearchResults([]);
    if (mapRef.current) {
      const marker = markerIndexRef.current.get(buildAlumniKey(alumni));
      if (marker) {
        clusterRef.current?.zoomToShowLayer(marker, () => {
          mapRef.current?.flyTo(marker.getLatLng(), 12);
          marker.openPopup();
        });
      } else if (alumni.latitude && alumni.longitude) {
        mapRef.current.flyTo([alumni.latitude, alumni.longitude], 12);
      }
    }
  };

  return (
    <div className="py-12 px-[5%] max-w-[1400px] mx-auto w-full">
      {/* Modal d'enregistrement */}
      {showRegistrationForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9998] p-4">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-lg w-full">
            <h3 className="font-title text-2xl text-bleu-fonce mb-6">M'enregistrer dans l'annuaire</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="md:col-span-1">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Prénom</label>
                <input
                  type="text"
                  value={registrationForm.prenom}
                  onChange={(e) => setRegistrationForm({ ...registrationForm, prenom: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bleu-fonce"
                  placeholder="Votre prénom"
                />
              </div>
              <div className="md:col-span-1">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Nom</label>
                <input
                  type="text"
                  value={registrationForm.nom}
                  onChange={(e) => setRegistrationForm({ ...registrationForm, nom: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bleu-fonce"
                  placeholder="Votre nom"
                />
              </div>
              <div className="md:col-span-1">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={registrationForm.email}
                  onChange={(e) => setRegistrationForm({ ...registrationForm, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bleu-fonce"
                  placeholder="votre.email@example.com"
                />
              </div>
              <div className="md:col-span-1">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Promo</label>
                <input
                  type="text"
                  value={registrationForm.promo}
                  onChange={(e) => setRegistrationForm({ ...registrationForm, promo: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bleu-fonce"
                  placeholder="2026"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">URL LinkedIn</label>
                <input
                  type="url"
                  value={registrationForm.linkedin}
                  onChange={(e) => setRegistrationForm({ ...registrationForm, linkedin: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bleu-fonce"
                  placeholder="https://linkedin.com/in/..."
                />
              </div>
              <div className="md:col-span-1">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Ville</label>
                <input
                  type="text"
                  value={registrationForm.ville}
                  onChange={(e) => setRegistrationForm({ ...registrationForm, ville: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bleu-fonce"
                  placeholder="Paris"
                />
              </div>
              <div className="md:col-span-1">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Poste occupé</label>
                <input
                  type="text"
                  value={registrationForm.poste}
                  onChange={(e) => setRegistrationForm({ ...registrationForm, poste: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bleu-fonce"
                  placeholder="Product Manager"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Entreprise</label>
                <input
                  type="text"
                  value={registrationForm.entreprise}
                  onChange={(e) => setRegistrationForm({ ...registrationForm, entreprise: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bleu-fonce"
                  placeholder="Nom de l'entreprise"
                />
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowRegistrationForm(false);
                  setRegistrationForm({ prenom: "", nom: "", email: "", promo: "", linkedin: "", ville: "", poste: "", entreprise: "" });
                }}
                className="flex-1 px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg font-semibold transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={() => {
                  // TODO: Backend call here
                  console.log("Soumission formulaire enregistrement:", registrationForm);
                  setShowRegistrationForm(false);
                  setRegistrationForm({ prenom: "", nom: "", email: "", promo: "", linkedin: "", ville: "", poste: "", entreprise: "" });
                }}
                className="flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-colors"
              >
                Envoyer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de formulaire de retrait */}
      {showRemovalForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9998] p-4">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full">
            <h3 className="font-title text-2xl text-bleu-fonce mb-6">Me retirer de la base de données</h3>
            
            <div className="space-y-4 mb-6">
              {/* Prénom */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Prénom</label>
                <input
                  type="text"
                  value={removalForm.prenom}
                  onChange={(e) => setRemovalForm({ ...removalForm, prenom: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bleu-fonce"
                  placeholder="Votre prénom"
                />
              </div>

              {/* Nom */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Nom</label>
                <input
                  type="text"
                  value={removalForm.nom}
                  onChange={(e) => setRemovalForm({ ...removalForm, nom: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bleu-fonce"
                  placeholder="Votre nom"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={removalForm.email}
                  onChange={(e) => setRemovalForm({ ...removalForm, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bleu-fonce"
                  placeholder="votre.email@example.com"
                />
              </div>

              {/* LinkedIn URL */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">URL LinkedIn (optionnel)</label>
                <input
                  type="url"
                  value={removalForm.linkedin}
                  onChange={(e) => setRemovalForm({ ...removalForm, linkedin: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bleu-fonce"
                  placeholder="https://linkedin.com/in/..."
                />
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowRemovalForm(false);
                  setRemovalForm({ prenom: "", nom: "", email: "", linkedin: "" });
                }}
                className="flex-1 px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg font-semibold transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={() => {
                  // TODO: Backend call here
                  console.log("Soumission formulaire retrait:", removalForm);
                  setShowRemovalForm(false);
                  setRemovalForm({ prenom: "", nom: "", email: "", linkedin: "" });
                }}
                className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition-colors"
              >
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header avec titre */}
      <div className="flex items-center justify-center mb-8 text-center">
        <div>
          <h1 className="font-title text-[3rem] text-bleu-fonce tracking-[2px] leading-none mb-2">
            NOTRE RÉSEAU ALUMNI
          </h1>
          <h2 className="text-bordeau text-xl font-light">Retrouvez vos anciens camarades partout dans le monde</h2>
        </div>
      </div>

      {/* Système d'onglets */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => setActiveTab("map")}
          className={`px-8 py-3 rounded-lg font-semibold text-lg transition-all ${
            activeTab === "map"
              ? "bg-bleu-fonce text-white shadow-lg"
              : "bg-white text-bleu-fonce border-2 border-bleu-fonce hover:bg-bleu-fonce hover:text-white"
          }`}
        >
          🗺️ Carte Interactive
        </button>
        <button
          onClick={() => setActiveTab("dashboard")}
          className={`px-8 py-3 rounded-lg font-semibold text-lg transition-all ${
            activeTab === "dashboard"
              ? "bg-bordeau text-white shadow-lg"
              : "bg-white text-bordeau border-2 border-bordeau hover:bg-bordeau hover:text-white"
          }`}
        >
          📊 Dashboard
        </button>
      </div>
      <div className={activeTab === "map" ? "block" : "hidden"}>
        <div className="relative w-full h-[50vh] md:h-[70vh] min-h-[350px] md:min-h-[550px] rounded-2xl overflow-hidden shadow-2xl border-2 border-bleu-clair">
          <div id="alumni-map" className="w-full h-full" />

          {/* Barre de recherche */}
          <div className="absolute top-4 left-16 md:left-20 z-[500] bg-white/95 px-4 py-3 rounded-lg shadow-lg backdrop-blur min-w-[260px]">
            <label className="block text-xs font-semibold text-gray-600 mb-2">Rechercher un alumni</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-bleu-fonce text-sm"
              placeholder="Nom Prénom"
            />
            {searchResults.length > 0 && (
              <div className="mt-2 max-h-48 overflow-y-auto border border-gray-200 rounded-md divide-y divide-gray-100 bg-white shadow-sm">
                {searchResults.map((alumni, idx) => (
                  <button
                    key={`${alumni.nom}-${alumni.prenom}-${idx}`}
                    onClick={() => handleSelectAlumni(alumni)}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-bleu-clair/20 focus:bg-bleu-clair/30"
                  >
                    <span className="font-semibold text-bleu-fonce">{alumni.prenom} {alumni.nom}</span>
                    {alumni.promo && <span className="text-gray-500 text-xs ml-1">· Promo {alumni.promo}</span>}
                    {alumni.ville && <div className="text-xs text-gray-500">📍 {alumni.ville}</div>}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="absolute top-4 right-4 z-[500] bg-white/90 px-5 py-4 rounded-lg shadow-lg text-left backdrop-blur">
            <span className="block font-title text-[2.5rem] leading-none text-rouge" id="count-display">
              {loading ? "…" : alumniCount}
            </span>
            <span className="text-[0.8rem] font-bold uppercase text-bleu-fonce flex items-center gap-1">
              <span aria-hidden="true">👥</span> Alumnis
            </span>
            {error && <p className="text-sm text-red-600 mt-2 max-w-[220px]">{error}</p>}
          </div>
        </div>

        {/* Boutons d'action sous la carte */}
        <div className="flex flex-wrap justify-center gap-3 mt-6 mb-8">
          <button
            onClick={() => setShowRegistrationForm(true)}
            className="bg-green-500 hover:bg-green-600 text-white px-5 py-2.5 rounded-lg font-semibold transition-colors"
          >
            M'enregistrer
          </button>
          <button
            onClick={() => setShowRemovalForm(true)}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 rounded-lg font-semibold transition-colors"
          >
            Me retirer
          </button>
        </div>
      </div>

      <div className={activeTab === "dashboard" ? "block" : "hidden"}>
        <Dashboard alumnis={alumnis} />
      </div>
    </div>
  );
}
