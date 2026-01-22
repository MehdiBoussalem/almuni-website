import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Force le mode clair au montage (on retire le toggle jour/nuit)
  useEffect(() => {
    document.documentElement.classList.remove('dark');
    localStorage.removeItem('darkMode');
  }, []);

  return (
    <header
      className={`sticky top-0 z-[9999] flex items-center justify-between px-[5%] py-2 transition-all duration-400 ${
        scrolled 
          ? 'bg-white dark:bg-slate-900 shadow-md' 
          : 'bg-gradient-to-br from-bordeau to-rouge dark:bg-slate-950'
      }`}
    >
      <Link to="/">
        <img
          src="/assets/logo_alumni.png"
          alt="Logo Alumni"
          className="h-[65px] w-auto"
        />
      </Link>

      <nav className="flex-grow">
        <ul className="flex justify-center list-none gap-[50px]">
          <li>
            <Link
              to="/"
              className={`no-underline font-bold text-lg transition-colors ${
                scrolled 
                  ? 'text-bleu-fonce dark:text-bleu-clair hover:text-rouge dark:hover:text-rouge' 
                  : 'text-white hover:text-rouge'
              }`}
            >
              Accueil
            </Link>
          </li>
          <li>
            <Link
              to="/evenement"
              className={`no-underline font-bold text-lg transition-colors ${
                scrolled 
                  ? 'text-bleu-fonce dark:text-bleu-clair hover:text-rouge dark:hover:text-rouge' 
                  : 'text-white hover:text-rouge'
              }`}
            >
              Alumni 2026
            </Link>
          </li>
          <li>
            <Link
              to="/notre-reseau"
              className={`no-underline font-bold text-lg transition-colors ${
                scrolled 
                  ? 'text-bleu-fonce dark:text-bleu-clair hover:text-rouge dark:hover:text-rouge' 
                  : 'text-white hover:text-rouge'
              }`}
            >
              Notre réseau
            </Link>
          </li>
          <li>
            <Link
              to="/stages"
              className={`no-underline font-bold text-lg transition-colors ${
                scrolled 
                  ? 'text-bleu-fonce dark:text-bleu-clair hover:text-rouge dark:hover:text-rouge' 
                  : 'text-white hover:text-rouge'
              }`}
            >
              Stages
            </Link>
          </li>
          <li>
            <Link
              to="/archives"
              className={`no-underline font-bold text-lg transition-colors ${
                scrolled 
                  ? 'text-bleu-fonce dark:text-bleu-clair hover:text-rouge dark:hover:text-rouge' 
                  : 'text-white hover:text-rouge'
              }`}
            >
              Archives
            </Link>
          </li>
        </ul>
      </nav>

    </header>
  );
};

export default Header;
