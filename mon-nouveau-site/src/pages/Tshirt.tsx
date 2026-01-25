import { useState, useEffect } from 'react';

interface Tshirt {
  id: number;
  nom: string;
  prenom: string;
  image_path: string;
}

const Tshirt = () => {
  // Constante pour afficher/cacher le formulaire d'upload
  const SHOW_UPLOAD_FORM = false;

  const [tshirts, setTshirts] = useState<Tshirt[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_URL = 'http://127.0.0.1:8000';

  // Charger les tshirts au montage du composant
  useEffect(() => {
    loadTshirts();
  }, []);

  const loadTshirts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_URL}/tshirts/`);

      if (!response.ok) {
        throw new Error('Erreur lors du chargement');
      }

      const data = await response.json();
      setTshirts(data);
    } catch (err) {
      console.error('Erreur chargement tshirts:', err);
      setError('Erreur lors du chargement de la galerie. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData();
    const fileInput = form.querySelector('input[type="file"]') as HTMLInputElement;
    const nomInput = form.querySelector('#nom') as HTMLInputElement;
    const prenomInput = form.querySelector('#prenom') as HTMLInputElement;

    const file = fileInput.files?.[0];

    if (!file) {
      alert('Veuillez sélectionner une photo');
      return;
    }

    // Vérifier la taille du fichier (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      alert('Le fichier est trop volumineux. Taille maximum : 5MB');
      return;
    }

    formData.append('file', file);
    formData.append('nom', nomInput.value.trim());
    formData.append('prenom', prenomInput.value.trim());

    try {
      setUploading(true);
      const response = await fetch(`${API_URL}/tshirts/`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('✅ Tshirt uploadé avec succès !');
        form.reset();
        await loadTshirts();

        // Scroll vers la galerie
        document.querySelector('.gallery-section')?.scrollIntoView({
          behavior: 'smooth',
        });
      } else {
        const error = await response.json();
        alert(`❌ Erreur: ${error.detail || "Erreur lors de l'upload"}`);
      }
    } catch (err) {
      console.error('Erreur upload:', err);
      alert('❌ Erreur lors de l\'upload. Veuillez réessayer.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <main className="max-w-[1200px] mx-auto py-8 px-4">
      {/* Section Upload */}
      {SHOW_UPLOAD_FORM && (
        <section className="bg-gradient-to-br from-bleu-fonce to-bordeau text-white py-12 px-8 rounded-2xl mb-12 shadow-[0_8px_24px_rgba(0,0,0,0.15)]">
          <h1 className="font-title font-bold text-[2.5rem] mb-4 text-center tracking-[2px]">
            Partagez votre Tshirt Alumni !
          </h1>
          <p className="text-center text-lg mb-8 opacity-95">
            Uploadez une photo de votre tshirt Alumni et rejoignez la galerie.
          </p>

          <form
            onSubmit={handleUpload}
            className="max-w-[600px] mx-auto bg-white/10 p-8 rounded-xl backdrop-blur-[10px]"
          >
            <div className="mb-6">
              <label htmlFor="nom" className="block mb-2 font-semibold text-[0.95rem]">
                Nom *
              </label>
              <input
                type="text"
                id="nom"
                name="nom"
                placeholder="Votre nom"
                required
                className="w-full py-3 px-3 border-2 border-white/30 rounded-lg bg-white/90 text-[#333] text-base transition-all focus:outline-none focus:border-white focus:bg-white focus:shadow-[0_0_0_3px_rgba(255,255,255,0.2)]"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="prenom" className="block mb-2 font-semibold text-[0.95rem]">
                Prénom *
              </label>
              <input
                type="text"
                id="prenom"
                name="prenom"
                placeholder="Votre prénom"
                required
                className="w-full py-3 px-3 border-2 border-white/30 rounded-lg bg-white/90 text-[#333] text-base transition-all focus:outline-none focus:border-white focus:bg-white focus:shadow-[0_0_0_3px_rgba(255,255,255,0.2)]"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="photo" className="block mb-2 font-semibold text-[0.95rem]">
                Photo de votre tshirt *
              </label>
              <input
                type="file"
                id="photo"
                name="photo"
                accept="image/*"
                required
                className="w-full py-2 px-2 border-2 border-white/30 rounded-lg bg-white/90 text-[#333] text-base cursor-pointer transition-all focus:outline-none focus:border-white focus:bg-white focus:shadow-[0_0_0_3px_rgba(255,255,255,0.2)]"
              />
              <small className="block mt-2 text-sm opacity-90">
                Formats acceptés: JPG, PNG, WebP (max 5MB)
              </small>
            </div>

            <button
              type="submit"
              disabled={uploading}
              className="w-full py-4 px-8 bg-white text-bleu-fonce border-none rounded-lg text-lg font-bold cursor-pointer transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(0,0,0,0.2)] active:translate-y-0"
            >
              {uploading ? (
                <>
                  <i className="mdi mdi-loading mdi-spin"></i> Upload en cours...
                </>
              ) : (
                <>
                  <i className="mdi mdi-upload"></i> Uploader mon tshirt
                </>
              )}
            </button>
          </form>
        </section>
      )}

      {/* Section Galerie */}
      <section className="gallery-section mt-12">
        <h2 className="font-title font-bold text-[2rem] mb-4 text-center text-bleu-fonce tracking-widest">
          Galerie des Tshirts
        </h2>
        <p className="text-center text-[#666] mb-8 text-lg">
          {loading ? 'Chargement...' : `${tshirts.length} tshirt${tshirts.length > 1 ? 's' : ''} dans la galerie`}
        </p>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-8 mt-8">
          {loading && (
            <div className="col-span-full text-center py-12 text-[#666] text-lg">
              <i className="mdi mdi-loading mdi-spin text-4xl block mb-4"></i>
              <p>Chargement de la galerie...</p>
            </div>
          )}

          {error && (
            <div className="col-span-full text-center py-12 text-[#f44336] text-lg">
              <i className="mdi mdi-alert-circle text-6xl block mb-4 opacity-30"></i>
              <p>{error}</p>
            </div>
          )}

          {!loading && !error && tshirts.length === 0 && (
            <div className="col-span-full text-center py-12 text-[#666] text-lg">
              <i className="mdi mdi-tshirt-crew text-6xl block mb-4 opacity-30"></i>
              <p>Aucun tshirt pour le moment. Soyez le premier à partager le vôtre !</p>
            </div>
          )}

          {!loading &&
            !error &&
            tshirts.map((tshirt) => (
              <div
                key={tshirt.id}
                className="bg-white rounded-xl overflow-hidden shadow-[0_4px_15px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_8px_25px_rgba(0,0,0,0.15)]"
              >
                <div className="w-full h-[300px] overflow-hidden bg-[#f5f5f5]">
                  <img
                    src={`${API_URL}${tshirt.image_path}`}
                    alt={`Tshirt de ${tshirt.prenom} ${tshirt.nom}`}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-h3 text-xl mb-2 text-bleu-fonce font-bold">
                    {tshirt.prenom} {tshirt.nom}
                  </h3>
                </div>
              </div>
            ))}
        </div>
      </section>
    </main>
  );
};

export default Tshirt;
