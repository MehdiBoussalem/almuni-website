import { useState, useEffect } from "react";

// Backend FastAPI sans préfixe /api
const API_BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
const MAX_PLACES = 0;

export default function Soiree() {
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    statut: "",
    precisionStatut: "",
    autorisationCaptation: "",
  });

  const [placesRemaining, setPlacesRemaining] = useState<number | null>(null);
  const [isFull, setIsFull] = useState(false);
  const [isClosed, setIsClosed] = useState(MAX_PLACES === 0);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "warning" | "">("");
  const [showPrecision, setShowPrecision] = useState(false);

  useEffect(() => {
    updatePlacesCount();
  }, []);

  const updatePlacesCount = async () => {
    try {
      const response = await fetch(`${API_BASE}/inscrits-soiree/count`);
      if (!response.ok) throw new Error("Erreur réseau");

      const data = await response.json();
      const count = data.count;
      const remaining = MAX_PLACES - count;

      if (MAX_PLACES === 0) {
        setIsClosed(true);
      } else {
        setPlacesRemaining(remaining);
        setIsFull(remaining <= 0);
      }
    } catch (error) {
      console.error("Impossible de récupérer le nombre de places", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "statut") {
      setShowPrecision(value === "Autre");
      if (value !== "Autre") {
        setFormData((prev) => ({ ...prev, precisionStatut: "" }));
      }
    }
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, autorisationCaptation: e.target.value }));
  };

  const validateForm = (): boolean => {
    const { nom, prenom, email, statut, precisionStatut, autorisationCaptation } = formData;

    if (!nom || nom.length < 2) {
      setMessage("Nom invalide (minimum 2 caractères).");
      setMessageType("error");
      return false;
    }
    if (!prenom || prenom.length < 2) {
      setMessage("Prénom invalide (minimum 2 caractères).");
      setMessageType("error");
      return false;
    }
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setMessage("Adresse e-mail invalide.");
      setMessageType("error");
      return false;
    }
    if (!statut) {
      setMessage("Veuillez sélectionner votre statut.");
      setMessageType("error");
      return false;
    }
    if (statut === "Autre" && (!precisionStatut || precisionStatut.length < 2)) {
      setMessage("Veuillez préciser votre statut (minimum 2 caractères).");
      setMessageType("error");
      return false;
    }
    if (!autorisationCaptation) {
      setMessage("Veuillez indiquer votre autorisation de captation.");
      setMessageType("error");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setMessageType("");

    if (!validateForm()) return;

    try {
      // Vérification frontend : est-ce complet ?
      const countRes = await fetch(`${API_URL}/inscrits-soiree/count`);
      if (countRes.ok) {
        const countData = await countRes.json();
        if (countData.count >= MAX_PLACES && MAX_PLACES > 0) {
          setMessage("Impossible de s'inscrire : la soirée est complète.");
          setMessageType("warning");
          updatePlacesCount();
          return;
        }
      }

      const payload = {
        nom: formData.nom,
        prenom: formData.prenom,
        mail: formData.email,
        statut: formData.statut,
        precision_statut: formData.statut === "Autre" ? formData.precisionStatut : null,
        autorisation_captation: formData.autorisationCaptation,
      };

      const response = await fetch(`${API_BASE}/inscrits-soiree/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setMessage("Inscription réussie ! À bientôt.");
        setMessageType("success");
        updatePlacesCount();
        setFormData({
          nom: "",
          prenom: "",
          email: "",
          statut: "",
          precisionStatut: "",
          autorisationCaptation: "",
        });
        setShowPrecision(false);
      } else if (response.status === 400) {
        const errData = await response.json();
        if (errData.detail === "Soirée complète") {
          setMessage("Impossible de s'inscrire : la soirée est complète.");
          setMessageType("warning");
        } else if (errData.detail === "Cette adresse email est déjà inscrite") {
          setMessage("Cette adresse email est déjà inscrite !");
          setMessageType("warning");
        } else {
          setMessage(errData.detail || "Erreur lors de l'inscription");
          setMessageType("error");
        }
        updatePlacesCount();
      } else {
        const errData = await response.json();
        throw new Error(errData.detail || "Erreur lors de l'inscription");
      }
    } catch (error) {
      setMessage("Erreur : " + (error as Error).message);
      setMessageType("error");
    }
  };

  return (
    <main className="flex-1 bg-[#f4f7f6] py-8">
      <div className="max-w-6xl mx-auto px-4">
        <section className="text-center mb-8">
          <h1 className="font-title text-bleu-fonce text-4xl md:text-5xl mb-4 uppercase tracking-wide">
            La grande soirée finale — Informations & inscription
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            Retrouvez ici les détails sur la soirée et inscrivez-vous si vous souhaitez y participer.
          </p>

          {/* Lieu Info */}
          <div className="mt-6 p-6 bg-gradient-to-br from-bleu-fonce to-bordeau rounded-xl text-white text-center shadow-lg">
            <div className="flex items-center justify-center gap-2 mb-2">
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              <h3 className="font-title text-2xl uppercase tracking-wide m-0">Lieu de la soirée</h3>
            </div>
            <p className="text-xl font-semibold mt-2 mb-1">Domaine de La Baratonne</p>
            <p className="text-base opacity-90 mb-0.5">1640 Rte d'Hyères</p>
            <p className="text-base opacity-90">83130 La Garde</p>
          </div>
        </section>

        <section className="max-w-[980px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-4 items-start">
            {/* Programme Column */}
            <div className="bg-white rounded-xl p-5 shadow-lg">
              <h3 className="font-title text-bleu-fonce text-2xl text-center mb-6 uppercase tracking-wide">
                Programme de la soirée
              </h3>
              
              {/* Timeline */}
              <ul className="relative space-y-6 pl-8" aria-label="Programme de la soirée">
                {/* Timeline vertical line */}
                <div className="absolute left-[15px] top-[10px] bottom-[10px] w-0.5 bg-gradient-to-b from-bleu-clair to-bordeau"></div>
                
                {[
                  { time: "20:30", title: "Accueil", desc: "Bienvenue et photos de groupe." },
                  { time: "22:00", title: "Fermeture de l'accueil", desc: "Fin de l'accueil — personne ne peut plus rentrer après 22h." },
                  { time: "22:30", title: "Buffet", desc: "Repas, boissons et musique." },
                  { time: "01:00", title: "Fermeture", desc: "Fin de la soirée." }
                ].map((item, index) => (
                  <li key={index} className="relative flex gap-6">
                    {/* Timeline dot */}
                    <div className="absolute left-[-24px] top-[6px] w-3 h-3 bg-rouge rounded-full border-4 border-white shadow-md z-10"></div>
                    
                    <div className="flex-shrink-0 w-16 text-rouge font-bold text-lg">{item.time}</div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 text-lg mb-1">{item.title}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <p className="mt-6 text-gray-600 text-sm text-center">
                Tenue décontractée — L'accès se fait sur inscription uniquement.
              </p>
            </div>

            {/* Form Column */}
            <aside className="bg-white rounded-xl p-5 shadow-lg border border-gray-100" aria-labelledby="inscription-title">
              <h2 id="inscription-title" className="font-title text-bleu-fonce text-2xl mb-3 uppercase tracking-wide">
                Inscription à la soirée
              </h2>

              {/* Places Info */}
              <p className="font-bold mb-2 text-sm">
                {isClosed ? (
                  <span className="text-gray-500">Les inscriptions sont fermées</span>
                ) : placesRemaining !== null ? (
                  isFull ? (
                    <span className="text-gray-500">Complet ! (0 places restantes)</span>
                  ) : (
                    <span className="text-rouge">{placesRemaining} places restantes sur {MAX_PLACES}</span>
                  )
                ) : (
                  <span className="text-gray-500">Chargement des places...</span>
                )}
              </p>

              {isClosed ? (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h3 className="font-semibold text-lg mb-2">Inscriptions fermées</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    Nous sommes désolés, les inscriptions pour cette soirée sont actuellement fermées.
                  </p>
                  <p className="text-sm text-gray-600 mb-3">Pour toute question, veuillez nous contacter :</p>
                  <a 
                    href="mailto:ingemedia.alumni@gmail.com"
                    className="text-bleu-fonce hover:underline font-medium text-sm"
                  >
                    📧 ingemedia.alumni@gmail.com
                  </a>
                </div>
              ) : (
                <>
                  <p className="text-gray-600 text-sm mb-4 leading-snug">
                    Inscrivez-vous pour garantir votre place — champs obligatoires.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div>
                      <label htmlFor="nom" className="block font-semibold text-gray-800 text-sm mb-1">
                        Nom
                      </label>
                      <input
                        id="nom"
                        name="nom"
                        type="text"
                        placeholder="Dupont"
                        value={formData.nom}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-bleu-fonce/10 focus:border-bleu-fonce transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="prenom" className="block font-semibold text-gray-800 text-sm mb-1">
                        Prénom
                      </label>
                      <input
                        id="prenom"
                        name="prenom"
                        type="text"
                        placeholder="Marie"
                        value={formData.prenom}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-bleu-fonce/10 focus:border-bleu-fonce transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block font-semibold text-gray-800 text-sm mb-1">
                        E-mail
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="marie.dupont@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-bleu-fonce/10 focus:border-bleu-fonce transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="statut" className="block font-semibold text-gray-800 text-sm mb-1">
                        Votre Statut
                      </label>
                      <select
                        id="statut"
                        name="statut"
                        value={formData.statut}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-bleu-fonce/10 focus:border-bleu-fonce transition-all"
                      >
                        <option value="">-- Sélectionnez votre statut --</option>
                        <option value="Étudiant(e) de l'UFR Ingémedia">Étudiant(e) de l'UFR Ingémedia</option>
                        <option value="Ancien étudiant(e) de l'UFR Ingémedia">Ancien étudiant(e) de l'UFR Ingémedia</option>
                        <option value="Autre">Autre</option>
                      </select>
                    </div>

                    {showPrecision && (
                      <div>
                        <label htmlFor="precisionStatut" className="block font-semibold text-gray-800 text-sm mb-1">
                          Veuillez préciser
                        </label>
                        <input
                          id="precisionStatut"
                          name="precisionStatut"
                          type="text"
                          placeholder="Ex: Professionnel, Parent..."
                          value={formData.precisionStatut}
                          onChange={handleChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-bleu-fonce/10 focus:border-bleu-fonce transition-all"
                        />
                      </div>
                    )}

                    <div>
                      <label className="block font-semibold text-gray-800 text-sm mb-2">
                        Autorisation de captation de vidéos & photos
                      </label>
                      <div className="flex gap-4 mb-3">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="autorisationCaptation"
                            value="Oui"
                            checked={formData.autorisationCaptation === "Oui"}
                            onChange={handleRadioChange}
                            required
                            className="w-4 h-4 text-bleu-fonce focus:ring-bleu-fonce"
                          />
                          <span className="text-sm">Oui</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="autorisationCaptation"
                            value="Non"
                            checked={formData.autorisationCaptation === "Non"}
                            onChange={handleRadioChange}
                            required
                            className="w-4 h-4 text-bleu-fonce focus:ring-bleu-fonce"
                          />
                          <span className="text-sm">Non</span>
                        </label>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isFull}
                      className="w-full bg-bleu-fonce text-white font-bold py-2.5 px-4 rounded-full hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                    >
                      S'inscrire
                    </button>
                  </form>

                  {message && (
                    <div
                      role="status"
                      aria-live="polite"
                      className={`mt-4 p-3 rounded-lg text-sm font-semibold ${
                        messageType === "success"
                          ? "bg-green-100 text-green-800"
                          : messageType === "error"
                          ? "bg-red-100 text-red-800"
                          : messageType === "warning"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {message}
                    </div>
                  )}
                </>
              )}
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}
