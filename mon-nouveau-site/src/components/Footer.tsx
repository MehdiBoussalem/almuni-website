import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="relative bg-bleu-fonce text-white py-10 px-[5%] grid grid-cols-[1fr_auto_1fr] items-center gap-5">
      {/* Colonne gauche: Contact */}
      <div className="justify-self-start">
        <div className="flex flex-col gap-2 text-[0.95rem] leading-relaxed opacity-95">
          <div className="flex items-center gap-2">
            <i className="mdi mdi-email"></i>
            <span>ufr-ingemedia@univ-tln.fr</span>
          </div>
          <div className="flex items-center gap-2">
            <i className="mdi mdi-map-marker"></i>
            <span>70 Av. Roger Devoucoux,83000 Toulon</span>
          </div>
          <div className="flex items-center gap-2">
            <i className="mdi mdi-phone"></i>
            <span>04.83.36.63.28</span>
          </div>
        </div>
      </div>

      {/* Colonne centrale: Réseaux sociaux + Copyright */}
      <div className="justify-self-center text-center">
        <ul className="flex justify-center gap-[26px] list-none m-0 mb-4 p-0">
          <li>
            <a
              href="https://www.facebook.com/IngemediaAlumni/?locale=fr_FR"
              aria-label="Facebook"
              className="text-white no-underline text-[1.8rem] transition-all duration-300 inline-block hover:text-bleu-clair hover:scale-110"
            >
              <i className="mdi mdi-facebook"></i>
            </a>
          </li>
          <li>
            <a
              href="https://x.com/IngemediaAlumni"
              aria-label="Twitter"
              className="text-white no-underline text-[1.8rem] transition-all duration-300 inline-block hover:text-bleu-clair hover:scale-110"
            >
              <i className="mdi mdi-twitter"></i>
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/ingemedia.alumni/"
              aria-label="Instagram"
              className="text-white no-underline text-[1.8rem] transition-all duration-300 inline-block hover:text-bleu-clair hover:scale-110"
            >
              <i className="mdi mdi-instagram"></i>
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/ing%C3%A9m%C3%A9dia-alumni"
              aria-label="LinkedIn"
              className="text-white no-underline text-[1.8rem] transition-all duration-300 inline-block hover:text-bleu-clair hover:scale-110"
            >
              <i className="mdi mdi-linkedin"></i>
            </a>
          </li>
        </ul>
        <p className="text-sm opacity-85 m-0">
          &copy; 2026 Alumni Ingemedia. Tous droits réservés.
        </p>
      </div>

      {/* Colonne droite: Logo Université */}
      <div className="justify-self-end">
        <img
          src="/assets/Logo_Universite_de_Toulon.png"
          alt="Université de Toulon"
          className="w-40 h-auto block"
        />
      </div>
    </footer>
  );
};

export default Footer;
