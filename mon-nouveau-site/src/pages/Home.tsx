const Home = () => {
  const scrollToAbout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Section Hero (Banner) */}
      <section className="relative flex flex-col justify-center items-center h-[45vh] px-8 pb-14 text-center -mt-[86px] bg-[url('/assets/fond.png')] bg-cover bg-center bg-no-repeat">
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-bordeau/75 to-bleu-fonce/75"></div>

        {/* Contenu principal */}
        <div className="relative z-10">
          <h1 className="font-title text-white text-[5rem] tracking-[2px] drop-shadow-[0_2px_6px_rgba(0,0,0,0.3)]">
            ALUMNI - Ingémédia
          </h1>
          <h2 className="font-light text-white tracking-wide mt-2.5 text-xl">
            Un réseau, une communauté, une ambition commune !
          </h2>
        </div>

        {/* Flèche de défilement */}
        <a
          href="#about"
          onClick={scrollToAbout}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[36px] text-white leading-none z-10 pointer-events-auto animate-bounce"
          aria-label="Faire défiler vers la section suivante"
        >
          <i className="mdi mdi-chevron-down"></i>
        </a>
      </section>

      {/* Section À propos */}
      <section id="about" className="py-[60px] px-[5%] max-w-[1200px] mx-auto scroll-mt-[100px]">
        <h2 className="font-title text-[3rem] text-bleu-fonce text-center mb-8">
          Qu'est-ce que l'Alumni ?
        </h2>
        <p className="leading-relaxed mb-4 text-justify">
          Ingémédia ALUMNI est le réseau des anciens et actuels étudiants de l'UFR Ingémédia.
          Créé dans une volonté de renforcer les liens entre les différentes promotions, ce réseau favorise les
          échanges, le partage d'expériences et la solidarité entre ses membres.
        </p>
        <p className="leading-relaxed mb-4 text-justify">
          Notre mission principale est de développer un véritable sentiment d'appartenance à la communauté Ingémédia,
          tout en accompagnant chaque étudiant dans son insertion professionnelle.
        </p>
        <p className="leading-relaxed mb-4 text-justify">
          Depuis 2015, nous organisons chaque année une journée de rencontres réunissant anciens diplômés,
          étudiants et enseignants. Cet événement constitue un moment privilégié pour échanger, créer des opportunités
          et faire perdurer l'esprit Ingémédia.
        </p>
        <p className="leading-relaxed mb-4 text-justify">
          Rejoindre le réseau ALUMNI, c'est participer à une communauté dynamique et bienveillante,
          où chaque parcours compte et contribue à l'histoire collective d'Ingémédia.
        </p>
      </section>

      {/* Section Objectifs */}
      <section className="py-[60px] px-[5%] max-w-[1200px] mx-auto text-center">
        {/* Barre décorative supérieure */}
        <div className="w-[200px] h-[5px] mx-auto -mt-[60px] mb-5 rounded-sm bg-gradient-to-r from-transparent via-[#c62828] to-transparent"></div>

        <h2 className="text-[1.8em] text-[#333] mb-10">
          Ingémédia Alumni s'axe sur 3 objectifs bien précis
        </h2>

        <div className="flex justify-center items-start gap-10 flex-nowrap">
          {/* Objectif 1 */}
          <div className="flex-[0_0_300px] max-w-[300px] text-center">
            <i className="mdi mdi-star block mx-auto mb-4 text-[40px] text-[#c62828]"></i>
            <h3 className="text-base font-bold tracking-wide text-[#111] mb-2.5">
              PROMOUVOIR SES DIPLÔMÉS
            </h3>
            <p className="text-[0.95em] text-[#555] leading-relaxed">
              Ingémédia Alumni est présent pour faciliter les opportunités entre ses membres en France et dans le
              monde entier.
            </p>
          </div>

          {/* Objectif 2 */}
          <div className="flex-[0_0_300px] max-w-[300px] text-center">
            <i className="mdi mdi-swap-horizontal block mx-auto mb-4 text-[40px] text-[#c62828]"></i>
            <h3 className="text-base font-bold tracking-wide text-[#111] mb-2.5">
              FAVORISER LES ÉCHANGES
            </h3>
            <p className="text-[0.95em] text-[#555] leading-relaxed">
              L'événement les favorise à travers le soutien, les contributions et les parcours de ses diplômés.
            </p>
          </div>

          {/* Objectif 3 */}
          <div className="flex-[0_0_300px] max-w-[300px] text-center">
            <i className="mdi mdi-heart block mx-auto mb-4 text-[40px] text-[#c62828]"></i>
            <h3 className="text-base font-bold tracking-wide text-[#111] mb-2.5">
              SOUTENIR L'INSERTION
            </h3>
            <p className="text-[0.95em] text-[#555] leading-relaxed">
              Un accompagnement à vie pour dynamiser votre carrière et développer votre employabilité.
            </p>
          </div>
        </div>

        {/* Barre décorative inférieure */}
        <div className="w-[200px] h-[5px] mx-auto mt-10 rounded-sm bg-gradient-to-r from-transparent via-[#c62828] to-transparent"></div>
      </section>

      {/* Section Notre Réseau */}
      <section
        id="reseau"
        className="bg-gradient-to-br from-bordeau to-rouge text-white py-20 px-[5%] max-w-none scroll-mt-[100px]"
      >
        <div className="max-w-[1200px] mx-auto flex items-center justify-center gap-16">
          {/* Colonne gauche: Grille d'avatars */}
          <div className="relative z-10">
            <div className="grid grid-cols-4 auto-rows-[96px] gap-[18px] items-center justify-center">
              <div className="w-24 h-24">
                <img
                  src="/assets/carla2.png"
                  alt="Carla"
                  className="w-full h-auto object-cover block"
                />
              </div>
              <div className="w-24 h-24">
                <img
                  src="/assets/diallo2.png"
                  alt="Diallo"
                  className="w-full h-auto object-cover block"
                />
              </div>
              <div className="w-24 h-24">
                <img
                  src="/assets/Emilie-2.png"
                  alt="Emilie"
                  className="w-full h-auto object-cover block"
                />
              </div>
              <div className="w-24 h-24">
                <img
                  src="/assets/floriane.png"
                  alt="Floriane"
                  className="w-full h-auto object-cover block"
                />
              </div>
              <div className="w-24 h-24">
                <img
                  src="/assets/jennifer.png"
                  alt="Jennifer"
                  className="w-full h-auto object-cover block"
                />
              </div>
              <div className="w-24 h-24">
                <img
                  src="/assets/lucie2.png"
                  alt="Lucie"
                  className="w-full h-auto object-cover block"
                />
              </div>
              <div className="w-24 h-24">
                <img
                  src="/assets/quentin2.png"
                  alt="Quentin"
                  className="w-full h-auto object-cover block"
                />
              </div>
              <div className="w-24 h-24">
                <img
                  src="/assets/sarah.png"
                  alt="Sarah"
                  className="w-full h-auto object-cover block"
                />
              </div>
            </div>
          </div>

          {/* Colonne droite: Texte + Bouton */}
          <div className="max-w-[520px]">
            <h2 className="font-title text-[2.4rem] tracking-wide m-0 mb-2.5 text-white">
              Notre réseau
            </h2>
            <div className="w-[140px] h-1 rounded-sm my-2 mb-5 bg-gradient-to-r from-transparent via-white/90 to-transparent"></div>
            <p className="text-white/92 leading-relaxed mb-6">
              Découvrez l'écosystème Ingémédia : annuaire des diplômés, promotions, groupes, contacts
              et événements qui animent la communauté.
            </p>
            <a
              href="/pages/notre-reseau.html"
              className="inline-flex items-center gap-2.5 no-underline font-bold rounded-full py-3 px-6 bg-bleu-fonce text-white shadow-[0_6px_16px_rgba(0,0,0,0.15)] transition-all duration-200 hover:bg-[#2b4e80] hover:-translate-y-0.5 hover:shadow-[0_10px_22px_rgba(0,0,0,0.18)]"
              aria-label="En savoir plus sur notre réseau"
            >
              En savoir plus <i className="mdi mdi-arrow-right text-lg"></i>
            </a>
          </div>
        </div>
      </section>

      {/* Section KPIs */}
      <section className="flex justify-around gap-5 text-center flex-wrap py-[60px] px-[5%] max-w-[1200px] mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-card flex-[1_1_250px]">
          <h3 className="font-title text-[3.5rem] text-rouge">+ 2 000</h3>
          <p className="font-bold text-bleu-fonce">ANCIENS ÉTUDIANTS</p>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-card flex-[1_1_250px]">
          <h3 className="font-title text-[3.5rem] text-rouge">400</h3>
          <p className="font-bold text-bleu-fonce">ÉTUDIANTS PAR ANNÉE</p>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-card flex-[1_1_250px]">
          <h3 className="font-title text-[3.5rem] text-rouge">+ 300</h3>
          <p className="font-bold text-bleu-fonce">ENTREPRISES</p>
        </div>
      </section>
    </>
  );
};

export default Home;
