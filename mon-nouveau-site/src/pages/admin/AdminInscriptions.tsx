import { useEffect, useState } from "react";
import AdminNav from "../../components/admin/AdminNav";
import { useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

interface Inscrit {
  id: number;
  nom: string;
  prenom: string;
  mail: string;
  statut: string;
  autorisation_captation: string;
}

export default function AdminInscriptions() {
  const [inscrits, setInscrits] = useState<Inscrit[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [addForm, setAddForm] = useState({
    nom: "",
    prenom: "",
    mail: "",
    statut: "",
    autorisation_captation: "",
  });
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState<Inscrit | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchInscrits();
  }, []);

  const fetchInscrits = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/inscrits-soiree/?limit=10000`);
      const data = await res.json();
      setInscrits(data);
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

  const handleExportCSV = () => {
    if (inscrits.length === 0) return;

    const headers = ["Nom", "Prénom", "Email", "Statut", "Captation", "Date"];
    const rows = inscrits.map((i) => [i.nom, i.prenom, i.mail, i.statut, i.autorisation_captation]);

    const csv = [headers, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `inscrits-soiree-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  const handleAddInscrit = async (data: {
    nom: string;
    prenom: string;
    mail: string;
    statut?: string;
    autorisation_captation?: string;
  }) => {
    try {
      const token = sessionStorage.getItem("adminToken");
      const res = await fetch(`${API_BASE}/inscrits-soiree/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${token}`,
        },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setShowAddModal(false);
        setAddForm({ nom: "", prenom: "", mail: "", statut: "", autorisation_captation: "" });
        fetchInscrits();
      }
    } catch (err) {
      console.error("Erreur ajout inscrit", err);
    }
  };

  const handleDeleteInscrit = async (id: number) => {
    if (!window.confirm("Supprimer cet inscrit ?")) return;
    try {
      const token = sessionStorage.getItem("adminToken");
      const res = await fetch(`${API_BASE}/inscrits-soiree/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Basic ${token}` },
      });
      if (res.ok) {
        fetchInscrits();
      }
    } catch (err) {
      console.error("Erreur suppression inscrit", err);
    }
  };

  const handleUpdateInscrit = async () => {
    if (!editForm) return;
    try {
      const token = sessionStorage.getItem("adminToken");
      const res = await fetch(`${API_BASE}/inscrits-soiree/${editForm.id}`, {
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
        fetchInscrits();
      }
    } catch (err) {
      console.error("Erreur mise à jour inscrit", err);
    }
  };

  const filteredInscrits = inscrits.filter((i) => {
    const search = searchTerm.toLowerCase();
    return (
      `${i.nom} ${i.prenom}`.toLowerCase().includes(search) ||
      i.mail.toLowerCase().includes(search) ||
      i.statut.toLowerCase().includes(search)
    );
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <AdminNav onLogout={handleLogout} />

      <div className="flex-1 py-12 px-[5%] max-w-[1700px] mx-auto w-full">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-title text-3xl text-bleu-fonce">Inscrits Soirée</h1>
          <div className="flex gap-2">
            <span className="px-4 py-2 bg-green-100 text-green-700 font-semibold rounded-lg">{filteredInscrits.length} inscrit(s)</span>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-rouge text-white font-semibold rounded-lg hover:bg-bordeau transition-colors"
            >
                Ajouter
            </button>
            <button
              onClick={handleExportCSV}
              className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
            >
              📥 Exporter CSV
            </button>
          </div>
        </div>

        <div className="mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher par nom, email ou statut"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-bleu-fonce"
          />
        </div>

        {loading ? (
          <div className="text-center text-gray-500">Chargement...</div>
        ) : (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1100px] text-sm">
                <thead className="bg-green-600 text-white">
                  <tr>
                    <th className="px-6 py-3 text-left">Nom</th>
                    <th className="px-6 py-3 text-left">Prénom</th>
                    <th className="px-6 py-3 text-left">Email</th>
                    <th className="px-6 py-3 text-left">Statut</th>
                    <th className="px-6 py-3 text-center">Photo</th>
                    <th className="px-6 py-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInscrits.map((inscrit) => (
                    <tr key={inscrit.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-6 py-3 font-semibold">{inscrit.nom}</td>
                      <td className="px-6 py-3">{inscrit.prenom}</td>
                      <td className="px-6 py-3 text-blue-600">{inscrit.mail}</td>
                      <td className="px-6 py-3">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-xs font-semibold">
                          {inscrit.statut}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-center">
                        <span
                          className={`px-3 py-1 rounded text-xs font-semibold ${
                            inscrit.autorisation_captation === "Oui"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {inscrit.autorisation_captation}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-center whitespace-nowrap">
                        <div className="flex gap-2 justify-center min-w-[170px]">
                          <button
                            onClick={() => {
                              setEditForm(inscrit);
                              setShowEditModal(true);
                            }}
                            className="px-3 py-1 bg-bleu-fonce text-white text-xs rounded hover:bg-rouge"
                          >
                            Éditer
                          </button>
                          <button
                            onClick={() => handleDeleteInscrit(inscrit.id)}
                            className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700"
                          >
                            Retirer
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-xl p-6">
              <h2 className="text-2xl font-title text-bleu-fonce mb-4">Ajouter un Inscrit</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!addForm.nom.trim() || !addForm.prenom.trim() || !addForm.mail.trim()) return;
                  handleAddInscrit({
                    nom: addForm.nom.trim(),
                    prenom: addForm.prenom.trim(),
                    mail: addForm.mail.trim(),
                    statut: addForm.statut.trim() || undefined,
                    autorisation_captation: addForm.autorisation_captation.trim() || undefined,
                  });
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
                  <div className="md:col-span-2">
                    <label className="block text-sm text-gray-700 mb-1">Email *</label>
                    <input
                      type="email"
                      value={addForm.mail}
                      onChange={(e) => setAddForm({ ...addForm, mail: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Statut</label>
                    <select
                      value={addForm.statut}
                      onChange={(e) => setAddForm({ ...addForm, statut: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg bg-white"
                    >
                      <option value="">—</option>
                      <option value="Etudiant">Etudiant</option>
                      <option value="Ancien etudiant">Ancien etudiant</option>
                      <option value="Autre">Autre</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Autorisation photo</label>
                    <select
                      value={addForm.autorisation_captation}
                      onChange={(e) => setAddForm({ ...addForm, autorisation_captation: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                    >
                      <option value="">—</option>
                      <option value="Oui">Oui</option>
                      <option value="Non">Non</option>
                    </select>
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
              <h2 className="text-2xl font-title text-bleu-fonce mb-4">Modifier un Inscrit</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleUpdateInscrit();
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
                  <div className="md:col-span-2">
                    <label className="block text-sm text-gray-700 mb-1">Email *</label>
                    <input
                      type="email"
                      value={editForm.mail}
                      onChange={(e) => setEditForm({ ...editForm, mail: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Statut</label>
                    <select
                      value={editForm.statut}
                      onChange={(e) => setEditForm({ ...editForm, statut: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg bg-white"
                    >
                      <option value="">—</option>
                      <option value="Etudiant">Etudiant</option>
                      <option value="Ancien etudiant">Ancien etudiant</option>
                      <option value="Autre">Autre</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Autorisation photo</label>
                    <select
                      value={editForm.autorisation_captation}
                      onChange={(e) => setEditForm({ ...editForm, autorisation_captation: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg bg-white"
                    >
                      <option value="">—</option>
                      <option value="Oui">Oui</option>
                      <option value="Non">Non</option>
                    </select>
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
