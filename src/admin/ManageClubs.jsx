import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Edit3, Plus, Search, Shapes, Trash2, UserRound, UsersRound } from "lucide-react";
import api from "../api/api";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import ApiErrorState from "../components/ApiErrorState";

function ManageClubs() {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState("");
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingClub, setEditingClub] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    facultyCoordinator: "",
    president: "",
    membersCount: "",
  });

  const token = localStorage.getItem("adminToken");

  const fetchClubs = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await api.get("/clubs");
      setClubs(res.data.clubs || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load clubs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClubs();
  }, []);

  const filteredClubs = useMemo(() => {
    return clubs.filter((club) =>
      club.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [clubs, search]);

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      facultyCoordinator: "",
      president: "",
      membersCount: "",
    });

    setEditingClub(null);
  };

  const handleCreateClub = async () => {
    try {
      setSaving(true);
      await api.post("/clubs", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Club created successfully!");

      resetForm();
      setShowModal(false);
      fetchClubs();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to create club");
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateClub = async () => {
    try {
      setSaving(true);
      await api.put(`/clubs/${editingClub._id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Club updated successfully!");

      resetForm();
      setShowModal(false);
      fetchClubs();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to update club");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteClub = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this club?"
    );

    if (!confirmDelete) return;

    try {
      setDeletingId(id);
      await api.delete(`/clubs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Club deleted successfully!");

      fetchClubs();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to delete club");
    } finally {
      setDeletingId("");
    }
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="ch-container py-10">
        <section className="ch-card p-7">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="ch-eyebrow">Admin</p>
              <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
                Manage Clubs
              </h1>
              <p className="mt-2 text-sm text-slate-500">
                Create, update, search, and remove campus clubs.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => {
                  resetForm();
                  setShowModal(true);
                }}
                className="ch-button-primary"
              >
                <Plus className="h-4 w-4" />
                Add Club
              </button>

              <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4">
                <Search className="h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search clubs..."
                  className="w-full bg-transparent py-3 outline-none sm:w-64"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8">
          {loading ? (
            <LoadingSpinner text="Loading clubs..." />
          ) : error ? (
            <ApiErrorState message={error} onRetry={fetchClubs} />
          ) : filteredClubs.length === 0 ? (
            <EmptyState message="No clubs found." />
          ) : (
            <div className="ch-card overflow-hidden">
              <div className="border-b border-slate-200 px-6 py-4">
                <p className="flex items-center gap-2 text-sm font-bold text-slate-600">
                  <Shapes className="h-4 w-4 text-indigo-600" />
                  Showing {filteredClubs.length} clubs
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-slate-50 text-left text-xs font-black uppercase tracking-wide text-slate-500">
                    <tr>
                      <th className="px-6 py-4">Club Name</th>
                      <th className="px-6 py-4">President</th>
                      <th className="px-6 py-4">Faculty</th>
                      <th className="px-6 py-4">Members</th>
                      <th className="px-6 py-4 text-center">Actions</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {filteredClubs.map((club) => (
                      <tr key={club._id} className="transition hover:bg-slate-50">
                        <td className="px-6 py-4 font-bold text-slate-950">{club.name}</td>
                        <td className="px-6 py-4 text-slate-600">
                          <span className="inline-flex items-center gap-2">
                            <UserRound className="h-4 w-4 text-indigo-600" />
                            {club.president}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-600">{club.facultyCoordinator}</td>
                        <td className="px-6 py-4 text-slate-600">
                          <span className="inline-flex items-center gap-2">
                            <UsersRound className="h-4 w-4 text-indigo-600" />
                            {club.membersCount}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex justify-center gap-2">
                            <button
                              className="inline-flex items-center gap-2 rounded-xl bg-indigo-50 px-4 py-2 font-bold text-indigo-600 transition hover:bg-indigo-100 disabled:cursor-not-allowed disabled:opacity-60"
                              disabled={Boolean(deletingId)}
                              onClick={() => {
                                setEditingClub(club);

                                setFormData({
                                  name: club.name,
                                  description: club.description,
                                  facultyCoordinator: club.facultyCoordinator,
                                  president: club.president,
                                  membersCount: club.membersCount,
                                });

                                setShowModal(true);
                              }}
                            >
                              <Edit3 className="h-4 w-4" />
                              Edit
                            </button>

                            <button
                              className="inline-flex items-center gap-2 rounded-xl bg-red-50 px-4 py-2 font-bold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                              onClick={() => handleDeleteClub(club._id)}
                              disabled={deletingId === club._id}
                            >
                              <Trash2 className="h-4 w-4" />
                              {deletingId === club._id ? "Deleting..." : "Delete"}
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
        </section>

        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 py-6 backdrop-blur-sm">
            <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[2rem] bg-white p-6 shadow-2xl">
              <h2 className="text-2xl font-black text-slate-950">
                {editingClub ? "Edit Club" : "Add Club"}
              </h2>

              <div className="mt-6 grid gap-4">
                <input
                  type="text"
                  placeholder="Club Name"
                  className="ch-input w-full"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value,
                    })
                  }
                />

                <textarea
                  placeholder="Description"
                  className="ch-input w-full resize-none"
                  rows="4"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description: e.target.value,
                    })
                  }
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    type="text"
                    placeholder="Faculty Coordinator"
                    className="ch-input w-full"
                    value={formData.facultyCoordinator}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        facultyCoordinator: e.target.value,
                      })
                    }
                  />

                  <input
                    type="text"
                    placeholder="President"
                    className="ch-input w-full"
                    value={formData.president}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        president: e.target.value,
                      })
                    }
                  />

                  <input
                    type="number"
                    placeholder="Members Count"
                    className="ch-input w-full sm:col-span-2"
                    value={formData.membersCount}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        membersCount: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => {
                    resetForm();
                    setShowModal(false);
                  }}
                  className="ch-button-secondary"
                >
                  Cancel
                </button>

                <button
                  onClick={() =>
                    editingClub
                      ? handleUpdateClub()
                      : handleCreateClub()
                  }
                  disabled={saving}
                  className="ch-button-primary"
                >
                  {saving
                    ? "Saving..."
                    : editingClub
                      ? "Update Club"
                      : "Create Club"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default ManageClubs;
