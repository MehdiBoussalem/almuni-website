import { useParams, Link } from 'react-router-dom';
import { archivesData } from '../data/archivesData';

export default function AlumniArchive() {
  const { year } = useParams<{ year: string }>();
  const yearNum = year ? parseInt(year, 10) : null;
  const data = yearNum ? archivesData[yearNum] : null;

  if (!data) {
    return (
      <main className="flex-1 bg-[#f4f7f6] py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="font-title text-4xl text-bleu-fonce mb-4">Archive non trouvée</h1>
          <p className="text-gray-600 mb-6">L'année demandée n'existe pas ou n'est pas disponible.</p>
          <Link 
            to="/archives" 
            className="inline-block px-6 py-3 bg-bleu-fonce text-white rounded-full font-bold hover:shadow-lg transition-all"
          >
            Retour aux archives
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <div className="h-[36vh] px-10 py-14 mt-0 flex items-center justify-center text-center bg-[url('/assets/archive.webp')] bg-cover bg-bottom relative overflow-hidden">
        <div className="absolute inset-0 bg-black/40" aria-hidden="true"></div>
        <div className="relative z-10">
          <h1 className="font-title font-bold text-5xl md:text-[3.2rem] text-white tracking-[0.08em] uppercase">
            ALUMNI {data.year}
          </h1>
          <h2 className="font-sans font-light leading-normal text-white/95 text-[16.8px] mt-3 max-w-2xl mx-auto">
            {data.subtitle}
          </h2>
        </div>
      </div>

      {/* Content */}
      <div className="bg-[#f4f7f6] py-12">
        <div className="max-w-6xl mx-auto px-4">
          {/* Programme Section */}
          <section className="mb-12">
            <h2 className="font-h3 font-bold text-bleu-fonce text-3xl text-center mb-2 uppercase tracking-wide">
              Le programme de la journée.
            </h2>
            <div 
              className="w-[140px] h-1 rounded-sm mx-auto my-2.5"
              style={{ background: 'linear-gradient(to right, transparent, #c62828 20%, #c62828 80%, transparent)' }}
              aria-hidden="true"
            />
            <p className="text-center text-gray-600 italic mb-10 max-w-3xl mx-auto">
              Découvrez le programme de la journée Alumni à l'UFR Ingémédia que votre équipe vous a concocté !
            </p>

            {/* Program Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {data.program.map((section, idx) => (
                <div key={idx} className="bg-white rounded-xl p-8 shadow-[0_8px_24px_rgba(0,0,0,0.08)] border border-black/5 flex flex-col gap-5">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.18em] text-bordeau mb-1">{section.title}</p>
                    <div className="h-[2px] w-12 bg-bordeau/70"></div>
                  </div>
                  <div className="space-y-6">
                    {section.items.map((item, itemIdx) => (
                      <div key={itemIdx} className="border-l-4 border-rouge pl-4">
                        <p className="font-bold text-rouge text-lg mb-1 tracking-wide">{item.time}</p>
                        <h4 className="font-h3 font-bold text-gray-800 text-lg mb-1 leading-snug">{item.title}</h4>
                        {item.desc && (
                          <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Speakers Section */}
          {data.speakers && data.speakers.length > 0 && (
            <section>
              <h2 className="font-h3 font-bold text-bleu-fonce text-3xl text-center mb-2 uppercase tracking-wide">
                Les conférenciers.
              </h2>
              <div 
                className="w-[140px] h-1 rounded-sm mx-auto my-2.5"
                style={{ background: 'linear-gradient(to right, transparent, #c62828 20%, #c62828 80%, transparent)' }}
                aria-hidden="true"
              />
              <p className="text-center text-gray-600 mb-10">Merci à eux pour leur présence.</p>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {data.speakers.map((speaker, idx) => (
                  <div 
                    key={idx} 
                    className="bg-white rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.08)] border border-black/5 overflow-hidden flex flex-col hover:shadow-[0_10px_32px_rgba(0,0,0,0.12)] transition-all"
                  >
                    {speaker.image && (
                      <div className="w-full bg-white">
                        <div className="aspect-[4/3] bg-gray-100 overflow-hidden">
                          <img
                            src={speaker.image}
                            alt={speaker.name}
                            className="w-full h-full object-cover object-center"
                          />
                        </div>
                      </div>
                    )}
                    <div className="p-6 flex-1 flex flex-col gap-2 text-center">
                      <h3 className="font-h3 font-bold text-bleu-fonce text-lg uppercase tracking-wide">
                        {speaker.name}
                      </h3>
                      <p className="text-gray-700 text-sm leading-relaxed">{speaker.role}</p>
                      <p className="font-semibold text-rouge text-sm uppercase tracking-wide">{speaker.company}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Back Link */}
          <div className="mt-12 text-center">
            <Link 
              to="/archives" 
              className="inline-block px-6 py-3 bg-bleu-fonce text-white rounded-full font-bold hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              Retour aux archives
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
