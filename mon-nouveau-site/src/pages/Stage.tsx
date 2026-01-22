import { useEffect, useMemo, useState } from "react";

const API_BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

type Stage = {
  id: number;
  stage_id_externe: string;
  titre: string;
  ville: string;
  pays: string;
  type: string; // "Stage" ou "Alternance"
  entreprise: string;
  date_publication: string;
  texte: string;
  url: string;
  date_creation?: string;
};

export default function StagePage() {
  const [stages, setStages] = useState<Stage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  const [searchTitle, setSearchTitle] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [enterpriseFilter, setEnterpriseFilter] = useState("");
  const [useCustomCity, setUseCustomCity] = useState(false);
  const [useCustomCountry, setUseCustomCountry] = useState(false);
  const [useCustomEnterprise, setUseCustomEnterprise] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
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
      const res = await fetch(`${API_BASE}/stages/?limit=500`);
      if (!res.ok) throw new Error(`Erreur ${res.status}`);
      const data: Stage[] = await res.json();
      setStages(data);
    } catch (err) {
      console.error("Erreur lors du chargement des stages", err);
      setError("Impossible de charger les offres. Vérifie que le backend est démarré.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStages();
  }, []);

  const cityOptions = useMemo(() => {
    const set = new Set<string>();
    stages.forEach((s) => {
      if (s.ville) set.add(s.ville);
    });
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [stages]);

  const enterpriseOptions = useMemo(() => {
    const set = new Set<string>();
    stages.forEach((s) => {
      if (s.entreprise) set.add(s.entreprise);
    });
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [stages]);

  const countryOptions = useMemo(() => {
    const set = new Set<string>();
    stages.forEach((s) => {
      if (s.pays) set.add(s.pays);
    });
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [stages]);

  const filteredStages = useMemo(() => {
    return stages.filter((s) => {
      const matchTitle = `${s.titre}`.toLowerCase().includes(searchTitle.trim().toLowerCase());
      const matchCity = cityFilter ? s.ville === cityFilter : true;
      const matchType = typeFilter ? s.type === typeFilter : true;
      const matchEnterprise = enterpriseFilter ? s.entreprise === enterpriseFilter : true;
      return matchTitle && matchCity && matchType && matchEnterprise;
    });
  }, [stages, searchTitle, cityFilter, typeFilter, enterpriseFilter]);

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
        date_publication: formData.date_publication ? new Date(formData.date_publication).toISOString() : new Date().toISOString(),
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
      setError("Impossible d'enregistrer cette offre. Vérifie les champs ou le backend.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="py-12 px-[5%] max-w-[1200px] mx-auto w-full">
      <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
        <div>
          <p className="text-sm font-semibold text-rouge uppercase tracking-wide mb-1">Opportunités</p>
          <h1 className="font-title text-3xl text-bleu-fonce">Stages & Alternances</h1>
          <p className="text-sm text-gray-600 mt-1">Les offres enregistrées dans la base de données.</p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <div className="text-right text-sm text-gray-600">
            <span className="font-semibold text-bleu-fonce">{filteredStages.length}</span> résultat(s)
            {filteredStages.length !== stages.length && <span className="text-gray-400"> / {stages.length} total</span>}
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-bleu-fonce text-white rounded-lg text-sm font-semibold shadow-sm hover:bg-rouge transition-colors"
          >
            Poster une offre
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 items-start">
        <aside className="bg-white rounded-xl shadow-md border border-gray-100 p-4 md:p-6 flex flex-col gap-4 md:sticky md:top-24">
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

          {showForm && (
            <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
              <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-6 relative">
                <h2 className="font-title text-2xl text-bleu-fonce mb-4">Poster une offre</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-gray-700">Titre</label>
                      <input
                        type="text"
                        value={formData.titre}
                        onChange={(e) => setFormData({ ...formData, titre: e.target.value })}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bleu-fonce"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-gray-700">Entreprise</label>
                      <select
                        value={useCustomEnterprise ? "__custom__" : formData.entreprise}
                        onChange={(e) => {
                          if (e.target.value === "__custom__") {
                            setUseCustomEnterprise(true);
                            setFormData({ ...formData, entreprise: "" });
                          } else {
                            setUseCustomEnterprise(false);
                            setFormData({ ...formData, entreprise: e.target.value });
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
                          onChange={(e) => setFormData({ ...formData, entreprise: e.target.value })}
                          placeholder="Entreprise"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bleu-fonce"
                        />
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-gray-700">Ville</label>
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
                          onChange={(e) => setFormData({ ...formData, ville: e.target.value })}
                          placeholder="Ville"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bleu-fonce"
                        />
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-gray-700">Pays</label>
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
                          onChange={(e) => setFormData({ ...formData, pays: e.target.value })}
                          placeholder="Pays"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bleu-fonce"
                        />
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-gray-700">Type</label>
                      <select
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-bleu-fonce"
                      >
                        <option value="Stage">Stage</option>
                        <option value="Alternance">Alternance</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-gray-700">Date de publication</label>
                      <input
                        type="date"
                        value={formData.date_publication}
                        onChange={(e) => setFormData({ ...formData, date_publication: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bleu-fonce"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-gray-700">Lien vers l'offre</label>
                    <input
                      type="url"
                      value={formData.url}
                      onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bleu-fonce"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-gray-700">Description</label>
                    <textarea
                      value={formData.texte}
                      onChange={(e) => setFormData({ ...formData, texte: e.target.value })}
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
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">Entreprise</label>
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

        <div className="md:col-span-2 flex flex-col gap-5">
          {loading && <div className="text-center text-gray-500">Chargement des offres…</div>}

          {!loading && error && (
            <div className="text-center text-red-600 font-semibold">{error}</div>
          )}

          {!loading && !error && filteredStages.length === 0 && (
            <div className="text-center text-gray-500">Aucune offre ne correspond à ces filtres.</div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {!loading && !error && filteredStages.map((stage) => {
              const date = stage.date_publication ? new Date(stage.date_publication) : null;
              return (
                <article key={stage.id} className="bg-white border border-gray-100 rounded-xl shadow-sm p-5 flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-bold text-bleu-fonce leading-tight">{stage.titre}</h3>
                      <p className="text-sm text-gray-600 mt-1">{stage.entreprise}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        stage.type === "Alternance" ? "bg-purple-100 text-purple-700" : "bg-green-100 text-green-700"
                      }`}
                    >
                      {stage.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <span className="flex items-center gap-1">📍 {formatCity(stage.ville)}{stage.pays ? `, ${stage.pays}` : ""}</span>
                    {date && <span className="flex items-center gap-1">🗓️ {date.toLocaleDateString()}</span>}
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed line-clamp-3">{stage.texte}</p>
                  <div className="flex items-center justify-end mt-auto pt-2">
                    <a
                      href={stage.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-rouge text-white rounded-lg text-sm font-semibold shadow-sm hover:bg-bordeau transition-colors"
                    >
                      Voir l'offre
                      <span aria-hidden>↗</span>
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>

    </div>
  );
}
