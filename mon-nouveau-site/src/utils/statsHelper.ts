/**
 * Utilitaires pour le calcul des statistiques du Dashboard
 * Cette couche métier est séparée du composant React pour garder le code propre
 */

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

interface EntrepriseStats {
  nom: string;
  count: number;
  percentage: string;
}

interface MetierStats {
  nom: string;
  count: number;
  size: number;
}

interface VilleStats {
  nom: string;
  count: number;
  percentage: string;
}

interface FranceAbroadStats {
  france: number;
  abroad: number;
  percentageFrance: string;
  percentageAbroad: string;
}

interface DashboardStats {
  total: number;
  villesUniques: number;
  paysUniques: number;
  topEntreprises: EntrepriseStats[];
  wordCloud: MetierStats[];
  topVilles: VilleStats[];
  franceAbroad: FranceAbroadStats;
}

// Mots vides à filtrer de la Word Cloud
const STOPWORDS = new Set([
  "le", "la", "les", "de", "d", "du", "des", "et", "ou", "un", "une",
  "ce", "cette", "ces", "mon", "ma", "mes", "ton", "ta", "tes", "son", "sa", "ses",
  "l", "a", "au", "en", "à", "par", "pour", "sur", "avec", "sans", "sous",
  "senior", "junior", "consultant", "manager", "head", "chief", "vice", "assistant",
  "engineer", "developer", "analyst", "officer", "coordinator", "specialist"
]);

/**
 * Détecte le pays selon les coordonnées GPS
 */
export function detectCountryFromCoords(lat: number, lng: number): string | null {
  // France
  if (lat >= 41 && lat <= 51 && lng >= -5 && lng <= 10) return "France";
  // Canada
  if (lat >= 41 && lat <= 83 && lng >= -141 && lng <= -52) return "Canada";
  // USA
  if (lat >= 25 && lat <= 49 && lng >= -125 && lng <= -66) return "USA";
  // Royaume-Uni
  if (lat >= 50 && lat <= 59 && lng >= -8 && lng <= 2) return "Royaume-Uni";
  // Allemagne
  if (lat >= 47 && lat <= 56 && lng >= 6 && lng <= 16) return "Allemagne";
  // Pays-Bas
  if (lat >= 50.75 && lat <= 53.5 && lng >= 3.4 && lng <= 7.2) return "Pays-Bas";
  // Belgique
  if (lat >= 49.5 && lat <= 51.5 && lng >= 2.4 && lng <= 6.4) return "Belgique";
  // Espagne
  if (lat >= 36 && lat <= 43.8 && lng >= -9.3 && lng <= 3) return "Espagne";
  // Italie
  if (lat >= 37 && lat <= 47 && lng >= 6 && lng <= 19) return "Italie";
  // Suisse
  if (lat >= 45.8 && lat <= 47.8 && lng >= 5.9 && lng <= 10.5) return "Suisse";
  // Suède
  if (lat >= 55 && lat <= 69 && lng >= 10 && lng <= 24) return "Suède";
  // Norvège
  if (lat >= 58 && lat <= 71 && lng >= 4.7 && lng <= 31) return "Norvège";
  // Portugal
  if (lat >= 37 && lat <= 42 && lng >= -10 && lng <= -6) return "Portugal";
  // Japon
  if (lat >= 30 && lat <= 45 && lng >= 130 && lng <= 145) return "Japon";
  // Thaïlande
  if (lat >= 5.6 && lat <= 20.5 && lng >= 97.4 && lng <= 105.6) return "Thaïlande";
  // Chine
  if (lat >= 18 && lat <= 54 && lng >= 73 && lng <= 135) return "Chine";
  // Inde
  if (lat >= 8 && lat <= 37 && lng >= 68 && lng <= 97) return "Inde";
  // Singapour
  if (lat >= 1.1 && lat <= 1.5 && lng >= 103.6 && lng <= 104.1) return "Singapour";
  // Hong Kong
  if (lat >= 22.1 && lat <= 22.6 && lng >= 113.8 && lng <= 114.4) return "Hong Kong";
  // Australie
  if (lat >= -44 && lat <= -10 && lng >= 113 && lng <= 154) return "Australie";
  // Nouvelle-Zélande
  if (lat >= -47 && lat <= -34 && lng >= 166 && lng <= 179) return "Nouvelle-Zélande";
  // Brésil
  if (lat >= -33.7 && lat <= 5.2 && lng >= -73.9 && lng <= -34.8) return "Brésil";
  // Mexique
  if (lat >= 14.5 && lat <= 32.7 && lng >= -117.1 && lng <= -86.7) return "Mexique";
  // Afrique du Sud
  if (lat >= -34.8 && lat <= -22.1 && lng >= 16.5 && lng <= 32.9) return "Afrique du Sud";
  // Maroc
  if (lat >= 27.6 && lat <= 35.9 && lng >= -6 && lng <= -1) return "Maroc";
  // Tunisie
  if (lat >= 30.2 && lat <= 37.5 && lng >= 8.7 && lng <= 11.5) return "Tunisie";
  // Dubaï / Émirats Arabes Unis
  if (lat >= 22.6 && lat <= 26.2 && lng >= 51.6 && lng <= 56.4) return "Émirats Arabes Unis";
  // Israël
  if (lat >= 29.4 && lat <= 33.4 && lng >= 34.2 && lng <= 35.9) return "Israël";
  return null;
}

