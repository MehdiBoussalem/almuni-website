import { useEffect, useState } from "react";
import AdminNav from "../../components/admin/AdminNav";
import { useNavigate } from "react-router-dom";
import Pagination from "../../components/Pagination";

const API_BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/";

interface Alumni {
  id: number;
  nom: string;
  prenom: string;
  ville?: string;
  pays?: string;
  poste?: string;
  entreprise?: string;
  promo?: string;
  linkedin?: string;
}

export default function AdminAlumnis() {
  const [alumnis, setAlumnis] = useState<Alumni[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState<Alumni | null>(null);
  const [addForm, setAddForm] = useState({
    nom: "",
    prenom: "",
    poste: "",
    entreprise: "",
    ville: "",
    pays: "",
    promo: "",
    linkedin: "",
  });
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchAlumnis();
  }, [page, pageSize, searchTerm]);

  // Reset pagination quand la recherche change
  useEffect(() => {
    setPage(1);
  }, [searchTerm]);

  const fetchAlumnis = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (searchTerm.trim()) params.set("q", searchTerm.trim());
      params.set("skip", String((page - 1) * pageSize));
      params.set("limit", String(pageSize));
      const res = await fetch(`${API_BASE}/alumnis/search?${params.toString()}`);
      const data = await res.json();
      setAlumnis(data.items || []);
      setTotal(data.total || 0);
    } catch (err) {
      console.error("Erreur", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddAlumni = async (data: {
    nom: string;
    prenom: string;
    poste?: string;
    entreprise?: string;
    ville?: string;
    pays?: string;
    promo?: string;
    linkedin?: string;
  }) => {
    try {
      const token = sessionStorage.getItem("adminToken");
      const res = await fetch(`${API_BASE}/alumnis/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${token}`,
        },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setShowAddModal(false);
        setAddForm({ nom: "", prenom: "", poste: "", entreprise: "", ville: "", pays: "", promo: "", linkedin: "" });
        fetchAlumnis();
      }
    } catch (err) {
      console.error("Erreur ajout alumni", err);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("adminToken");
    sessionStorage.removeItem("adminUser");
    navigate("/admin/login");
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Supprimer cet alumni ?")) return;

    try {
      const token = sessionStorage.getItem("adminToken");
      const res = await fetch(`${API_BASE}/alumnis/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Basic ${token}` },
      });
      if (res.ok) {
        fetchAlumnis();
      }
    } catch (err) {
      console.error("Erreur suppression", err);
    }
  };

  const handleUpdate = async () => {
    if (!editForm) return;

    try {
      const token = sessionStorage.getItem("adminToken");
      const res = await fetch(`${API_BASE}/alumnis/${editForm.id}`, {
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
        fetchAlumnis();
      }
    } catch (err) {
      console.error("Erreur mise à jour", err);
    }
  };

    // Résultats déjà filtrés et paginés côté API

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <AdminNav onLogout={handleLogout} />

      <div className="flex-1 py-12 px-[5%] max-w-[1700px] mx-auto w-full">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-title text-3xl text-bleu-fonce">Gestion Alumni</h1>
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

        <div className="mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher par nom ou poste"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bleu-fonce"
          />
        </div>

        {loading ? (
          <div className="text-center text-gray-500">Chargement...</div>
        ) : (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1100px] text-sm">
                <thead className="bg-bleu-fonce text-white">
                  <tr>
                    <th className="px-6 py-3 text-left">Nom</th>
                    <th className="px-6 py-3 text-left">Prénom</th>
                    <th className="px-6 py-3 text-left">Poste</th>
                    <th className="px-6 py-3 text-left">Entreprise</th>
                    <th className="px-6 py-3 text-left">Ville</th>
                    <th className="px-6 py-3 text-left">Pays</th>
                    <th className="px-6 py-3 text-left">Promo</th>
                    <th className="px-6 py-3 text-center">LinkedIn</th>
                    <th className="px-6 py-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {alumnis.map((alumni) => (
                    <tr key={alumni.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-6 py-3 font-semibold">{alumni.nom}</td>
                      <td className="px-6 py-3">{alumni.prenom}</td>
                      <td className="px-6 py-3">{alumni.poste || "-"}</td>
                      <td className="px-6 py-3">{alumni.entreprise || "-"}</td>
                      <td className="px-6 py-3">{alumni.ville || "-"}</td>
                      <td className="px-6 py-3">{alumni.pays || "-"}</td>
                      <td className="px-6 py-3">{alumni.promo || "-"}</td>
                      <td className="px-6 py-3 text-center">
                        {alumni.linkedin ? (
                          <a
                            href={alumni.linkedin}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#0A66C2] text-white text-xs font-bold hover:opacity-90"
                            aria-label="Ouvrir le profil LinkedIn"
                          >
                            in
                          </a>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-6 py-3 text-center whitespace-nowrap">
                        <div className="flex gap-2 justify-center min-w-[170px]">
                          <button
                            onClick={() => {
                              setEditForm(alumni);
                              setShowEditModal(true);
                            }}
                            className="px-3 py-1 bg-bleu-fonce text-white text-xs rounded hover:bg-rouge"
                          >
                            Éditer
                          </button>
                          <button
                            onClick={() => handleDelete(alumni.id)}
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
              <h2 className="text-2xl font-title text-bleu-fonce mb-4">Ajouter un Alumni</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!addForm.nom.trim() || !addForm.prenom.trim()) return;
                  const payload: any = {
                    nom: addForm.nom.trim(),
                    prenom: addForm.prenom.trim(),
                  };
                  ["poste", "entreprise", "ville", "pays", "promo", "linkedin"].forEach((k) => {
                    const v = (addForm as any)[k]?.trim();
                    if (v) payload[k] = v;
                  });
                  handleAddAlumni(payload);
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Nom *</label>
                    <input
                      value={addForm.nom}
                      onChange={(e) => setAddForm({ ...addForm, nom: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Prénom *</label>
                    <input
                      value={addForm.prenom}
                      onChange={(e) => setAddForm({ ...addForm, prenom: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Poste</label>
                    <input
                      value={addForm.poste}
                      onChange={(e) => setAddForm({ ...addForm, poste: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Entreprise</label>
                    <input
                      value={addForm.entreprise}
                      onChange={(e) => setAddForm({ ...addForm, entreprise: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Ville</label>
                    <input
                      value={addForm.ville}
                      onChange={(e) => setAddForm({ ...addForm, ville: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Pays</label>
                    <input
                      value={addForm.pays}
                      onChange={(e) => setAddForm({ ...addForm, pays: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                      placeholder="France"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Promo</label>
                    <input
                      value={addForm.promo}
                      onChange={(e) => setAddForm({ ...addForm, promo: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm text-gray-700 mb-1">LinkedIn</label>
                    <input
                      value={addForm.linkedin}
                      onChange={(e) => setAddForm({ ...addForm, linkedin: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                      placeholder="https://linkedin.com/in/..."
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

        {showEditModal && editForm && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-xl p-6">
              <h2 className="text-2xl font-title text-bleu-fonce mb-4">Modifier un Alumni</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleUpdate();
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Nom *</label>
                    <input
                      value={editForm.nom}
                      onChange={(e) => setEditForm({ ...editForm, nom: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Prénom *</label>
                    <input
                      value={editForm.prenom}
                      onChange={(e) => setEditForm({ ...editForm, prenom: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Poste</label>
                    <input
                      value={editForm.poste || ""}
                      onChange={(e) => setEditForm({ ...editForm, poste: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Entreprise</label>
                    <input
                      value={editForm.entreprise || ""}
                      onChange={(e) => setEditForm({ ...editForm, entreprise: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Ville</label>
                    <input
                      value={editForm.ville || ""}
                      onChange={(e) => setEditForm({ ...editForm, ville: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Pays</label>
                    <input
                      value={editForm.pays || ""}
                      onChange={(e) => setEditForm({ ...editForm, pays: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Promo</label>
                    <input
                      value={editForm.promo || ""}
                      onChange={(e) => setEditForm({ ...editForm, promo: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm text-gray-700 mb-1">LinkedIn</label>
                    <input
                      value={editForm.linkedin || ""}
                      onChange={(e) => setEditForm({ ...editForm, linkedin: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                      placeholder="https://linkedin.com/in/..."
                    />
                  </div>
                </div>
                <div className="mt-6 flex justify-end gap-2">
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
