import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Récupérer le mot de passe depuis l'env
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || "admin123";
    const adminUsername = "admin";

    // Vérifier les credentials (simple pour démarrer)
    if (username === adminUsername && password === adminPassword) {
      // Stocker le token dans sessionStorage (plus sécurisé que localStorage)
      sessionStorage.setItem("adminToken", btoa(`${username}:${password}`));
      sessionStorage.setItem("adminUser", username);
      navigate("/admin/dashboard");
    } else {
      setError("Identifiants invalides");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-bleu-fonce to-rouge flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="font-title text-3xl text-bleu-fonce mb-2">Back Office</h1>
          <p className="text-gray-600 text-sm">Accès réservé aux administrateurs</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Nom d'utilisateur</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bleu-fonce"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bleu-fonce"
              disabled={loading}
            />
          </div>

          {error && <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm font-semibold">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 bg-bleu-fonce text-white rounded-lg font-semibold hover:bg-rouge transition-colors disabled:opacity-60"
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-200 text-center text-xs text-gray-500">
          <p>Accès administrateur - données confidentielles</p>
        </div>
      </div>
    </div>
  );
}
