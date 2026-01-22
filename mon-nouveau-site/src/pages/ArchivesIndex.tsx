import { Link } from 'react-router-dom';
import { availableYears } from '../data/alumniData';

export default function ArchivesIndex() {
  return (
    <div>
      {/* Hero Section */}
      <div className="h-[36vh] px-8 py-12 mt-0 flex items-center justify-center text-center bg-gradient-to-br from-bordeau to-bleu-fonce">
        <div>
          <h1 className="font-title text-5xl md:text-[3.2rem] text-white tracking-wide">
            Archives
          </h1>
          <h2 className="text-white/95 text-lg mt-2">
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
                className="flex flex-col bg-white rounded-xl no-underline text-inherit shadow-md transition-all duration-300 overflow-hidden relative border border-black/5 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(198,40,40,0.15)] hover:border-[rgba(198,40,40,0.2)] group"
              >
                <div className="p-6 flex flex-col items-center justify-center text-center h-full">
                  <span className="font-title text-[2.5rem] font-bold text-bleu-fonce mb-1 transition-colors duration-300 group-hover:text-bordeau">
                    {year}
                  </span>
                  <span className="text-sm text-gray-600 uppercase tracking-wider mb-4">
                    Promotion
                  </span>
                  <svg 
                    className="w-6 h-6 text-bordeau opacity-0 -translate-x-2.5 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0"
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