/**
 * Compte les pays uniques avec détection par coordonnées
 */
export function countCountries(alumnis: Alumni[]): number {
  const pays = new Set<string>();

  alumnis.forEach((alumni) => {
    // Ajouter pays s'il existe
    if (alumni.pays && alumni.pays.trim()) {
      pays.add(alumni.pays.trim());
    }
    // Sinon, détecter par coordonnées
    else if (alumni.latitude && alumni.longitude) {
      const detectedCountry = detectCountryFromCoords(alumni.latitude, alumni.longitude);
      if (detectedCountry) {
        pays.add(detectedCountry);
      }
    }
  });

  return pays.size;
}

/**
 * Compte les villes uniques
 */
export function countCities(alumnis: Alumni[]): number {
  const villes = new Set<string>();
  alumnis.forEach((alumni) => {
    if (alumni.ville) villes.add(alumni.ville.trim());
  });
  return villes.size;
}

/**
 * Calcule le top 5 des entreprises avec pourcentages
 */
export function calculateTopCompanies(alumnis: Alumni[]): EntrepriseStats[] {
  const total = alumnis.length;
  const entrepriseCount = new Map<string, number>();

  alumnis.forEach((alumni) => {
    if (alumni.entreprise && alumni.entreprise.trim()) {
      const entreprise = alumni.entreprise.trim();
      // Ignorer "Aucune" ou variations
      if (entreprise.toLowerCase() !== "aucune") {
        entrepriseCount.set(entreprise, (entrepriseCount.get(entreprise) || 0) + 1);
      }
    }
  });

  return Array.from(entrepriseCount.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([nom, count]) => ({ nom, count, percentage: ((count / total) * 100).toFixed(1) }));
}

/**
 * Normalise et regroupes les postes (métiers)
 */
function normalizeJobTitle(poste: string): string | null {
  const lower = poste.toLowerCase();

  // Vérifier si c'est un stopword
  const words = lower.split(/[\s\-_]+/);
  const hasStopwordOnly = words.every(w => STOPWORDS.has(w) || w.length < 2);
  if (hasStopwordOnly) return null; // Ignorer

  // Regrouper les variantes
  if (lower.includes("dev") || lower.includes("développ")) {
    return "Développement";
  } else if (lower.includes("design") || lower.includes("ux") || lower.includes("ui")) {
    return "Design/UX/UI";
  } else if (lower.includes("product") || lower.includes("pm")) {
    return "Product";
  } else if (lower.includes("marketing") || lower.includes("commercial")) {
    return "Marketing/Commercial";
  } else if (lower.includes("data") || lower.includes("analysis")) {
    return "Data/Analytics";
  } else if (lower.includes("manager") || lower.includes("lead")) {
    return "Management";
  } else {
    // Pour les autres postes, utiliser le texte nettoyé (sans stopwords)
    const meaningfulWords = words.filter(w => !STOPWORDS.has(w) && w.length > 1);
    if (meaningfulWords.length > 0) {
      return meaningfulWords.map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
    }
    return null;
  }
}

