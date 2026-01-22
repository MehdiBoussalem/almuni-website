import { useState } from "react";

export default function Evenement() {
  const [openAteliers, setOpenAteliers] = useState(false);

  const toggleAteliers = () => {
    setOpenAteliers(!openAteliers);
  };

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <header className="relative bg-gradient-to-r from-bordeau to-rouge text-white py-8 overflow-hidden">
        <div className="absolute top-[-120px] right-[-80px] w-[360px] h-[360px] pointer-events-none opacity-20 bg-gradient-radial from-white/20 to-transparent rounded-full"></div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10 items-stretch">
          <div>
            <p className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 text-sm uppercase tracking-wider mb-4">
              Édition 2026
            </p>
            <h1 className="font-title text-5xl md:text-6xl lg:text-7xl uppercase tracking-wider mb-6">
              JOURNÉE ALUMNI
            </h1>
            <p className="text-lg md:text-xl opacity-90 max-w-lg mb-4">
              Parcours, inspirations et évolutions dans les métiers du digital et des médias.
            </p>

            <div className="flex flex-wrap gap-3 mb-5">
              <div className="flex-1 min-w-[160px] p-4 rounded-2xl border border-white/25 bg-white/10">
                <span className="block text-xs uppercase tracking-wider opacity-75 mb-1">Date</span>
                <strong className="text-xl font-bold">16 janvier 2026</strong>
              </div>
              <div className="flex-1 min-w-[160px] p-4 rounded-2xl border border-white/25 bg-white/10">
                <span className="block text-xs uppercase tracking-wider opacity-75 mb-1">Lieu</span>
                <strong className="text-xl font-bold">Campus Ingémédia</strong>
              </div>
              <div className="flex-1 min-w-[160px] p-4 rounded-2xl border border-white/25 bg-white/10">
                <span className="block text-xs uppercase tracking-wider opacity-75 mb-1">Participants</span>
                <strong className="text-xl font-bold">+120 Alumni</strong>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <a 
                className="inline-flex items-center justify-center rounded-full px-6 py-3 bg-white text-bordeau font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
                href="#programme"
              >
                Voir le programme
              </a>
              <a 
                className="inline-flex items-center justify-center rounded-full px-6 py-3 bg-transparent border border-white/50 text-white font-semibold hover:shadow-xl hover:-translate-y-0.5 transition-all"
                href="/"
              >
                Retour à l'accueil
              </a>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-white/10 border border-white/20 backdrop-blur-sm" aria-label="Moments forts de la journée">
            <h3 className="text-xl font-semibold mb-5">Moments forts</h3>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-2">
                <span className="text-xl opacity-80">•</span>
                Conférences inspirantes par nos alumni
              </li>
              <li className="flex items-center gap-2">
                <span className="text-xl opacity-80">•</span>
                Ateliers immersifs en rotation
              </li>
              <li className="flex items-center gap-2">
                <span className="text-xl opacity-80">•</span>
                Remise des diplômes et photo officielle
              </li>
              <li className="flex items-center gap-2">
                <span className="text-xl opacity-80">•</span>
                Networking avec les partenaires
              </li>
            </ul>
            <div className="mt-6 pt-5 border-t border-white/20 text-center">
              <p className="text-white/95 mb-4 italic font-medium">Partagez votre fierté !</p>
              <a 
                href="/tshirt" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-rouge text-white rounded-full font-bold uppercase tracking-wide shadow-lg hover:bg-rouge/80 hover:-translate-y-0.5 transition-all animate-pulse-subtle"
              >
                </a>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <section className="text-center mb-6">
          <h2 className="text-bleu-fonce text-2xl font-semibold mb-4 leading-snug">
            Parcours, inspirations et évolutions dans les métiers du digital et des médias
          </h2>
          <p className="text-gray-600 text-base max-w-3xl mx-auto leading-relaxed">
            Un espace d'échange entre anciens étudiants, étudiants actuels, enseignants et professionnels du secteur.
          </p>
        </section>

        <section id="programme" className="scroll-mt-24">
          <h3 className="text-bleu-fonce text-xl font-semibold mb-6">Matinée</h3>

          {/* Morning schedule items */}
          <div className="space-y-2 mb-8">
            <div className="grid grid-cols-[160px_1fr] gap-5 bg-white p-4 md:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="text-rouge font-bold text-lg flex items-start pt-1">08h30</div>
              <div className="pr-10">
                <h3 className="text-gray-800 text-xl font-semibold mb-2">Accueil des participants</h3>
                <p className="text-gray-600 mb-0 leading-relaxed">Orientation, installation des étudiants et intervenants.</p>
                <p className="mt-2"><strong>Lieu :</strong> Hall d'entrée</p>
              </div>
            </div>

            <div className="grid grid-cols-[160px_1fr] gap-5 bg-white p-4 md:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="text-rouge font-bold text-lg flex items-start pt-1">09h00</div>
              <div className="pr-10">
                <h3 className="text-gray-800 text-xl font-semibold mb-2">Ouverture de la journée</h3>
                <p className="text-gray-600 mb-0 leading-relaxed">Présentation des objectifs et du déroulé.</p>
                <p className="mt-2"><strong>Lieu :</strong> FA001</p>
              </div>
            </div>

            <div className="grid grid-cols-[160px_1fr] gap-5 bg-white p-4 md:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="text-rouge font-bold text-lg flex items-start pt-1">09h30</div>
              <div className="pr-10">
                <h3 className="text-gray-800 text-xl font-semibold mb-2">Melvin Barraud</h3>
                <p className="text-gray-600 mb-0 leading-relaxed">Artiste, auteur, compositeur et interprète (Melvin Pot). Parcours artistique et créatif entre hip-hop, jazz et techno.</p>
                <p className="mt-2"><strong>Lieu :</strong> FA001</p>
              </div>
            </div>

            <div className="grid grid-cols-[160px_1fr] gap-5 bg-white p-4 md:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="text-rouge font-bold text-lg flex items-start pt-1">10h00</div>
              <div className="pr-10">
                <h3 className="text-gray-800 text-xl font-semibold mb-2">François Cunche</h3>
                <p className="text-gray-600 mb-0 leading-relaxed">Digital Project Director & Accessibility Lead chez L'Oréal. Enjeux du numérique et de l'accessibilité.</p>
                <p className="mt-2"><strong>Lieu :</strong> FA001</p>
              </div>
            </div>

            <div className="grid grid-cols-[160px_1fr] gap-5 bg-white p-4 md:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="text-rouge font-bold text-lg flex items-start pt-1">10h30</div>
              <div className="pr-10">
                <h3 className="text-gray-800 text-xl font-semibold mb-2">Pause</h3>
                <p className="text-gray-600 mb-0 leading-relaxed">Temps de respiration et échanges conviviaux.</p>
                <p className="mt-2"><strong>Lieu :</strong> Hall et circulation</p>
              </div>
            </div>

            <div className="grid grid-cols-[160px_1fr] gap-5 bg-white p-4 md:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="text-rouge font-bold text-lg flex items-start pt-1">10h45</div>
              <div className="pr-10">
                <h3 className="text-gray-800 text-xl font-semibold mb-2">Cathelyne van Winsen</h3>
                <p className="text-gray-600 mb-0 leading-relaxed">Développement associatif et humanitaire. Retours d'expérience sur l'engagement et l'impact social.</p>
                <p className="mt-2"><strong>Lieu :</strong> FA001</p>
              </div>
            </div>

            <div className="grid grid-cols-[160px_1fr] gap-5 bg-white p-4 md:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="text-rouge font-bold text-lg flex items-start pt-1">11h20</div>
              <div className="pr-10">
                <h3 className="text-gray-800 text-xl font-semibold mb-2">Clément Meucci</h3>
                <p className="text-gray-600 mb-0 leading-relaxed">Co-fondateur de 2ManyRiders. Parcours entrepreneurial et enjeux du lancement d'une startup.</p>
                <p className="mt-2"><strong>Lieu :</strong> FA001</p>
              </div>
            </div>

            <div className="grid grid-cols-[160px_1fr] gap-5 bg-white p-4 md:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="text-rouge font-bold text-lg flex items-start pt-1">11h50</div>
              <div className="pr-10">
                <h3 className="text-gray-800 text-xl font-semibold mb-2">Cyril Arnaud</h3>
                <p className="text-gray-600 mb-0 leading-relaxed">Auteur et conférencier. Initiation au développement personnel et à la construction de soi.</p>
                <p className="mt-2"><strong>Lieu :</strong> FA001</p>
              </div>
            </div>

            <div className="grid grid-cols-[160px_1fr] gap-5 bg-white p-4 md:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="text-rouge font-bold text-lg flex items-start pt-1">12h30</div>
              <div className="pr-10">
                <h3 className="text-gray-800 text-xl font-semibold mb-2">Pause déjeuner</h3>
                <p className="text-gray-600 mb-0 leading-relaxed">Fin de la matinée et restauration.</p>
              </div>
            </div>
          </div>

          <h3 className="text-bleu-fonce text-xl font-semibold mb-6 mt-8">Après-midi</h3>

          {/* Afternoon schedule items */}
          <div className="space-y-2 mb-8">
            <div className="grid grid-cols-[160px_1fr] gap-5 bg-white p-4 md:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="text-rouge font-bold text-lg flex items-start pt-1">13h30</div>
              <div className="pr-10">
                <h3 className="text-gray-800 text-xl font-semibold mb-2">Briefing de reprise</h3>
                <p className="text-gray-600 mb-0 leading-relaxed">Présentation du parcours et des espaces ateliers.</p>
                <p className="mt-2"><strong>Lieu :</strong> FA001</p>
              </div>
            </div>

            <div className="grid grid-cols-[160px_1fr] gap-5 bg-white p-4 md:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="text-rouge font-bold text-lg flex items-start pt-1">13h45</div>
              <div className="pr-10">
                <h3 className="text-gray-800 text-xl font-semibold mb-2">Lancement des ateliers</h3>
                <p className="text-gray-600 mb-0 leading-relaxed">Parcours libre avec feuille de participation.</p>
                <p className="mt-2"><strong>Lieu :</strong> Espaces répartis</p>
              </div>
            </div>

            <div className="grid grid-cols-[160px_1fr] gap-5 bg-white p-4 md:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow relative">
              <div className="text-rouge font-bold text-lg flex items-start pt-1">14h00</div>
              <div className="pr-10">
                <h3 className="text-gray-800 text-xl font-semibold mb-2">Ateliers (4 parcours simultanés)</h3>
                <p className="text-gray-600 mb-0 leading-relaxed">Choisissez votre atelier, rotation libre avec feuille de participation.</p>

                <button 
                  className="absolute top-4 right-4 p-1 text-rouge hover:opacity-70 transition-opacity"
                  aria-expanded={openAteliers} 
                  aria-label="Afficher les détails des ateliers"
                  onClick={toggleAteliers}
                >
                  <i className={`mdi mdi-chevron-down text-xl transition-transform ${openAteliers ? 'rotate-180' : ''}`}></i>
                </button>

                {openAteliers && (
                  <div className="mt-3 text-gray-600 text-sm">
                    <ul className="list-none space-y-2">
                      <li><strong>Atelier prise de parole (Philippe Pons)</strong> — Exercices pratiques et expression orale (FA001)</li>
                      <li><strong>Atelier créatif T-shirts "10 ans Alumni"</strong> — Personnalisation et validation participation (Espace atelier)</li>
                      <li><strong>Atelier Réalité Virtuelle</strong> — Démonstrations et expérimentation (Espace VR)</li>
                      <li><strong>Forum Networking</strong> — Rencontres étudiants, alumni et partenaires (Espace stands)</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-[160px_1fr] gap-5 bg-white p-4 md:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="text-rouge font-bold text-lg flex items-start pt-1">15h15</div>
              <div className="pr-10">
                <h3 className="text-gray-800 text-xl font-semibold mb-2">Rotation des ateliers</h3>
                <p className="text-gray-600 mb-0 leading-relaxed">Deuxième passage selon parcours étudiant.</p>
                <p className="mt-2"><strong>Lieu :</strong> Tous espaces</p>
              </div>
            </div>

            <div className="grid grid-cols-[160px_1fr] gap-5 bg-white p-4 md:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="text-rouge font-bold text-lg flex items-start pt-1">16h00</div>
              <div className="pr-10">
                <h3 className="text-gray-800 text-xl font-semibold mb-2">Fin des circulations</h3>
                <p className="text-gray-600 mb-0 leading-relaxed">Validation des participations.</p>
                <p className="mt-2"><strong>Lieu :</strong> Espaces ateliers</p>
              </div>
            </div>

            <div className="grid grid-cols-[160px_1fr] gap-5 bg-white p-4 md:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="text-rouge font-bold text-lg flex items-start pt-1">16h15</div>
              <div className="pr-10">
                <h3 className="text-gray-800 text-xl font-semibold mb-2">Retour collectif</h3>
                <p className="text-gray-600 mb-0 leading-relaxed">Partage d'expérience et remerciements.</p>
                <p className="mt-2"><strong>Lieu :</strong> FA001</p>
              </div>
            </div>

            <div className="grid grid-cols-[160px_1fr] gap-5 bg-white p-4 md:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="text-rouge font-bold text-lg flex items-start pt-1">16h30</div>
              <div className="pr-10">
                <h3 className="text-gray-800 text-xl font-semibold mb-2">Résultats et annonces</h3>
                <p className="text-gray-600 mb-0 leading-relaxed">Clôture des ateliers et annonce des lauréats.</p>
                <p className="mt-2"><strong>Lieu :</strong> FA001</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Soirée finale */}
      <div className="max-w-6xl mx-auto px-4 pb-16">
        <section aria-labelledby="soiree-title">
        <div className="text-center mb-5">
          <h2 id="soiree-title" className="text-bleu-fonce text-2xl font-semibold mb-4">Soirée finale</h2>
          <p className="text-gray-600">Rejoignez-nous pour la soirée : musique, buffet et animations.</p>
        </div>

        <div className="bg-gradient-to-br from-pink-50 to-pink-100 border-l-4 border-rouge p-6 rounded-lg shadow-md mb-10">
          <div className="grid grid-cols-[160px_1fr] gap-5">
            <div className="text-rouge font-bold text-lg flex items-start pt-1">21H00 - 02H00</div>

            <div>
              <h3 className="text-gray-800 text-xl font-semibold mb-2">Soirée finale</h3>
              <p className="text-gray-600 mb-4">La soirée aura lieu au Domaine de La Baratonne — Ouverture des portes à 21h.</p>

              <div className="mt-4">
                <a 
                  className="inline-flex items-center justify-center rounded-full px-6 py-3 bg-white text-bordeau font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
                  href="/soiree"
                >
                  Plus d'information
                </a>
              </div>
            </div>
          </div>
        </div>
        </section>
      </div>
    </main>
  );
}
