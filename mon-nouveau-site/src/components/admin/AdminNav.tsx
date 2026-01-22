import { useNavigate } from "react-router-dom";

interface AdminNavProps {
  onLogout: () => void;
}

export default function AdminNav({ onLogout }: AdminNavProps) {
  const navigate = useNavigate();
  const username = sessionStorage.getItem("adminUser") || "Admin";

  return (
    <nav className="bg-bleu-fonce text-white shadow-lg">
      <div className="px-[5%] max-w-[1400px] mx-auto flex items-center justify-between h-16">
        <div className="flex items-center gap-8">
          <button onClick={() => navigate("/admin/dashboard")} className="font-title text-xl hover:text-rouge transition-colors cursor-pointer">
            Dashboard
          </button>
          <div className="flex gap-4 text-sm">
            <button onClick={() => navigate("/admin/alumnis")} className="hover:text-rouge transition-colors">
              Alumni
            </button>
            <button onClick={() => navigate("/admin/stages")} className="hover:text-rouge transition-colors">
              Stages
            </button>
            <button onClick={() => navigate("/admin/inscriptions")} className="hover:text-rouge transition-colors">
              Inscriptions
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm">👤 {username}</span>
          <button
            onClick={onLogout}
            className="px-3 py-1 bg-rouge text-white text-sm rounded hover:bg-bordeau transition-colors"
          >
            Déconnexion
          </button>
          <button
            onClick={() => navigate("/")}
            className="px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700 transition-colors"
          >
            ← Site
          </button>
        </div>
      </div>
    </nav>
  );
}
