const Home = () => {


  return (
    <>
      {/* Section Hero (Banner) */}
      <section className="relative flex flex-col justify-center items-center h-[50vh] w-full px-8 pb-14 text-center -mt-[86px] bg-[url('/assets/home-hero.jpg')] bg-cover bg-[center_35%] bg-no-repeat">
  
        {/* Overlay dégradé pour la lisibilité et la transition */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

        {/* Contenu (Textes) - On ajoute relative et z-10 pour qu'il passe au-dessus de l'overlay */}
        <div className="relative z-10">
          <h1 className="text-[80px] font-bold text-white uppercase tracking-wider leading-tight">
            Alumni - Ingémédia
          </h1>
          <p className="mt-4 text-lg text-white/90 italic">
            Un réseau, une communauté, une ambition commune !
          </p>
        </div>
        
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
            <h2 className="font-title font-bold text-[2.4rem] tracking-wide m-0 mb-2.5 text-white">
              Notre réseau
            </h2>
            <div className="w-[140px] h-1 rounded-sm my-2 mb-5 bg-gradient-to-r from-transparent via-white/90 to-transparent"></div>
            <p className="text-white/92 leading-relaxed leading-[28px] mb-6">
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
          <h3 className="font-title font-bold text-[3.5rem] text-rouge">+ 2 000</h3>
          <p className="font-bold text-bleu-fonce">ANCIENS ÉTUDIANTS</p>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-card flex-[1_1_250px]">
          <h3 className="font-title font-bold text-[3.5rem] text-rouge">400</h3>
          <p className="font-bold text-bleu-fonce">ÉTUDIANTS PAR ANNÉE</p>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-card flex-[1_1_250px]">
          <h3 className="font-title font-bold text-[3.5rem] text-rouge">+ 300</h3>
          <p className="font-bold text-bleu-fonce">ENTREPRISES</p>
        </div>
      </section>
    </>
  );
};

export default Home;
