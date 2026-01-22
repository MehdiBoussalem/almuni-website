import { useMemo } from "react";
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

export default function Dashboard({ alumnis }: DashboardProps) {
  // Calcul des statistiques via le helper
  const stats = useMemo(() => calculateAllStats(alumnis), [alumnis]);

  return (
    <div className="py-8 px-4 max-w-7xl mx-auto dark:bg-slate-950 min-h-screen">
  

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
          <h3 className="font-title text-xl text-bleu-fonce dark:text-bleu-clair mb-4 uppercase">Top 5 Entreprises</h3>
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
          <h3 className="font-title text-xl text-bleu-fonce dark:text-bleu-clair mb-4 uppercase">Top 5 Villes</h3>
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
          <h3 className="font-title text-xl text-bleu-fonce dark:text-bleu-clair mb-4 uppercase">Répartition par Métiers</h3>
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {stats.wordCloud.map((metier, idx) => (
              <div
                key={idx}
                className="px-3 py-1 rounded-full bg-gradient-to-r from-bleu-clair to-bleu-fonce dark:from-slate-600 dark:to-slate-700 text-white font-semibold transition-transform hover:scale-110 cursor-default"
                style={{ fontSize: `${metier.size}px` }}
                title={`${metier.count} alumni`}
              >
                {metier.nom}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
