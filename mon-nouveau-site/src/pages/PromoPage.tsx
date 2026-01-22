import { useParams, Navigate } from 'react-router-dom';
import { getYearData } from '../data/alumniData';
import SpeakerCard from '../components/SpeakerCard';

export default function PromoPage() {
  const { year } = useParams<{ year: string }>();
  
  // Convertir le paramètre year en nombre
  const yearNumber = year ? parseInt(year, 10) : undefined;
  
  // Récupérer les données de l'année
  const yearData = yearNumber ? getYearData(yearNumber) : undefined;

  // Si l'année n'existe pas, rediriger vers la page d'index des archives
  if (!yearData) {
    return <Navigate to="/archives" replace />;
  }

  return (
    <div>
      {/* Hero Section */}
      <div className="h-[36vh] px-8 py-12 mt-0 flex items-center justify-center text-center bg-gradient-to-br from-bordeau to-bleu-fonce">
        <div>
          <h1 className="font-title text-5xl md:text-[3.2rem] text-white tracking-wide">
            {yearData.title}
          </h1>
          <h2 className="text-white/95 text-lg mt-2">
            {yearData.subtitle}
          </h2>
        </div>
      </div>

      {/* Container */}
      <div className="max-w-6xl mx-auto px-[5%] py-6">
        {/* Message spécial (COVID par exemple) */}
        {yearData.specialMessage && (
          <section className="py-20 flex justify-center items-center text-center">
            <div className="max-w-[700px] p-10 bg-white rounded-2xl shadow-lg border border-gray-50">
              <div className="mb-6">
                <div className="text-[5rem] bg-gray-50 p-5 rounded-full inline-block">
                  {yearData.specialMessage.icon}
                </div>
              </div>
              <h2 className="font-title text-4xl text-bleu-fonce mb-4 uppercase tracking-wide">
                {yearData.specialMessage.title}
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-4">
                {yearData.specialMessage.message}
              </p>
              {yearData.specialMessage.submessage && (
                <p className="text-base text-gray-500 italic">
                  {yearData.specialMessage.submessage}
                </p>
              )}
            </div>
          </section>
        )}

        {/* Programme */}
        {yearData.program.length > 0 && (
          <section id="programme" className="pt-9">
            <h2 className="font-title text-bleu-fonce text-[1.6rem] mb-1.5 uppercase text-center">
              Le programme de la journée.
            </h2>
            <div 
              className="w-[140px] h-1 rounded-sm mx-auto my-2.5 mb-5"
              style={{ background: 'linear-gradient(to right, transparent, #c62828 20%, #c62828 80%, transparent)' }}
              aria-hidden="true"
            />
            {yearData.intro && (
              <p className="text-center text-gray-500 mb-12 italic">
                {yearData.intro}
              </p>
            )}

            {/* Colonnes du programme */}
            <div className="flex gap-7 items-start justify-between flex-wrap">
              {yearData.program.map((column, idx) => (
                <div 
                  key={idx}
                  className="flex-1 min-w-[260px] bg-white rounded-lg p-4.5 shadow-md"
                >
                  <h3 className="font-title text-bordeau mb-3 text-lg">
                    {column.title}
                  </h3>
                  
                  {column.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="mb-3.5">
                      <p className="font-bold text-bleu-fonce">
                        {item.time}
                      </p>
                      <p className="font-bold mt-1">
                        {item.title}
                      </p>
                      {item.description && (
                        <p className="text-gray-600 leading-relaxed mt-1.5">
                          {item.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Conférenciers */}
        {yearData.speakers && yearData.speakers.length > 0 && (
          <section className="py-12">
            <h2 className="font-title text-bleu-fonce text-[1.6rem] mb-1.5 uppercase text-center">
              Les conférenciers experts.
            </h2>
            <div 
              className="w-[140px] h-1 rounded-sm mx-auto my-2.5 mb-5"
              style={{ background: 'linear-gradient(to right, transparent, #c62828 20%, #c62828 80%, transparent)' }}
              aria-hidden="true"
            />
            <p className="text-center text-gray-500 mb-12 italic">
              Merci à eux pour leur présence.
            </p>

            {/* Grille des conférenciers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
              {yearData.speakers.map((speaker, idx) => (
                <SpeakerCard key={idx} speaker={speaker} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
