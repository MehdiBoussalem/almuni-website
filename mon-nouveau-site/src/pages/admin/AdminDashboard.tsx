import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNav from "../../components/admin/AdminNav";

const API_BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

interface Stats {
  alumnis_count: number;
  stages_count: number;
  inscrits_count: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    alumnis_count: 0,
    stages_count: 0,
    inscrits_count: 0,
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/alumnis/?limit=1`);
      await res.json();
      
      const stagesRes = await fetch(`${API_BASE}/stages/?limit=1`);
      await stagesRes.json();

      const inscritsRes = await fetch(`${API_BASE}/inscrits-soiree/?limit=1`);
      await inscritsRes.json();

      // Récupérer les counts
      const alumniCountRes = await fetch(`${API_BASE}/alumnis/?limit=10000`);
      const allAlumnis = await alumniCountRes.json();

      const stageCountRes = await fetch(`${API_BASE}/stages/?limit=10000`);
      const allStages = await stageCountRes.json();

      const inscritCountRes = await fetch(`${API_BASE}/inscrits-soiree/?limit=10000`);
      const allInscrits = await inscritCountRes.json();

      setStats({
        alumnis_count: Array.isArray(allAlumnis) ? allAlumnis.length : 0,
        stages_count: Array.isArray(allStages) ? allStages.length : 0,
        inscrits_count: Array.isArray(allInscrits) ? allInscrits.length : 0,
      });
    } catch (err) {
      console.error("Erreur lors du chargement des stats", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("adminToken");
    sessionStorage.removeItem("adminUser");
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <AdminNav onLogout={handleLogout} />

      <div className="flex-1 py-12 px-[5%] max-w-[1400px] mx-auto w-full">
        <div className="mb-8">
          <h1 className="font-title text-4xl text-bleu-fonce mb-2">Tableau de Bord Admin</h1>
          <p className="text-gray-600">Vue globale des données</p>
        </div>

        {loading ? (
          <div className="text-center text-gray-500">Chargement des statistiques...</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Alumnis */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 flex flex-col items-center justify-center">
              <div className="text-5xl font-bold text-bleu-fonce mb-2">{stats.alumnis_count}</div>
              <p className="text-gray-600 font-semibold">Alumni</p>
              <button
                onClick={() => navigate("/admin/alumnis")}
                className="mt-4 px-4 py-2 bg-bleu-fonce text-white text-sm rounded-lg hover:bg-rouge transition-colors"
              >
                Gérer
              </button>
            </div>

            {/* Stages */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 flex flex-col items-center justify-center">
              <div className="text-5xl font-bold text-rouge mb-2">{stats.stages_count}</div>
              <p className="text-gray-600 font-semibold">Stages & Alternances</p>
              <button
                onClick={() => navigate("/admin/stages")}
                className="mt-4 px-4 py-2 bg-rouge text-white text-sm rounded-lg hover:bg-bordeau transition-colors"
              >
                Gérer
              </button>
            </div>

            {/* Inscrits */}
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 flex flex-col items-center justify-center">
              <div className="text-5xl font-bold text-green-600 mb-2">{stats.inscrits_count}</div>
              <p className="text-gray-600 font-semibold">Inscrits Soirée</p>
              <button
                onClick={() => navigate("/admin/inscriptions")}
                className="mt-4 px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
              >
                Voir
              </button>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