/**
 * Calcule le word cloud des métiers
 */
export function calculateJobWordCloud(alumnis: Alumni[]): MetierStats[] {
  const postes = new Map<string, number>();

  // Compter les postes valides
  alumnis.forEach((alumni) => {
    if (alumni.poste && alumni.poste.trim()) {
      const poste = alumni.poste.trim();
      const lower = poste.toLowerCase();
      // Ignorer "Aucun", "Aucun Poste" ou variations
      if (lower !== "aucun" && lower !== "aucun poste") {
        postes.set(poste, (postes.get(poste) || 0) + 1);
      }
    }
  });

  // Normaliser les postes
  const postesNormalises = new Map<string, number>();
  postes.forEach((count, poste) => {
    const cle = normalizeJobTitle(poste);
    if (cle) {
      postesNormalises.set(cle, (postesNormalises.get(cle) || 0) + count);
    }
  });

  // Calculer les tailles de police basées sur la fréquence
  const sorted = Array.from(postesNormalises.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12);

  const maxCount = sorted[0]?.[1] ?? 1;
  return sorted.map(([nom, count]) => ({
    nom,
    count,
    size: Math.min(32, 14 + (count / maxCount) * 20)
  }));
}

/**
 * Calcule le top 5 des villes en France
 */
export function calculateTopCities(alumnis: Alumni[]): VilleStats[] {
  const total = alumnis.length || 1;
  const villesFrance = new Map<string, number>();

  alumnis.forEach((alumni) => {
    if (alumni.ville && alumni.latitude && alumni.longitude) {
      const lat = alumni.latitude;
      const lng = alumni.longitude;
      // France métropolitaine
      if (lat >= 41 && lat <= 51 && lng >= -5 && lng <= 10) {
        villesFrance.set(alumni.ville, (villesFrance.get(alumni.ville) || 0) + 1);
      }
    }
  });

  return Array.from(villesFrance.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([nom, count]) => ({ nom, count, percentage: ((count / total) * 100).toFixed(1) }));
}

/**
 * Calcule le nombre d'alumnis en France vs à l'étranger
 */
export function calculateFranceAbroad(alumnis: Alumni[]): FranceAbroadStats {
  let france = 0;
  let abroad = 0;

  alumnis.forEach((alumni) => {
    if (alumni.latitude && alumni.longitude) {
      const lat = alumni.latitude;
      const lng = alumni.longitude;
      // France métropolitaine
      if (lat >= 41 && lat <= 51 && lng >= -5 && lng <= 10) {
        france++;
      } else {
        abroad++;
      }
    }
  });

  const total = france + abroad || 1;
  return {
    france,
    abroad,
    percentageFrance: ((france / total) * 100).toFixed(1),
    percentageAbroad: ((abroad / total) * 100).toFixed(1),
  };
}

/**
 * Calcule toutes les statistiques du Dashboard
 */
export function calculateAllStats(alumnis: Alumni[]): DashboardStats {
  const total = alumnis.length;

  return {
    total,
    villesUniques: countCities(alumnis),
    paysUniques: countCountries(alumnis),
    topEntreprises: calculateTopCompanies(alumnis),
    wordCloud: calculateJobWordCloud(alumnis),
    topVilles: calculateTopCities(alumnis),
    franceAbroad: calculateFranceAbroad(alumnis),
  };
}
