import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import {
  CalendarDays,
  Edit3,
  MapPin,
  Plus,
  Search,
  Tag,
  Trash2,
  UsersRound,
} from "lucide-react";
import api from "../api/api";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import ApiErrorState from "../components/ApiErrorState";

function ManageEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState("");
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    date: "",
    maxParticipants: "",
  });

  const token = localStorage.getItem("adminToken");

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await api.get("/events");
      setEvents(res.data.events || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const filteredEvents = useMemo(() => {
    return events.filter((event) =>
      event.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [events, search]);

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category: "",
      location: "",
      date: "",
      maxParticipants: "",
    });

    setEditingEvent(null);
  };

  const handleCreateEvent = async () => {
    try {
      setSaving(true);
      await api.post("/events", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Event created successfully!");

      resetForm();
      setShowModal(false);
      fetchEvents();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to create event");
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateEvent = async () => {
    try {
      setSaving(true);
      await api.put(`/events/${editingEvent._id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Event updated successfully!");

      resetForm();
      setShowModal(false);
      fetchEvents();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to update event");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteEvent = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (!confirmDelete) return;

    try {
      setDeletingId(id);
      await api.delete(`/events/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Event deleted successfully!");

      fetchEvents();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to delete event");
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
                Manage Events
              </h1>
              <p className="mt-2 text-sm text-slate-500">
                Create, update, search, and remove campus events.
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
                Add Event
              </button>

              <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4">
                <Search className="h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search events..."
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
            <LoadingSpinner text="Loading events..." />
          ) : error ? (
            <ApiErrorState message={error} onRetry={fetchEvents} />
          ) : filteredEvents.length === 0 ? (
            <EmptyState message="No events found." />
          ) : (
            <div className="ch-card overflow-hidden">
              <div className="border-b border-slate-200 px-6 py-4">
                <p className="flex items-center gap-2 text-sm font-bold text-slate-600">
                  <CalendarDays className="h-4 w-4 text-indigo-600" />
                  Showing {filteredEvents.length} events
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-slate-50 text-left text-xs font-black uppercase tracking-wide text-slate-500">
                    <tr>
                      <th className="px-6 py-4">Title</th>
                      <th className="px-6 py-4">Category</th>
                      <th className="px-6 py-4">Date</th>
                      <th className="px-6 py-4">Location</th>
                      <th className="px-6 py-4">Max</th>
                      <th className="px-6 py-4 text-center">Actions</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {filteredEvents.map((event) => (
                      <tr key={event._id} className="transition hover:bg-slate-50">
                        <td className="px-6 py-4 font-bold text-slate-950">{event.title}</td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700">
                            <Tag className="h-3.5 w-3.5" />
                            {event.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-600">{new Date(event.date).toLocaleDateString()}</td>
                        <td className="px-6 py-4 text-slate-600">
                          <span className="inline-flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-indigo-600" />
                            {event.location}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-600">
                          <span className="inline-flex items-center gap-2">
                            <UsersRound className="h-4 w-4 text-indigo-600" />
                            {event.maxParticipants}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex justify-center gap-2">
                            <button
                              className="inline-flex items-center gap-2 rounded-xl bg-indigo-50 px-4 py-2 font-bold text-indigo-600 transition hover:bg-indigo-100 disabled:cursor-not-allowed disabled:opacity-60"
                              disabled={Boolean(deletingId)}
                              onClick={() => {
                                setEditingEvent(event);

                                setFormData({
                                  title: event.title,
                                  description: event.description,
                                  category: event.category,
                                  location: event.location,
                                  date: event.date.split("T")[0],
                                  maxParticipants: event.maxParticipants,
                                });

                                setShowModal(true);
                              }}
                            >
                              <Edit3 className="h-4 w-4" />
                              Edit
                            </button>

                            <button
                              className="inline-flex items-center gap-2 rounded-xl bg-red-50 px-4 py-2 font-bold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                              onClick={() => handleDeleteEvent(event._id)}
                              disabled={deletingId === event._id}
                            >
                              <Trash2 className="h-4 w-4" />
                              {deletingId === event._id ? "Deleting..." : "Delete"}
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
                {editingEvent ? "Edit Event" : "Add Event"}
              </h2>

              <div className="mt-6 grid gap-4">
                <input
                  type="text"
                  placeholder="Title"
                  className="ch-input w-full"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      title: e.target.value,
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
                    placeholder="Category"
                    className="ch-input w-full"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        category: e.target.value,
                      })
                    }
                  />

                  <input
                    type="text"
                    placeholder="Location"
                    className="ch-input w-full"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        location: e.target.value,
                      })
                    }
                  />

                  <input
                    type="date"
                    className="ch-input w-full"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        date: e.target.value,
                      })
                    }
                  />

                  <input
                    type="number"
                    placeholder="Max Participants"
                    className="ch-input w-full"
                    value={formData.maxParticipants}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        maxParticipants: e.target.value,
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
                    editingEvent
                      ? handleUpdateEvent()
                      : handleCreateEvent()
                  }
                  disabled={saving}
                  className="ch-button-primary"
                >
                  {saving
                    ? "Saving..."
                    : editingEvent
                      ? "Update Event"
                      : "Create Event"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default ManageEvents;
