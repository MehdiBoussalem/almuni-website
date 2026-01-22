import { useEffect, useState } from "react";
import AdminNav from "../../components/admin/AdminNav";
import { useNavigate } from "react-router-dom";
import Pagination from "../../components/Pagination";

const API_BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

interface Stage {
  id: number;
  titre: string;
  entreprise: string;
  ville: string;
  type: string;
  date_publication: string;
}

export default function AdminStages() {
  const [stages, setStages] = useState<Stage[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [total, setTotal] = useState(0);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState<Stage | null>(null);
  const [addForm, setAddForm] = useState({
    titre: "",
    entreprise: "",
    ville: "",
    type: "Stage",
    date_publication: new Date().toISOString().split('T')[0],
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchStages();
  }, [page, pageSize, searchTerm, typeFilter]);

  // Reset pagination quand filtres changent
  useEffect(() => {
    setPage(1);
  }, [searchTerm, typeFilter]);

  const fetchStages = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (searchTerm.trim()) params.set("q", searchTerm.trim());
      if (typeFilter) params.set("type", typeFilter);
      params.set("skip", String((page - 1) * pageSize));
      params.set("limit", String(pageSize));
      const res = await fetch(`${API_BASE}/stages/search?${params.toString()}`);
      const data = await res.json();
      setStages(data.items || []);
      setTotal(data.total || 0);
    } catch (err) {
      console.error("Erreur", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("adminToken");
    sessionStorage.removeItem("adminUser");
    navigate("/admin/login");
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Supprimer cet offre ?")) return;

    try {
      const token = sessionStorage.getItem("adminToken");
      const res = await fetch(`${API_BASE}/stages/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Basic ${token}` },
      });
      if (res.ok) {
        fetchStages();
      }
    } catch (err) {
      console.error("Erreur suppression", err);
    }
  };

  const handleUpdate = async () => {
    if (!editForm) return;

    try {
      const token = sessionStorage.getItem("adminToken");
      const res = await fetch(`${API_BASE}/stages/${editForm.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${token}`,
        },
        body: JSON.stringify(editForm),
      });
      if (res.ok) {
        setShowEditModal(false);
        setEditForm(null);
        fetchStages();
      }
    } catch (err) {
      console.error("Erreur mise à jour", err);
    }
  };

  const handleAddStage = async (data: { titre: string; entreprise: string; ville: string; type: string; date_publication: string }) => {
    try {
      const token = sessionStorage.getItem("adminToken");
      const res = await fetch(`${API_BASE}/stages/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${token}`,
        },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        fetchStages();
      }
    } catch (err) {
      console.error("Erreur ajout stage", err);
    }
  };

  // Résultats déjà filtrés et paginés côté API

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <AdminNav onLogout={handleLogout} />

      <div className="flex-1 py-12 px-[5%] max-w-[1700px] mx-auto w-full">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-title text-3xl text-bleu-fonce">Gestion Stages & Alternances</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">{total} résultat(s)</span>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-rouge text-white font-semibold rounded-lg hover:bg-bordeau transition-colors"
            >
              Ajouter
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher par titre ou entreprise"
            className="md:col-span-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bleu-fonce"
          />
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-bleu-fonce"
          >
            <option value="">Tous</option>
            <option value="Stage">Stage</option>
            <option value="Alternance">Alternance</option>
          </select>
        </div>

        {loading ? (
          <div className="text-center text-gray-500">Chargement...</div>
        ) : (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1100px] text-sm">
                <thead className="bg-rouge text-white">
                  <tr>
                    <th className="px-6 py-3 text-left">Titre</th>
                    <th className="px-6 py-3 text-left">Entreprise</th>
                    <th className="px-6 py-3 text-left">Ville</th>
                    <th className="px-6 py-3 text-left">Type</th>
                    <th className="px-6 py-3 text-left">Date</th>
                    <th className="px-6 py-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {stages.map((stage) => (
                    <tr key={stage.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-6 py-3 font-semibold">{stage.titre}</td>
                      <td className="px-6 py-3">{stage.entreprise}</td>
                      <td className="px-6 py-3">{stage.ville}</td>
                      <td className="px-6 py-3">
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${
                            stage.type === "Alternance" ? "bg-purple-100 text-purple-700" : "bg-green-100 text-green-700"
                          }`}
                        >
                          {stage.type}
                        </span>
                      </td>
                      <td className="px-6 py-3">{new Date(stage.date_publication).toLocaleDateString()}</td>
                      <td className="px-6 py-3 text-center whitespace-nowrap">
                        <div className="flex gap-2 justify-center min-w-[170px]">
                          <button
                            onClick={() => {
                              setEditForm(stage);
                              setShowEditModal(true);
                            }}
                            className="px-3 py-1 bg-bleu-fonce text-white text-xs rounded hover:bg-rouge"
                          >
                            Éditer
                          </button>
                          <button
                            onClick={() => handleDelete(stage.id)}
                            className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700"
                          >
                            Supprimer
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination
              total={total}
              page={page}
              pageSize={pageSize}
              onPageChange={setPage}
              onPageSizeChange={(s) => {
                setPageSize(s);
                setPage(1);
              }}
              className="px-4"
            />
          </div>
        )}

        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-xl p-6">
              <h2 className="text-2xl font-title text-bleu-fonce mb-4">Ajouter une Offre</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!addForm.titre.trim() || !addForm.entreprise.trim() || !addForm.ville.trim() || !addForm.type)
                    return;
                  handleAddStage({
                    titre: addForm.titre.trim(),
                    entreprise: addForm.entreprise.trim(),
                    ville: addForm.ville.trim(),
                    type: addForm.type,
                    date_publication: addForm.date_publication,
                  });
                  setShowAddModal(false);
                  setAddForm({ titre: "", entreprise: "", ville: "", type: "Stage", date_publication: new Date().toISOString().split('T')[0] });
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm text-gray-700 mb-1">Titre *</label>
                    <input
                      value={addForm.titre}
                      onChange={(e) => setAddForm({ ...addForm, titre: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Entreprise *</label>
                    <input
                      value={addForm.entreprise}
                      onChange={(e) => setAddForm({ ...addForm, entreprise: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Ville *</label>
                    <input
                      value={addForm.ville}
                      onChange={(e) => setAddForm({ ...addForm, ville: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm text-gray-700 mb-1">Type *</label>
                    <select
                      value={addForm.type}
                      onChange={(e) => setAddForm({ ...addForm, type: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                    >
                      <option value="Stage">Stage</option>
                      <option value="Alternance">Alternance</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm text-gray-700 mb-1">Date de publication *</label>
                    <input
                      type="date"
                      value={addForm.date_publication || new Date().toISOString().split('T')[0]}
                      onChange={(e) => setAddForm({ ...addForm, date_publication: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                      required
                    />
                  </div>
                </div>
                <div className="mt-6 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                  >
                    Annuler
                  </button>
                  <button type="submit" className="px-4 py-2 bg-rouge text-white rounded-lg hover:bg-bordeau">
                    Ajouter
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal d'édition */}
        {showEditModal && editForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full">
              <h2 className="text-2xl font-bold mb-4 text-bleu-fonce">Modifier le stage</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleUpdate();
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Titre</label>
                  <input
                    type="text"
                    value={editForm.titre}
                    onChange={(e) => setEditForm({ ...editForm, titre: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bleu-fonce focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Entreprise</label>
                  <input
                    type="text"
                    value={editForm.entreprise}
                    onChange={(e) => setEditForm({ ...editForm, entreprise: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bleu-fonce focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ville</label>
                  <input
                    type="text"
                    value={editForm.ville}
                    onChange={(e) => setEditForm({ ...editForm, ville: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bleu-fonce focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select
                    value={editForm.type}
                    onChange={(e) => setEditForm({ ...editForm, type: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bleu-fonce focus:border-transparent"
                    required
                  >
                    <option value="Stage">Stage</option>
                    <option value="Alternance">Alternance</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date de publication</label>
                  <input
                    type="date"
                    value={editForm.date_publication?.split('T')[0] || ''}
                    onChange={(e) => setEditForm({ ...editForm, date_publication: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-bleu-fonce focus:border-transparent"
                    required
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowEditModal(false);
                      setEditForm(null);
                    }}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                  >
                    Annuler
                  </button>
                  <button type="submit" className="px-4 py-2 bg-rouge text-white rounded-lg hover:bg-bordeau">
                    Sauvegarder
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
