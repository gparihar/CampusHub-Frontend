import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CalendarDays, ClipboardList, Search, Trash2 } from "lucide-react";
import api from "../api/api";
import LoadingSpinner from "../components/LoadingSpinner";
import ApiErrorState from "../components/ApiErrorState";
import EmptyState from "../components/EmptyState";

function ManageRegistrations() {
  const [registrations, setRegistrations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState("");

  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await api.get("/registrations/admin", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setRegistrations(res.data.registrations || []);
    } catch (error) {
      console.error(error);
      setError(
        error.response?.data?.message ||
          "Failed to fetch registrations"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this registration?")) return;

    try {
      setDeletingId(id);
      await api.delete(`/registrations/admin/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Registration deleted successfully!");
      fetchRegistrations();
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message ||
          "Failed to delete registration"
      );
    } finally {
      setDeletingId("");
    }
  };

  const filteredRegistrations = registrations.filter((registration) => {
    const search = searchTerm.toLowerCase();

    return (
      registration.studentName?.toLowerCase().includes(search) ||
      registration.studentEmail?.toLowerCase().includes(search) ||
      registration.eventTitle?.toLowerCase().includes(search)
    );
  });

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 p-10">
        <LoadingSpinner text="Loading registrations..." />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="ch-container py-10">
        <section className="ch-card p-7">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="ch-eyebrow">Admin</p>
              <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
                Manage Registrations
              </h1>
              <p className="mt-2 text-sm text-slate-500">
                Monitor event registrations and remove entries when needed.
              </p>
            </div>

            <div className="flex w-full items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 lg:w-96">
              <Search className="h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search registrations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent py-3 outline-none"
              />
            </div>
          </div>
        </section>

        <section className="mt-8">
          {error ? (
            <ApiErrorState message={error} onRetry={fetchRegistrations} />
          ) : filteredRegistrations.length === 0 ? (
            <EmptyState message="No registrations found." />
          ) : (
            <div className="ch-card overflow-hidden">
              <div className="border-b border-slate-200 px-6 py-4">
                <p className="flex items-center gap-2 text-sm font-bold text-slate-600">
                  <ClipboardList className="h-4 w-4 text-indigo-600" />
                  Showing {filteredRegistrations.length} registrations
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-slate-50 text-left text-xs font-black uppercase tracking-wide text-slate-500">
                    <tr>
                      <th className="px-6 py-4">Student</th>
                      <th className="px-6 py-4">Email</th>
                      <th className="px-6 py-4">Event</th>
                      <th className="px-6 py-4">Event Date</th>
                      <th className="px-6 py-4 text-center">Action</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {filteredRegistrations.map((registration) => (
                      <tr key={registration._id} className="transition hover:bg-slate-50">
                        <td className="px-6 py-4 font-bold text-slate-950">{registration.studentName}</td>
                        <td className="px-6 py-4 text-slate-600">{registration.studentEmail}</td>
                        <td className="px-6 py-4 text-slate-600">{registration.eventTitle}</td>
                        <td className="px-6 py-4 text-slate-600">
                          <span className="inline-flex items-center gap-2">
                            <CalendarDays className="h-4 w-4 text-indigo-600" />
                            {registration.eventDate
                              ? new Date(registration.eventDate).toLocaleDateString()
                              : "N/A"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button
                            onClick={() => handleDelete(registration._id)}
                            disabled={deletingId === registration._id}
                            className="inline-flex items-center gap-2 rounded-xl bg-red-50 px-4 py-2 font-bold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            <Trash2 className="h-4 w-4" />
                            {deletingId === registration._id ? "Deleting..." : "Delete"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default ManageRegistrations;
