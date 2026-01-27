const Home = () => {


  return (
    <>
      {/* Section Hero (Banner) */}
      <section className="relative flex flex-col justify-center items-center h-[65vh] w-full px-8 pb-14 text-center -mt-[86px] bg-[url('/assets/home-hero.webp')] bg-cover bg-[center_35%] bg-no-repeat">
  
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

      {/* Bandeau bleu défilant */}
      <section className="w-full bg-bleu-fonce py-4 overflow-hidden">
        <div className="flex animate-scroll whitespace-nowrap">
          <div className="inline-block">
            {[...Array(8)].map((_, i) => (
              <span key={i} className="inline-block px-8 font-bold text-sm tracking-wider text-white">
                ALUMNI INGÉMÉDIA • 10 ANS • +2000 DIPLÔMÉS • REJOIGNEZ-NOUS LE 16 JANVIER
              </span>
            ))}
          </div>
          <div className="inline-block">
            {[...Array(8)].map((_, i) => (
              <span key={i + 8} className="inline-block px-8 font-bold text-sm tracking-wider text-white">
                ALUMNI INGÉMÉDIA • 10 ANS • +2000 DIPLÔMÉS • REJOIGNEZ-NOUS LE 16 JANVIER
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Section Notre Réseau */}
      <section
        id="reseau"
        className="relative w-full h-[500px] flex items-center justify-center overflow-hidden max-w-none"
      >
        {/* Grille de 4 images en arrière-plan */}
        <div className="absolute inset-0 flex">
          <div className="flex-1 overflow-hidden">
            <img
              src="/assets/reseau_1.webp"
              alt="Network image 1"
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div className="flex-1 overflow-hidden">
            <img
              src="/assets/reseau_2.webp"
              alt="Network image 2"
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div className="flex-1 overflow-hidden">
            <img
              src="/assets/reseau_3.webp"
              alt="Network image 3"
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div className="flex-1 overflow-hidden">
            <img
              src="/assets/reseau_4.webp"
              alt="Network image 4"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>

        {/* Overlay semi-transparent pour la lisibilité */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Contenu superposé au centre */}
        <div className="relative z-10 text-center text-white max-w-[600px] px-8">
          <h2 className="font-title font-bold text-[2.4rem] tracking-wide m-0 mb-2.5 text-white">
            NOTRE RÉSEAU
          </h2>
          <div className="w-[140px] h-1 rounded-sm my-2 mb-5 bg-gradient-to-r from-transparent via-white/90 to-transparent mx-auto"></div>
          <p className="text-white/92 leading-relaxed leading-[28px] mb-6">
            Découvrez l'écosystème Ingémédia : annuaire des diplômés, promotions, groupes, contacts
            et événements qui animent la communauté.
          </p>
          <a
            href="/notre-reseau"
            className="inline-flex items-center gap-2.5 no-underline font-bold rounded-full py-3 px-6 bg-bleu-fonce text-white shadow-[0_6px_16px_rgba(0,0,0,0.15)] transition-all duration-200 hover:bg-[#2b4e80] hover:-translate-y-0.5 hover:shadow-[0_10px_22px_rgba(0,0,0,0.18)]"
            aria-label="En savoir plus sur notre réseau"
          >
            En savoir plus <i className="mdi mdi-arrow-right text-lg"></i>
          </a>
        </div>
      </section>

      {/* Bandeau rouge défilant */}
      <section className="w-full bg-rouge py-4 overflow-hidden">
        <div className="flex animate-scroll whitespace-nowrap">
          <div className="inline-block">
            {[...Array(8)].map((_, i) => (
              <span key={i} className="inline-block px-8 font-bold text-sm tracking-wider text-white">
                REJOIGNEZ LE RÉSEAU ALUMNI • RESTEZ CONNECTÉS • PARTAGEZ VOS EXPÉRIENCES
              </span>
            ))}
          </div>
          <div className="inline-block">
            {[...Array(8)].map((_, i) => (
              <span key={i + 8} className="inline-block px-8 font-bold text-sm tracking-wider text-white">
                REJOIGNEZ LE RÉSEAU ALUMNI • RESTEZ CONNECTÉS • PARTAGEZ VOS EXPÉRIENCES
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Section KPIs */}
      <section className="relative bg-[url('/assets/kpi.webp')] bg-cover bg-center py-[100px] px-[5%] max-w-none">
        {/* Overlay semi-transparent pour la lisibilité */}
        <div className="absolute inset-0 bg-black/30"></div>
        
        <div className="relative z-10 flex justify-around gap-5 text-center flex-wrap max-w-[1200px] mx-auto">
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
        </div>
      </section>
    </>
  );
};

export default Home;
