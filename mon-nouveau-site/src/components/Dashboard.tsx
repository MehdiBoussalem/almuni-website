import { useEffect, useState } from "react";
import { calculateAllStats } from "../utils/statsHelper";
import DistributionChart from "./DistributionChart";

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

interface DashboardProps {
  alumnis: Alumni[];
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

interface PaysStats {
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
  topPays: PaysStats[];
  franceAbroad: FranceAbroadStats;
}

export default function Dashboard({ alumnis }: DashboardProps) {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedMetier, setSelectedMetier] = useState<string | null>(null);
  const [metierAlumnis, setMetierAlumnis] = useState<Alumni[]>([]);

  useEffect(() => {
    const loadStats = async () => {
      setLoading(true);
      try {
        const result = await calculateAllStats(alumnis);
        setStats(result);
      } catch (err) {
        console.error("Erreur calcul stats:", err);
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, [alumnis]);

  const handleSelectMetier = (metier: string) => {
    const filtered = alumnis.filter((a) => a.poste && a.poste.toLowerCase().includes(metier.toLowerCase()));
    setMetierAlumnis(filtered);
    setSelectedMetier(metier);
  };

  if (loading || !stats) {
    return (
      <div className="py-8 px-4 max-w-7xl mx-auto dark:bg-slate-950 min-h-screen flex items-center justify-center">
        <div className="text-bleu-fonce dark:text-bleu-clair text-xl">Chargement des statistiques...</div>
      </div>
    );
  }

  return (
    <div className="py-8 px-4 max-w-7xl mx-auto dark:bg-slate-950 min-h-screen">
      {/* Modal pour afficher les alumni d'un métier */}
      {selectedMetier && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9998] p-4">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl p-8 max-w-2xl w-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-h3 font-bold text-2xl text-bleu-fonce dark:text-bleu-clair">Alumni <span className="font-bold text-rouge">{selectedMetier}</span></h2>
              <button
                onClick={() => setSelectedMetier(null)}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg font-semibold transition-colors"
              >
                ✕ Fermer
              </button>
            </div>

            <p className="text-gray-600 dark:text-gray-300 mb-6">{metierAlumnis.length} alumni trouvé(s)</p>

            <div className="max-h-[60vh] overflow-y-auto space-y-3">
              {metierAlumnis.map((alumni, idx) => (
                <div
                  key={`${alumni.nom}-${alumni.prenom}-${idx}`}
                  className="flex items-start justify-between p-4 bg-gray-50 dark:bg-slate-700 rounded-lg border border-gray-200 dark:border-slate-600 hover:shadow-md transition-shadow"
                >
                  <div className="flex-1">
                    <h4 className="font-h3 font-bold text-bleu-fonce dark:text-bleu-clair">
                      {alumni.prenom} {alumni.nom}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Promo {alumni.promo}</p>
                    {alumni.poste && <p className="text-sm text-rouge font-semibold">{alumni.poste}</p>}
                    {alumni.entreprise && <p className="text-sm text-gray-700 dark:text-gray-300">chez {alumni.entreprise}</p>}
                    {alumni.ville && <p className="text-sm text-gray-600 dark:text-gray-400">📍 {alumni.ville}</p>}
                  </div>
                  {alumni.linkedin && (
                    <a
                      href={alumni.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-4 px-3 py-2 bg-[#0077b5] hover:bg-[#005e8e] text-white rounded-lg text-sm font-semibold transition-colors flex items-center gap-1"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                      LinkedIn
                    </a>
                  )}
                </div>
              ))}
            </div>

            {metierAlumnis.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">Aucun alumni trouvé pour ce métier</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-max">
        {/* Card 1: Total Alumni (Large - spans 2 cols) */}
        <div className="lg:col-span-2 bg-gradient-to-br from-bleu-fonce to-bleu-clair dark:from-slate-800 dark:to-slate-700 text-white rounded-xl p-8 shadow-lg">
          <div className="text-sm uppercase font-semibold mb-3 opacity-90">Total Alumni</div>
          <div className="font-title text-6xl mb-2">{stats.total}</div>
          <div className="text-sm opacity-75">Membres du réseau</div>
        </div>

        {/* Card 2: Portée Géographique */}
        <div className="bg-gradient-to-br from-bordeau to-rouge dark:from-slate-700 dark:to-slate-600 text-white rounded-xl p-6 shadow-lg">
          <div className="text-sm uppercase font-semibold mb-2 opacity-90">Pays</div>
          <div className="font-title text-4xl">{stats.paysUniques}</div>
          <div className="text-xs opacity-75">avec des alumnis</div>
        </div>

        {/* Card 3: France vs Abroad Donut Chart */}
        <DistributionChart stats={stats} />

        {/* Card 4: Top Entreprises (Large - spans 2 cols) */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
          <h3 className="font-h3 font-bold text-xl text-bleu-fonce dark:text-bleu-clair mb-4 uppercase">Top 5 Entreprises</h3>
          <div className="space-y-2">
            {stats.topEntreprises.map((entreprise, idx) => (
              <div key={idx} className="relative">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-xs md:text-sm truncate flex-1 dark:text-gray-200">
                    {idx + 1}. {entreprise.nom}
                  </span>
                  <span className="text-xs text-gray-600 dark:text-gray-400 ml-2 whitespace-nowrap">
                    {entreprise.count} ({entreprise.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-bleu-fonce to-bleu-clair dark:from-bleu-clair dark:to-bleu-fonce h-2 rounded-full transition-all"
                    style={{ width: `${entreprise.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Card 5: Top Villes (à côté des entreprises) */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
          <h3 className="font-h3 font-bold text-xl text-bleu-fonce dark:text-bleu-clair mb-4 uppercase">Top 5 Villes</h3>
          <div className="space-y-2">
            {stats.topVilles.map((ville, idx) => (
              <div key={idx} className="relative">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-xs md:text-sm truncate flex-1 dark:text-gray-200">
                    {idx + 1}. {ville.nom}
                  </span>
                  <span className="text-xs text-gray-600 dark:text-gray-400 ml-2 whitespace-nowrap">
                    {ville.count} ({ville.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-bordeau to-rouge dark:from-rouge dark:to-bordeau h-2 rounded-full transition-all"
                    style={{ width: `${ville.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Card 6: Word Cloud Métiers (en dessous) */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
          <h3 className="font-h3 font-bold text-xl text-bleu-fonce dark:text-bleu-clair mb-4 uppercase">Répartition par Métiers</h3>
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {stats.wordCloud.map((metier, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectMetier(metier.nom)}
                className="px-3 py-1 rounded-full bg-gradient-to-r from-bleu-clair to-bleu-fonce dark:from-slate-600 dark:to-slate-700 text-white font-semibold transition-transform hover:scale-110 cursor-pointer hover:shadow-lg active:scale-95"
                style={{ fontSize: `${metier.size}px` }}
                title={`${metier.count} alumni - Cliquer pour voir la liste`}
              >
                {metier.nom}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
