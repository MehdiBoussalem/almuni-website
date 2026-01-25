import { Link } from 'react-router-dom';
import { availableYears } from '../data/alumniData';

export default function ArchivesIndex() {
  return (
    <div>
      {/* Hero Section */}
      <div className="h-[36vh] px-10 py-14 mt-0 flex items-center justify-center text-center bg-gradient-to-br from-bordeau to-bleu-fonce relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" aria-hidden="true"></div>
        <div className="relative z-10">
          <h1 className="font-title font-bold text-5xl md:text-[3.2rem] text-white tracking-[0.08em] uppercase">
            Archives
          </h1>
          <h2 className="font-sans font-light leading-normal text-white/95 text-[16.8px] mt-3 max-w-2xl mx-auto">
            Choisissez une année pour consulter la page correspondante.
          </h2>
        </div>
      </div>

      {/* Container */}
      <main className="max-w-6xl mx-auto px-[5%] py-6">
        <section className="archives-list">
          <h2 className="font-title text-bleu-fonce text-[1.6rem] mb-1.5 uppercase text-center">
            Années
          </h2>
          <div 
            className="w-[140px] h-1 rounded-sm mx-auto my-2.5 mb-5"
            style={{ background: 'linear-gradient(to right, transparent, #c62828 20%, #c62828 80%, transparent)' }}
            aria-hidden="true"
          />

          {/* Grille des années */}
          <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-6 pb-12">
            {availableYears.map((year) => (
              <Link
                key={year}
                to={`/archives/${year}`}
                className="flex flex-col bg-white rounded-xl no-underline text-inherit shadow-md transition-all duration-300 overflow-hidden relative border border-black/10 hover:-translate-y-1.5 hover:shadow-[0_10px_32px_rgba(198,40,40,0.18)] hover:border-[rgba(198,40,40,0.25)] group"
              >
                <div className="p-7 flex flex-col items-center justify-center text-center h-full">
                  <span className="font-title text-[2.6rem] font-bold text-bleu-fonce mb-1 transition-colors duration-300 group-hover:text-bordeau">
                    {year}
                  </span>
                  <span className="text-xs text-gray-500 uppercase tracking-[0.16em] mb-3">
                    Promotion
                  </span>
                  <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-bordeau to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true"></div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
