import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
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

// Admin imports
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminAlumnis from './pages/admin/AdminAlumnis';
import AdminStages from './pages/admin/AdminStages';
import AdminInscriptions from './pages/admin/AdminInscriptions';
import AdminProtectedRoute from './components/admin/ProtectedRoute';

function AppRoutes() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdmin && <Header />}
      <main className="flex-grow">
        <Routes>
          {/* Routes publiques */}
          <Route path="/" element={<Home />} />
          <Route path="/evenement" element={<Evenement />} />
          <Route path="/notre-reseau" element={<NotreReseau />} />
          <Route path="/stages" element={<StagePage />} />
          <Route path="/archives" element={<ArchivesIndex />} />
          <Route path="/archives/:year" element={<PromoPage />} />
          <Route path="/tshirt" element={<Tshirt />} />
          <Route path="/soiree" element={<Soiree />} />

          {/* Routes admin */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <AdminProtectedRoute>
                <AdminDashboard />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/alumnis"
            element={
              <AdminProtectedRoute>
                <AdminAlumnis />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/stages"
            element={
              <AdminProtectedRoute>
                <AdminStages />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/inscriptions"
            element={
              <AdminProtectedRoute>
                <AdminInscriptions />
              </AdminProtectedRoute>
            }
          />
          {/* T-shirts supprimé */}
        </Routes>
      </main>
      {!isAdmin && <Footer />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
