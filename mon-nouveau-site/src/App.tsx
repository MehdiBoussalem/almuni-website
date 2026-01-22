import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Evenement from './pages/Evenement.tsx';
import NotreReseau from './pages/NotreReseau';
import ArchivesIndex from './pages/ArchivesIndex';
import PromoPage from './pages/PromoPage';
import Tshirt from './pages/Tshirt';
import Soiree from './pages/Soiree';
import StagePage from './pages/Stage';

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/evenement" element={<Evenement />} />
            <Route path="/notre-reseau" element={<NotreReseau />} />
            <Route path="/stages" element={<StagePage />} />
            <Route path="/archives" element={<ArchivesIndex />} />
            <Route path="/archives/:year" element={<PromoPage />} />
            <Route path="/tshirt" element={<Tshirt />} />
            <Route path="/soiree" element={<Soiree />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
