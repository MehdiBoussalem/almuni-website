import { useState } from "react";

export default function Evenement() {
  const [openAteliers, setOpenAteliers] = useState(false);

  const toggleAteliers = () => {
    setOpenAteliers(!openAteliers);
  };

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <header className="relative bg-[url('/assets/edition2026.webp')] bg-cover bg-center text-white py-20 overflow-hidden min-h-[600px] flex items-center">
        {/* Overlay pour améliorer la lisibilité */}
        <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
          {/* Contenu centré */}
          <div className="flex flex-col items-center text-center">
            
            <h1 className="font-title font-bold text-6xl md:text-7xl lg:text-[5.5rem] uppercase tracking-wide mb-6 leading-none">
              JOURNÉE ALUMNI
            </h1>

           

            {/* Cartes d'info - bleues avec coins arrondis */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10 w-full max-w-4xl">
              <div className="p-6 rounded-3xl bg-[#3d5a9e] shadow-lg">
                <span className="block text-[11px] uppercase tracking-[0.15em] mb-3 font-semibold text-white/80">DATE</span>
                <strong className="text-2xl md:text-3xl font-bold block text-white">16 janvier 2026</strong>
              </div>
              <div className="p-6 rounded-3xl bg-[#3d5a9e] shadow-lg">
                <span className="block text-[11px] uppercase tracking-[0.15em] mb-3 font-semibold text-white/80">LIEU</span>
                <strong className="text-2xl md:text-3xl font-bold block text-white">Campus Porte d'Italie</strong>
              </div>
              <div className="p-6 rounded-3xl bg-[#3d5a9e] shadow-lg">
                <span className="block text-[11px] uppercase tracking-[0.15em] mb-3 font-semibold text-white/80">PARTICIPANTS</span>
                <strong className="text-2xl md:text-3xl font-bold block text-white">+120 étudiants</strong>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              <a
                className="px-8 py-4 bg-[#c72866] text-white rounded-full font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all text-sm uppercase tracking-wide"
                href="#programme"
              >
                Voir le programme
              </a>
              <a
                className="px-8 py-4 bg-[#c72866] text-white rounded-full font-bold hover:shadow-xl hover:-translate-y-0.5 transition-all text-sm uppercase tracking-wide"
                href="/tshirt"
              >
                Galerie Tshirt
              </a>
            </div>
          </div>

        </div>
      </header>

      {/* Nouvelle section texte centré */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-title text-bleu-fonce text-4xl md:text-5xl font-bold leading-tight">
            Parcours, inspirations et évolutions dans les métiers du digital et des médias.
          </h2>
        </div>
      </section>

        {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-6">

        <section id="programme" className="scroll-mt-24">
          <h3 className="font-h3 text-bleu-fonce text-xl font-semibold mb-6">Matinée</h3>

          {/* Morning schedule items */}
          <div className="space-y-2 mb-8">
            <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex gap-5">
                <div className="flex flex-col items-center gap-2">
                  <div className="text-rouge font-bold text-lg">08h30</div>
                  <div className="w-20 h-20 rounded-full bg-bleu-clair/20 flex items-center justify-center">
                    <i className="mdi mdi-account-multiple text-3xl text-bleu-fonce"></i>
                  </div>
                </div>
                <div className="flex-1 pr-10">
                  <h3 className="font-h3 text-gray-800 text-xl font-semibold mb-2">Accueil des participants</h3>
                  <p className="text-gray-600 mb-0 leading-relaxed">Orientation, installation des étudiants et intervenants.</p>
                  <p className="mt-2"><strong>Lieu :</strong> Hall d'entrée</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex gap-5">
                <div className="flex flex-col items-center gap-2">
                  <div className="text-rouge font-bold text-lg">09h00</div>
                  <div className="w-20 h-20 rounded-full bg-bleu-clair/20 flex items-center justify-center">
                    <i className="mdi mdi-bullhorn text-3xl text-bleu-fonce"></i>
                  </div>
                </div>
                <div className="flex-1 pr-10">
                  <h3 className="font-h3 text-gray-800 text-xl font-semibold mb-2">Ouverture de la journée</h3>
                  <p className="text-gray-600 mb-0 leading-relaxed">Présentation des objectifs et du déroulé.</p>
                  <p className="mt-2"><strong>Lieu :</strong> FA001</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex gap-5">
                <div className="flex flex-col items-center gap-2">
                  <div className="text-rouge font-bold text-lg">09h30</div>
                  <img src="https://placehold.co/80x80" alt="Melvin Barraud" className="w-20 h-20 rounded-full object-cover" />
                </div>
                <div className="flex-1 pr-10">
                  <h3 className="font-h3 text-gray-800 text-xl font-semibold mb-2">Melvin Barraud</h3>
                  <p className="text-gray-600 mb-0 leading-relaxed">Artiste, auteur, compositeur et interprète (Melvin Pot). Parcours artistique et créatif entre hip-hop, jazz et techno.</p>
                  <p className="mt-2"><strong>Lieu :</strong> FA001</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex gap-5">
                <div className="flex flex-col items-center gap-2">
                  <div className="text-rouge font-bold text-lg">10h00</div>
                  <img src="https://placehold.co/80x80" alt="François Cunche" className="w-20 h-20 rounded-full object-cover" />
                </div>
                <div className="flex-1 pr-10">
                  <h3 className="font-h3 text-gray-800 text-xl font-semibold mb-2">François Cunche</h3>
                  <p className="text-gray-600 mb-0 leading-relaxed">Digital Project Director & Accessibility Lead chez L'Oréal. Enjeux du numérique et de l'accessibilité.</p>
                  <p className="mt-2"><strong>Lieu :</strong> FA001</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex gap-5">
                <div className="flex flex-col items-center gap-2">
                  <div className="text-rouge font-bold text-lg">10h30</div>
                  <div className="w-20 h-20 rounded-full bg-bleu-clair/20 flex items-center justify-center">
                    <i className="mdi mdi-coffee text-3xl text-bleu-fonce"></i>
                  </div>
                </div>
                <div className="flex-1 pr-10">
                  <h3 className="font-h3 text-gray-800 text-xl font-semibold mb-2">Pause</h3>
                  <p className="text-gray-600 mb-0 leading-relaxed">Temps de respiration et échanges conviviaux.</p>
                  <p className="mt-2"><strong>Lieu :</strong> Hall et circulation</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex gap-5">
                <div className="flex flex-col items-center gap-2">
                  <div className="text-rouge font-bold text-lg">10h45</div>
                  <img src="https://placehold.co/80x80" alt="Cathelyne van Winsen" className="w-20 h-20 rounded-full object-cover" />
                </div>
                <div className="flex-1 pr-10">
                  <h3 className="font-h3 text-gray-800 text-xl font-semibold mb-2">Cathelyne van Winsen</h3>
                  <p className="text-gray-600 mb-0 leading-relaxed">Développement associatif et humanitaire. Retours d'expérience sur l'engagement et l'impact social.</p>
                  <p className="mt-2"><strong>Lieu :</strong> FA001</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex gap-5">
                <div className="flex flex-col items-center gap-2">
                  <div className="text-rouge font-bold text-lg">11h20</div>
                  <img src="https://placehold.co/80x80" alt="Clément Meucci" className="w-20 h-20 rounded-full object-cover" />
                </div>
                <div className="flex-1 pr-10">
                  <h3 className="font-h3 text-gray-800 text-xl font-semibold mb-2">Clément Meucci</h3>
                  <p className="text-gray-600 mb-0 leading-relaxed">Co-fondateur de 2ManyRiders. Parcours entrepreneurial et enjeux du lancement d'une startup.</p>
                  <p className="mt-2"><strong>Lieu :</strong> FA001</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex gap-5">
                <div className="flex flex-col items-center gap-2">
                  <div className="text-rouge font-bold text-lg">11h50</div>
                  <img src="https://placehold.co/80x80" alt="Cyril Arnaud" className="w-20 h-20 rounded-full object-cover" />
                </div>
                <div className="flex-1 pr-10">
                  <h3 className="font-h3 text-gray-800 text-xl font-semibold mb-2">Cyril Arnaud</h3>
                  <p className="text-gray-600 mb-0 leading-relaxed">Auteur et conférencier. Initiation au développement personnel et à la construction de soi.</p>
                  <p className="mt-2"><strong>Lieu :</strong> FA001</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex gap-5">
                <div className="flex flex-col items-center gap-2">
                  <div className="text-rouge font-bold text-lg">12h30</div>
                  <div className="w-20 h-20 rounded-full bg-bleu-clair/20 flex items-center justify-center">
                    <i className="mdi mdi-food text-3xl text-bleu-fonce"></i>
                  </div>
                </div>
                <div className="flex-1 pr-10">
                  <h3 className="font-h3 text-gray-800 text-xl font-semibold mb-2">Pause déjeuner</h3>
                  <p className="text-gray-600 mb-0 leading-relaxed">Fin de la matinée et restauration.</p>
                </div>
              </div>
            </div>
          </div>

          <h3 className="font-h3 text-bleu-fonce text-xl font-semibold mb-6 mt-8">Après-midi</h3>

          {/* Afternoon schedule items */}
          <div className="space-y-2 mb-8">
            <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex gap-5">
                <div className="flex flex-col items-center gap-2">
                  <div className="text-rouge font-bold text-lg">13h30</div>
                  <div className="w-20 h-20 rounded-full bg-bleu-clair/20 flex items-center justify-center">
                    <i className="mdi mdi-clipboard-text text-3xl text-bleu-fonce"></i>
                  </div>
                </div>
                <div className="flex-1 pr-10">
                  <h3 className="font-h3 text-gray-800 text-xl font-semibold mb-2">Briefing de reprise</h3>
                  <p className="text-gray-600 mb-0 leading-relaxed">Présentation du parcours et des espaces ateliers.</p>
                  <p className="mt-2"><strong>Lieu :</strong> FA001</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex gap-5">
                <div className="flex flex-col items-center gap-2">
                  <div className="text-rouge font-bold text-lg">13h45</div>
                  <div className="w-20 h-20 rounded-full bg-bleu-clair/20 flex items-center justify-center">
                    <i className="mdi mdi-rocket-launch text-3xl text-bleu-fonce"></i>
                  </div>
                </div>
                <div className="flex-1 pr-10">
                  <h3 className="font-h3 text-gray-800 text-xl font-semibold mb-2">Lancement des ateliers</h3>
                  <p className="text-gray-600 mb-0 leading-relaxed">Parcours libre avec feuille de participation.</p>
                  <p className="mt-2"><strong>Lieu :</strong> Espaces répartis</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow relative">
              <div className="flex gap-5">
                <div className="flex flex-col items-center gap-2">
                  <div className="text-rouge font-bold text-lg">14h00</div>
                  <div className="w-20 h-20 rounded-full bg-bleu-clair/20 flex items-center justify-center">
                    <i className="mdi mdi-school text-3xl text-bleu-fonce"></i>
                  </div>
                </div>
                <div className="flex-1 pr-10">
                  <h3 className="font-h3 text-gray-800 text-xl font-semibold mb-2">Ateliers (4 parcours simultanés)</h3>
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
            </div>

            <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex gap-5">
                <div className="flex flex-col items-center gap-2">
                  <div className="text-rouge font-bold text-lg">15h15</div>
                  <div className="w-20 h-20 rounded-full bg-bleu-clair/20 flex items-center justify-center">
                    <i className="mdi mdi-rotate-3d-variant text-3xl text-bleu-fonce"></i>
                  </div>
                </div>
                <div className="flex-1 pr-10">
                  <h3 className="font-h3 text-gray-800 text-xl font-semibold mb-2">Rotation des ateliers</h3>
                  <p className="text-gray-600 mb-0 leading-relaxed">Deuxième passage selon parcours étudiant.</p>
                  <p className="mt-2"><strong>Lieu :</strong> Tous espaces</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex gap-5">
                <div className="flex flex-col items-center gap-2">
                  <div className="text-rouge font-bold text-lg">16h00</div>
                  <div className="w-20 h-20 rounded-full bg-bleu-clair/20 flex items-center justify-center">
                    <i className="mdi mdi-flag-checkered text-3xl text-bleu-fonce"></i>
                  </div>
                </div>
                <div className="flex-1 pr-10">
                  <h3 className="font-h3 text-gray-800 text-xl font-semibold mb-2">Fin des circulations</h3>
                  <p className="text-gray-600 mb-0 leading-relaxed">Validation des participations.</p>
                  <p className="mt-2"><strong>Lieu :</strong> Espaces ateliers</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex gap-5">
                <div className="flex flex-col items-center gap-2">
                  <div className="text-rouge font-bold text-lg">16h15</div>
                  <div className="w-20 h-20 rounded-full bg-bleu-clair/20 flex items-center justify-center">
                    <i className="mdi mdi-forum text-3xl text-bleu-fonce"></i>
                  </div>
                </div>
                <div className="flex-1 pr-10">
                  <h3 className="font-h3 text-gray-800 text-xl font-semibold mb-2">Retour collectif</h3>
                  <p className="text-gray-600 mb-0 leading-relaxed">Partage d'expérience et remerciements.</p>
                  <p className="mt-2"><strong>Lieu :</strong> FA001</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex gap-5">
                <div className="flex flex-col items-center gap-2">
                  <div className="text-rouge font-bold text-lg">16h30</div>
                  <div className="w-20 h-20 rounded-full bg-bleu-clair/20 flex items-center justify-center">
                    <i className="mdi mdi-trophy text-3xl text-bleu-fonce"></i>
                  </div>
                </div>
                <div className="flex-1 pr-10">
                  <h3 className="font-h3 text-gray-800 text-xl font-semibold mb-2">Résultats et annonces</h3>
                  <p className="text-gray-600 mb-0 leading-relaxed">Clôture des ateliers et annonce des lauréats.</p>
                  <p className="mt-2"><strong>Lieu :</strong> FA001</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Soirée finale */}
      <div className="max-w-6xl mx-auto px-4 pb-16">
        <section aria-labelledby="soiree-title">
        <div className="text-center mb-5">
          <h2 id="soiree-title" className="font-h3 text-bleu-fonce text-2xl font-semibold mb-4">Soirée</h2>
          <p className="text-gray-600">Rejoignez-nous pour la soirée : musique, buffet et animations.</p>
        </div>

        <div className="bg-gradient-to-br from-pink-50 to-pink-100 border-l-4 border-rouge p-6 rounded-lg shadow-md mb-10">
          <div className="flex gap-5">
            <div className="flex flex-col items-center gap-2">
              <div className="text-rouge font-bold text-lg">21H00 - 02H00</div>
              <div className="w-20 h-20 rounded-full bg-rouge/20 flex items-center justify-center">
                <i className="mdi mdi-music-note text-3xl text-rouge"></i>
              </div>
            </div>

            <div className="flex-1">
              <h3 className="font-h3 text-gray-800 text-xl font-semibold mb-2">Soirée</h3>
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
