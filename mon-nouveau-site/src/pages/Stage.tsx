import { useEffect, useMemo, useState } from "react";
import Pagination from "../components/Pagination";

const API_BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

type Stage = {
  id: number;
  stage_id_externe: string;
  titre: string;
  ville: string;
  pays: string;
  type: string;
  entreprise: string;
  date_publication: string;
  texte: string;
  url: string;
  date_creation?: string;
};

type Alumni = {
  id: number;
  nom: string;
  prenom: string;
  ville?: string;
  poste?: string;
  entreprise?: string;
  promo?: string;
  linkedin?: string;
};

export default function StagePage() {
  const [stages, setStages] = useState<Stage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [total, setTotal] = useState(0);
  const [optionsData, setOptionsData] = useState<Stage[]>([]);

  const [searchTitle, setSearchTitle] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [enterpriseFilter, setEnterpriseFilter] = useState("");
  const [useCustomCity, setUseCustomCity] = useState(false);
  const [useCustomCountry, setUseCustomCountry] = useState(false);
  const [useCustomEnterprise, setUseCustomEnterprise] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);

  const [selectedStageAlumnis, setSelectedStageAlumnis] = useState<{
    stage: Stage;
    alumnis: Alumni[];
  } | null>(null);
  const [loadingAlumnis, setLoadingAlumnis] = useState(false);

  const [selectedStageDetails, setSelectedStageDetails] = useState<Stage | null>(
    null
  );

  const [formData, setFormData] = useState({
    titre: "",
    ville: "",
    pays: "",
    type: "Stage",
    entreprise: "",
    date_publication: "",
    texte: "",
    url: "",
  });

  const formatCity = (city?: string) => {
    if (!city) return "";
    return city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
  };

  const fetchStages = async () => {
    try {
      setLoading(true);
      setError("");
      const params = new URLSearchParams();
      if (searchTitle.trim()) params.set("q", searchTitle.trim());
      if (cityFilter) params.set("city", cityFilter);
      if (enterpriseFilter) params.set("enterprise", enterpriseFilter);
      if (typeFilter) params.set("type", typeFilter);
      params.set("skip", String((page - 1) * pageSize));
      params.set("limit", String(pageSize));
      const res = await fetch(`${API_BASE}/stages/search?${params.toString()}`);
      if (!res.ok) throw new Error(`Erreur ${res.status}`);
      const data = await res.json();
      setStages(data.items || []);
      setTotal(data.total || 0);
    } catch (err) {
      console.error("Erreur lors du chargement des stages", err);
      setError(
        "Impossible de charger les offres. Vérifie que le backend est démarré."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStages();
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/stages/?limit=2000`);
        if (res.ok) {
          const data: Stage[] = await res.json();
          setOptionsData(data);
        }
      } catch (e) {}
    })();
  }, []);

  useEffect(() => {
    fetchStages();
  }, [page, pageSize, searchTitle, cityFilter, typeFilter, enterpriseFilter]);

  useEffect(() => {
    setPage(1);
  }, [searchTitle, cityFilter, typeFilter, enterpriseFilter]);

  const cityOptions = useMemo(() => {
    const set = new Set<string>();
    optionsData.forEach((s) => {
      if (s.ville) set.add(s.ville);
    });
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [optionsData]);

  const enterpriseOptions = useMemo(() => {
    const set = new Set<string>();
    optionsData.forEach((s) => {
      if (s.entreprise) set.add(s.entreprise);
    });
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [optionsData]);

  const countryOptions = useMemo(() => {
    const set = new Set<string>();
    optionsData.forEach((s) => {
      if (s.pays) set.add(s.pays);
    });
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [optionsData]);

  const resetForm = () => {
    setFormData({
      titre: "",
      ville: "",
      pays: "",
      type: "Stage",
      entreprise: "",
      date_publication: "",
      texte: "",
      url: "",
    });
    setUseCustomCity(false);
    setUseCustomCountry(false);
    setUseCustomEnterprise(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const payload = {
        ...formData,
        stage_id_externe: `manual-${Date.now()}`,
        date_publication: formData.date_publication
          ? new Date(formData.date_publication).toISOString()
          : new Date().toISOString(),
      };

      const res = await fetch(`${API_BASE}/stages/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`Erreur ${res.status}`);
      }

      await fetchStages();
      resetForm();
      setShowForm(false);
    } catch (err) {
      console.error("Erreur lors de la création du stage", err);
      setError("Impossible d'enregistrer cette offre. Vérifie les champs.");
    } finally {
      setSubmitting(false);
    }
  };

  const fetchRelatedAlumnis = async (stage: Stage) => {
    if (!stage) return; // Sécurité supplémentaire
    setLoadingAlumnis(true);
    try {
      const res = await fetch(`${API_BASE}/stages/${stage.id}/related-alumnis`);
      if (res.ok) {
        const alumnis: Alumni[] = await res.json();
        setSelectedStageAlumnis({ stage, alumnis });
      } else {
        console.error("Erreur chargement alumnis");
      }
    } catch (err) {
      console.error("Erreur chargement alumnis", err);
    } finally {
      setLoadingAlumnis(false);
    }
  };

  return (
    <div className="py-12 px-[5%] max-w-[1600px] mx-auto w-full">
      <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
        <div>
          <p className="font-text-sm font-semibold text-rouge uppercase tracking-wide mb-1">
            Opportunités
          </p>
          <h1 className="font-title font-bold text-3xl text-bleu-fonce">
            Stages & Alternances
          </h1>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <div className="text-right text-sm text-gray-600">
            <span className="font-semibold text-bleu-fonce">{total}</span>{" "}
            résultat(s)
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-bleu-fonce text-white rounded-lg text-sm font-semibold shadow-sm hover:bg-rouge transition-colors"
          >
            Poster une offre
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Sidebar */}
        <aside className="w-full lg:w-80 flex-shrink-0 bg-white rounded-xl shadow-md border border-gray-100 p-4 md:p-6 flex flex-col gap-4 sticky top-24">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">Titre</label>
            <input
              type="text"
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}
              placeholder="Rechercher par titre"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bleu-fonce"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">Ville</label>
            <select
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-bleu-fonce"
            >
              <option value="">Toutes</option>
              {cityOptions.map((city) => (
                <option key={city} value={city}>
                  {formatCity(city)}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">
              Entreprise
            </label>
            <select
              value={enterpriseFilter}
              onChange={(e) => setEnterpriseFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-bleu-fonce"
            >
              <option value="">Toutes</option>
              {enterpriseOptions.map((enterprise) => (
                <option key={enterprise} value={enterprise}>
                  {enterprise}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">Type</label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-bleu-fonce"
            >
              <option value="">Tous</option>
              <option value="Stage">Stage</option>
              <option value="Alternance">Alternance</option>
            </select>
          </div>
        </aside>

        {/* Liste des stages */}
        <div className="flex-1 w-full flex flex-col gap-5 min-w-0">
          {loading && (
            <div className="text-center text-gray-500">
              Chargement des offres…
            </div>
          )}

          {!loading && error && (
            <div className="text-center text-red-600 font-semibold">
              {error}
            </div>
          )}

          {!loading && !error && stages.length === 0 && (
            <div className="text-center text-gray-500">
              Aucune offre ne correspond à ces filtres.
            </div>
          )}

          <div className="flex flex-col gap-4">
            {!loading &&
              !error &&
              stages.map((stage) => {
                const date = stage.date_publication
                  ? new Date(stage.date_publication)
                  : null;
                return (
                  <article
                    key={stage.id}
                    className="bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-lg transition-all p-5 md:p-6 flex flex-col md:flex-row md:items-center gap-4 md:gap-6"
                  >
                    <div className="flex-shrink-0">
                      <span
                        className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                          stage.type === "Alternance"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {stage.type}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0 w-full">
                      <h3 className="font-h3 text-xl font-bold text-bleu-fonce leading-tight truncate mb-2">
                        {stage.titre}
                      </h3>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600">
                        <span className="font-bold text-gray-800 flex items-center gap-1">
                          🏢 {stage.entreprise}
                        </span>
                        <span className="flex items-center gap-1">
                          📍 {formatCity(stage.ville)}
                          {stage.pays ? `, ${stage.pays}` : ""}
                        </span>
                        {date && (
                          <span className="flex items-center gap-1 text-gray-400">
                            🗓️ {date.toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 w-full md:w-auto mt-2 md:mt-0 justify-start md:justify-end">
                      <button
                        onClick={() => setSelectedStageDetails(stage)}
                        className="px-4 py-2 bg-bleu-clair/10 text-bleu-fonce border border-bleu-clair/20 rounded-lg text-sm font-semibold hover:bg-bleu-clair hover:text-white transition-colors"
                      >
                        Voir plus
                      </button>

                      {stage.entreprise && (
                        <button
                          onClick={() => fetchRelatedAlumnis(stage)}
                          disabled={loadingAlumnis}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-bleu-fonce text-white rounded-lg text-sm font-semibold hover:bg-bleu-fonce/90 transition-colors disabled:opacity-50"
                        >
                          👥 Alumnis
                        </button>
                      )}

                      <a
                        href={stage.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-rouge text-white rounded-lg text-sm font-semibold shadow-sm hover:bg-bordeau transition-colors"
                      >
                        Postuler
                        <span aria-hidden>↗</span>
                      </a>
                    </div>
                  </article>
                );
              })}
          </div>

          <Pagination
            total={total}
            page={page}
            pageSize={pageSize}
            onPageChange={setPage}
            onPageSizeChange={(s) => {
              setPageSize(s);
              setPage(1);
            }}
            pageSizeOptions={[6, 12, 24, 48]}
            className=""
          />
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-6 relative max-h-[90vh] overflow-y-auto">
            <h2 className="font-title text-2xl text-bleu-fonce mb-4">
              Poster une offre
            </h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Titre
                  </label>
                  <input
                    type="text"
                    value={formData.titre}
                    onChange={(e) =>
                      setFormData({ ...formData, titre: e.target.value })
                    }
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bleu-fonce"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Entreprise
                  </label>
                  <select
                    value={
                      useCustomEnterprise ? "__custom__" : formData.entreprise
                    }
                    onChange={(e) => {
                      if (e.target.value === "__custom__") {
                        setUseCustomEnterprise(true);
                        setFormData({ ...formData, entreprise: "" });
                      } else {
                        setUseCustomEnterprise(false);
                        setFormData({
                          ...formData,
                          entreprise: e.target.value,
                        });
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-bleu-fonce"
                  >
                    <option value="">Choisir...</option>
                    {enterpriseOptions.map((enterprise) => (
                      <option key={enterprise} value={enterprise}>
                        {enterprise}
                      </option>
                    ))}
                    <option value="__custom__">Autre (saisir)</option>
                  </select>
                  {useCustomEnterprise && (
                    <input
                      type="text"
                      value={formData.entreprise}
                      onChange={(e) =>
                        setFormData({ ...formData, entreprise: e.target.value })
                      }
                      placeholder="Entreprise"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bleu-fonce"
                    />
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Ville
                  </label>
                  <select
                    value={useCustomCity ? "__custom__" : formData.ville}
                    onChange={(e) => {
                      if (e.target.value === "__custom__") {
                        setUseCustomCity(true);
                        setFormData({ ...formData, ville: "" });
                      } else {
                        setUseCustomCity(false);
                        setFormData({ ...formData, ville: e.target.value });
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-bleu-fonce"
                  >
                    <option value="">Choisir...</option>
                    {cityOptions.map((city) => (
                      <option key={city} value={city}>
                        {formatCity(city)}
                      </option>
                    ))}
                    <option value="__custom__">Autre (saisir)</option>
                  </select>
                  {useCustomCity && (
                    <input
                      type="text"
                      value={formData.ville}
                      onChange={(e) =>
                        setFormData({ ...formData, ville: e.target.value })
                      }
                      placeholder="Ville"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bleu-fonce"
                    />
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Pays
                  </label>
                  <select
                    value={useCustomCountry ? "__custom__" : formData.pays}
                    onChange={(e) => {
                      if (e.target.value === "__custom__") {
                        setUseCustomCountry(true);
                        setFormData({ ...formData, pays: "" });
                      } else {
                        setUseCustomCountry(false);
                        setFormData({ ...formData, pays: e.target.value });
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-bleu-fonce"
                  >
                    <option value="">Choisir...</option>
                    {countryOptions.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                    <option value="__custom__">Autre (saisir)</option>
                  </select>
                  {useCustomCountry && (
                    <input
                      type="text"
                      value={formData.pays}
                      onChange={(e) =>
                        setFormData({ ...formData, pays: e.target.value })
                      }
                      placeholder="Pays"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bleu-fonce"
                    />
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-bleu-fonce"
                  >
                    <option value="Stage">Stage</option>
                    <option value="Alternance">Alternance</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Date de publication
                  </label>
                  <input
                    type="date"
                    value={formData.date_publication}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        date_publication: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bleu-fonce"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700">
                  Lien vers l'offre
                </label>
                <input
                  type="url"
                  value={formData.url}
                  onChange={(e) =>
                    setFormData({ ...formData, url: e.target.value })
                  }
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bleu-fonce"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700">
                  Description
                </label>
                <textarea
                  value={formData.texte}
                  onChange={(e) =>
                    setFormData({ ...formData, texte: e.target.value })
                  }
                  rows={4}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bleu-fonce"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    resetForm();
                  }}
                  className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 rounded-lg bg-bleu-fonce text-white font-semibold hover:bg-rouge transition-colors disabled:opacity-60"
                >
                  {submitting ? "Envoi..." : "Publier"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {selectedStageAlumnis && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[85vh] overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-title font-bold text-bleu-fonce">
                    {/* CORRECTION ICI : Ajout de ?. pour éviter le crash si stage est undefined */}
                    Alumnis chez {selectedStageAlumnis.stage?.entreprise}
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    {selectedStageAlumnis.alumnis.length} alumni(s) à contacter
                    pour cette entreprise
                  </p>
                </div>
                <button
                  onClick={() => setSelectedStageAlumnis(null)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Fermer"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {selectedStageAlumnis.alumnis.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <p className="text-lg font-semibold mb-2">
                    Aucun alumni trouvé
                  </p>
                  <p className="text-sm">
                    Aucun alumni n'est actuellement répertorié pour cette
                    entreprise.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {selectedStageAlumnis.alumnis.map((alumni) => (
                    <div
                      key={alumni.id}
                      className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-baseline gap-2">
                            <p className="font-bold text-lg text-bleu-fonce">
                              {alumni.prenom} {alumni.nom}
                            </p>
                            {alumni.promo && (
                              <span className="text-xs px-2 py-0.5 bg-bleu-fonce/10 text-bleu-fonce rounded-full">
                                Promo {alumni.promo}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-700 mt-1">
                            {alumni.poste || "Poste non renseigné"}
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {alumni.entreprise}
                            {alumni.ville && ` • ${alumni.ville}`}
                          </p>
                        </div>
                        {alumni.linkedin && (
                          <a
                            href={alumni.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 bg-[#0A66C2] text-white rounded-lg text-sm font-semibold hover:bg-[#004182] transition-colors"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                            Contacter
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => setSelectedStageAlumnis(null)}
                className="w-full px-4 py-2 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedStageDetails && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-bleu-fonce to-bleu-clair text-white">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        selectedStageDetails.type === "Alternance"
                          ? "bg-purple-500 text-white"
                          : "bg-green-500 text-white"
                      }`}
                    >
                      {selectedStageDetails.type}
                    </span>
                    <h2 className="text-2xl font-title font-bold">
                      {selectedStageDetails.titre}
                    </h2>
                  </div>
                  <div className="flex items-center gap-4 text-sm opacity-90">
                    <span className="font-semibold">
                      🏢 {selectedStageDetails.entreprise}
                    </span>
                    <span>
                      📍 {formatCity(selectedStageDetails.ville)}
                      {selectedStageDetails.pays
                        ? `, ${selectedStageDetails.pays}`
                        : ""}
                    </span>
                    {selectedStageDetails.date_publication && (
                      <span>
                        🗓️ Publié le{" "}
                        {new Date(
                          selectedStageDetails.date_publication
                        ).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedStageDetails(null)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-colors flex-shrink-0"
                  aria-label="Fermer"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              <div className="prose max-w-none">
                <h3 className="text-lg font-bold text-bleu-fonce mb-3 flex items-center gap-2">
                  <span>📋</span> Description de l'offre
                </h3>
                <div className="text-gray-700 leading-relaxed whitespace-pre-wrap bg-gray-50 rounded-lg p-4 border border-gray-200">
                  {selectedStageDetails.texte ||
                    "Aucune description disponible."}
                </div>

                {selectedStageDetails.url && (
                  <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-gray-700 mb-3">
                      <strong>🔗 Lien vers l'offre complète :</strong>
                    </p>
                    <a
                      href={selectedStageDetails.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-bleu-fonce hover:text-rouge underline break-all text-sm"
                    >
                      {selectedStageDetails.url}
                    </a>
                  </div>
                )}
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-between gap-4">
              <button
                onClick={() => setSelectedStageDetails(null)}
                className="px-6 py-2 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors"
              >
                Fermer
              </button>
              <div className="flex items-center gap-3">
                {selectedStageDetails.entreprise && (
                  <button
                    onClick={() => {
                      // CORRECTION ICI : On capture l'objet stage avant de fermer la modale
                      const stageToFetch = selectedStageDetails;
                      setSelectedStageDetails(null);
                      if (stageToFetch) fetchRelatedAlumnis(stageToFetch);
                    }}
                    disabled={loadingAlumnis}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-bleu-fonce text-white rounded-lg font-semibold hover:bg-rouge transition-colors disabled:opacity-50"
                  >
                    👥 Voir les Alumnis
                  </button>
                )}
                <a
                  href={selectedStageDetails.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2 bg-rouge text-white rounded-lg font-semibold shadow-sm hover:bg-bordeau transition-colors"
                >
                  Postuler maintenant
                  <span aria-hidden>↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}