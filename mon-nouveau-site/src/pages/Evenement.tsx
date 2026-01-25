import { useState } from "react";

export default function Evenement() {
  const [openAteliers, setOpenAteliers] = useState(false);

  const toggleAteliers = () => {
    setOpenAteliers(!openAteliers);
  };

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <header className="relative bg-gradient-to-r from-[#9a2b66] to-[#3d4984] text-white py-16 overflow-hidden">
        {/* Optionnel : voile léger pour texture */}
        <div className="absolute inset-0 bg-black/5 pointer-events-none"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[1.3fr_0.9fr] gap-12 items-start">
          {/* COLONNE GAUCHE */}
          <div className="flex flex-col justify-center">
            

            <h1 className="font-title font-bold text-6xl md:text-7xl lg:text-[5.5rem] uppercase tracking-wide mb-6 leading-none">
              Journée Alumni
            </h1>

            <p className="text-lg md:text-xl text-white/90 max-w-xl mb-10 leading-relaxed font-light">
              Parcours, inspirations et évolutions dans les métiers du digital et des médias.
            </p>

            {/* Cartes d'info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
              <div className="p-5 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors">
                <span className="block text-[10px] uppercase tracking-[0.15em] opacity-70 mb-2 font-semibold">Date</span>
                <strong className="text-xl md:text-2xl font-bold block">16 janvier 2026</strong>
              </div>
              <div className="p-5 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors">
                <span className="block text-[10px] uppercase tracking-[0.15em] opacity-70 mb-2 font-semibold">Lieu</span>
                <strong className="text-xl md:text-2xl font-bold block">Campus Ingémédia</strong>
              </div>
              <div className="p-5 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors">
                <span className="block text-[10px] uppercase tracking-[0.15em] opacity-70 mb-2 font-semibold">Participants</span>
                <strong className="text-xl md:text-2xl font-bold block">+120 Etudiants</strong>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                className="px-8 py-3.5 bg-white text-[#9a2b66] rounded-full font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all text-sm uppercase tracking-wide"
                href="#programme"
              >
                Voir le programme
              </a>
              <a
                className="px-8 py-3.5 bg-transparent border border-white/40 text-white rounded-full font-bold hover:bg-white/10 hover:-translate-y-0.5 transition-all text-sm uppercase tracking-wide"
                href="/"
              >
                Retour à l'accueil
              </a>
            </div>
          </div>

          {/* COLONNE DROITE - Carte Moments forts */}
          <div className="h-full">
            <div className="h-full p-8 rounded-3xl border border-white/20 bg-white/5 backdrop-blur-md flex flex-col justify-between min-h-[450px]" aria-label="Moments forts de la journée">
              <div>
                <h3 className="font-h3 text-2xl font-bold mb-6">Moments forts</h3>
                <ul className="space-y-5 mb-8">
                  <li className="flex items-start gap-3 text-white/90">
                    <span className="text-white/60 mt-1">•</span>
                    <span>Conférences inspirantes par nos alumni</span>
                  </li>
                  <li className="flex items-start gap-3 text-white/90">
                    <span className="text-white/60 mt-1">•</span>
                    <span>Ateliers immersifs en rotation</span>
                  </li>
                  <li className="flex items-start gap-3 text-white/90">
                    <span className="text-white/60 mt-1">•</span>
                    <span>Remise des diplômes et photo officielle</span>
                  </li>
                  <li className="flex items-start gap-3 text-white/90">
                    <span className="text-white/60 mt-1">•</span>
                    <span>Networking avec les partenaires</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6 border-t border-white/10">
                <p className="text-center text-white/80 italic text-sm mb-4">Partagez votre fierté !</p>
                <a
                  href="/tshirt"
                  className="group w-full flex items-center justify-center gap-3 px-6 py-4 bg-[#ff5733] text-white rounded-xl font-bold uppercase tracking-wide shadow-lg hover:bg-[#e64a2a] hover:scale-[1.02] transition-all duration-300"
                >
                  <span className="text-xl group-hover:rotate-12 transition-transform duration-300">👕</span>
                  Galerie des Tshirts Alumni
                </a>
              </div>
            </div>
          </div>

        </div>
      </header>

        {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <section className="text-center mb-6">
          <h2 className="font-h3 text-bleu-fonce text-2xl font-semibold mb-4 leading-snug">
            Parcours, inspirations et évolutions dans les métiers du digital et des médias
          </h2>
          <p className="text-gray-600 text-base max-w-3xl mx-auto leading-relaxed">
            Un espace d'échange entre anciens étudiants, étudiants actuels, enseignants et professionnels du secteur.
          </p>
        </section>

        <section id="programme" className="scroll-mt-24">
          <h3 className="font-h3 text-bleu-fonce text-xl font-semibold mb-6">Matinée</h3>

          {/* Morning schedule items */}
          <div className="space-y-2 mb-8">
            <div className="grid grid-cols-[160px_1fr] gap-5 bg-white p-4 md:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="text-rouge font-bold text-lg flex items-start pt-1">08h30</div>
              <div className="pr-10">
                <h3 className="font-h3 text-gray-800 text-xl font-semibold mb-2">Accueil des participants</h3>
                <p className="text-gray-600 mb-0 leading-relaxed">Orientation, installation des étudiants et intervenants.</p>
                <p className="mt-2"><strong>Lieu :</strong> Hall d'entrée</p>
              </div>
            </div>

            <div className="grid grid-cols-[160px_1fr] gap-5 bg-white p-4 md:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="text-rouge font-bold text-lg flex items-start pt-1">09h00</div>
              <div className="pr-10">
                <h3 className="font-h3 text-gray-800 text-xl font-semibold mb-2">Ouverture de la journée</h3>
                <p className="text-gray-600 mb-0 leading-relaxed">Présentation des objectifs et du déroulé.</p>
                <p className="mt-2"><strong>Lieu :</strong> FA001</p>
              </div>
            </div>

            <div className="grid grid-cols-[160px_1fr] gap-5 bg-white p-4 md:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="text-rouge font-bold text-lg flex items-start pt-1">09h30</div>
              <div className="pr-10">
                <h3 className="font-h3 text-gray-800 text-xl font-semibold mb-2">Melvin Barraud</h3>
                <p className="text-gray-600 mb-0 leading-relaxed">Artiste, auteur, compositeur et interprète (Melvin Pot). Parcours artistique et créatif entre hip-hop, jazz et techno.</p>
                <p className="mt-2"><strong>Lieu :</strong> FA001</p>
              </div>
            </div>

            <div className="grid grid-cols-[160px_1fr] gap-5 bg-white p-4 md:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="text-rouge font-bold text-lg flex items-start pt-1">10h00</div>
              <div className="pr-10">
                <h3 className="font-h3 text-gray-800 text-xl font-semibold mb-2">François Cunche</h3>
                <p className="text-gray-600 mb-0 leading-relaxed">Digital Project Director & Accessibility Lead chez L'Oréal. Enjeux du numérique et de l'accessibilité.</p>
                <p className="mt-2"><strong>Lieu :</strong> FA001</p>
              </div>
            </div>

            <div className="grid grid-cols-[160px_1fr] gap-5 bg-white p-4 md:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="text-rouge font-bold text-lg flex items-start pt-1">10h30</div>
              <div className="pr-10">
                <h3 className="font-h3 text-gray-800 text-xl font-semibold mb-2">Pause</h3>
                <p className="text-gray-600 mb-0 leading-relaxed">Temps de respiration et échanges conviviaux.</p>
                <p className="mt-2"><strong>Lieu :</strong> Hall et circulation</p>
              </div>
            </div>

            <div className="grid grid-cols-[160px_1fr] gap-5 bg-white p-4 md:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="text-rouge font-bold text-lg flex items-start pt-1">10h45</div>
              <div className="pr-10">
                <h3 className="font-h3 text-gray-800 text-xl font-semibold mb-2">Cathelyne van Winsen</h3>
                <p className="text-gray-600 mb-0 leading-relaxed">Développement associatif et humanitaire. Retours d'expérience sur l'engagement et l'impact social.</p>
                <p className="mt-2"><strong>Lieu :</strong> FA001</p>
              </div>
            </div>

            <div className="grid grid-cols-[160px_1fr] gap-5 bg-white p-4 md:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="text-rouge font-bold text-lg flex items-start pt-1">11h20</div>
              <div className="pr-10">
                <h3 className="font-h3 text-gray-800 text-xl font-semibold mb-2">Clément Meucci</h3>
                <p className="text-gray-600 mb-0 leading-relaxed">Co-fondateur de 2ManyRiders. Parcours entrepreneurial et enjeux du lancement d'une startup.</p>
                <p className="mt-2"><strong>Lieu :</strong> FA001</p>
              </div>
            </div>

            <div className="grid grid-cols-[160px_1fr] gap-5 bg-white p-4 md:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="text-rouge font-bold text-lg flex items-start pt-1">11h50</div>
              <div className="pr-10">
                <h3 className="font-h3 text-gray-800 text-xl font-semibold mb-2">Cyril Arnaud</h3>
                <p className="text-gray-600 mb-0 leading-relaxed">Auteur et conférencier. Initiation au développement personnel et à la construction de soi.</p>
                <p className="mt-2"><strong>Lieu :</strong> FA001</p>
              </div>
            </div>

            <div className="grid grid-cols-[160px_1fr] gap-5 bg-white p-4 md:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="text-rouge font-bold text-lg flex items-start pt-1">12h30</div>
              <div className="pr-10">
                <h3 className="font-h3 text-gray-800 text-xl font-semibold mb-2">Pause déjeuner</h3>
                <p className="text-gray-600 mb-0 leading-relaxed">Fin de la matinée et restauration.</p>
              </div>
            </div>
          </div>

          <h3 className="font-h3 text-bleu-fonce text-xl font-semibold mb-6 mt-8">Après-midi</h3>

          {/* Afternoon schedule items */}
          <div className="space-y-2 mb-8">
            <div className="grid grid-cols-[160px_1fr] gap-5 bg-white p-4 md:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="text-rouge font-bold text-lg flex items-start pt-1">13h30</div>
              <div className="pr-10">
                <h3 className="font-h3 text-gray-800 text-xl font-semibold mb-2">Briefing de reprise</h3>
                <p className="text-gray-600 mb-0 leading-relaxed">Présentation du parcours et des espaces ateliers.</p>
                <p className="mt-2"><strong>Lieu :</strong> FA001</p>
              </div>
            </div>

            <div className="grid grid-cols-[160px_1fr] gap-5 bg-white p-4 md:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="text-rouge font-bold text-lg flex items-start pt-1">13h45</div>
              <div className="pr-10">
                <h3 className="font-h3 text-gray-800 text-xl font-semibold mb-2">Lancement des ateliers</h3>
                <p className="text-gray-600 mb-0 leading-relaxed">Parcours libre avec feuille de participation.</p>
                <p className="mt-2"><strong>Lieu :</strong> Espaces répartis</p>
              </div>
            </div>

            <div className="grid grid-cols-[160px_1fr] gap-5 bg-white p-4 md:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow relative">
              <div className="text-rouge font-bold text-lg flex items-start pt-1">14h00</div>
              <div className="pr-10">
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

            <div className="grid grid-cols-[160px_1fr] gap-5 bg-white p-4 md:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="text-rouge font-bold text-lg flex items-start pt-1">15h15</div>
              <div className="pr-10">
                <h3 className="font-h3 text-gray-800 text-xl font-semibold mb-2">Rotation des ateliers</h3>
                <p className="text-gray-600 mb-0 leading-relaxed">Deuxième passage selon parcours étudiant.</p>
                <p className="mt-2"><strong>Lieu :</strong> Tous espaces</p>
              </div>
            </div>

            <div className="grid grid-cols-[160px_1fr] gap-5 bg-white p-4 md:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="text-rouge font-bold text-lg flex items-start pt-1">16h00</div>
              <div className="pr-10">
                <h3 className="font-h3 text-gray-800 text-xl font-semibold mb-2">Fin des circulations</h3>
                <p className="text-gray-600 mb-0 leading-relaxed">Validation des participations.</p>
                <p className="mt-2"><strong>Lieu :</strong> Espaces ateliers</p>
              </div>
            </div>

            <div className="grid grid-cols-[160px_1fr] gap-5 bg-white p-4 md:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="text-rouge font-bold text-lg flex items-start pt-1">16h15</div>
              <div className="pr-10">
                <h3 className="font-h3 text-gray-800 text-xl font-semibold mb-2">Retour collectif</h3>
                <p className="text-gray-600 mb-0 leading-relaxed">Partage d'expérience et remerciements.</p>
                <p className="mt-2"><strong>Lieu :</strong> FA001</p>
              </div>
            </div>

            <div className="grid grid-cols-[160px_1fr] gap-5 bg-white p-4 md:p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="text-rouge font-bold text-lg flex items-start pt-1">16h30</div>
              <div className="pr-10">
                <h3 className="font-h3 text-gray-800 text-xl font-semibold mb-2">Résultats et annonces</h3>
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
          <h2 id="soiree-title" className="font-h3 text-bleu-fonce text-2xl font-semibold mb-4">Soirée</h2>
          <p className="text-gray-600">Rejoignez-nous pour la soirée : musique, buffet et animations.</p>
        </div>

        <div className="bg-gradient-to-br from-pink-50 to-pink-100 border-l-4 border-rouge p-6 rounded-lg shadow-md mb-10">
          <div className="grid grid-cols-[160px_1fr] gap-5">
            <div className="text-rouge font-bold text-lg flex items-start pt-1">21H00 - 02H00</div>

            <div>
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
