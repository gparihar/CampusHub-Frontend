import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { CalendarDays, MapPin, Tag, TicketCheck } from "lucide-react";
import api from "../api/api";
import LoadingSpinner from "../components/LoadingSpinner";
import ApiErrorState from "../components/ApiErrorState";
import EmptyState from "../components/EmptyState";

function MyEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState("");

  useEffect(() => {
    fetchMyEvents();
  }, []);

  const fetchMyEvents = async () => {
    try {
      setLoading(true);
      setError("");
      const token = localStorage.getItem("campushub-token");

      const res = await api.get("/registrations/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setEvents(res.data.registrations);
    } catch (error) {
      console.error(error);
      setError("Failed to load registered events");
    } finally {
      setLoading(false);
    }
  };

  const cancelRegistration = async (registrationId) => {
    try {
      setDeletingId(registrationId);
      const token = localStorage.getItem("campushub-token");

      await api.delete(`/registrations/${registrationId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setEvents((prev) =>
        prev.filter((item) => item._id !== registrationId)
      );

      toast.success("Registration cancelled.");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to cancel registration."
      );
    } finally {
      setDeletingId("");
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-50">
        <LoadingSpinner text="Loading events..." />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="ch-container py-12">
        <section className="ch-card p-8">
          <p className="ch-eyebrow">My CampusHub</p>
          <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-950">
            My Events
          </h1>
          <p className="mt-2 text-slate-500">
            View and manage your registered events.
          </p>
        </section>

        {error ? (
          <div className="mt-8">
            <ApiErrorState message={error} onRetry={fetchMyEvents} />
          </div>
        ) : events.length > 0 ? (
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {events.map((registration) => {
              const event = registration.event;

              return (
                <div key={registration._id} className="ch-card ch-card-hover p-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                    <TicketCheck className="h-7 w-7" />
                  </div>

                  <h2 className="mt-5 text-xl font-black text-slate-950">
                    {event.title}
                  </h2>

                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">
                    {event.description}
                  </p>

                  <div className="mt-5 space-y-2 text-sm text-slate-500">
                    <p className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-indigo-600" />
                      {new Date(event.date).toLocaleDateString()}
                    </p>
                    <p className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-indigo-600" />
                      {event.location}
                    </p>
                    <p className="flex items-center gap-2">
                      <Tag className="h-4 w-4 text-indigo-600" />
                      {event.category}
                    </p>
                  </div>

                  <div className="mt-6 flex gap-3">
                    <Link to={`/events/${event._id}`} className="ch-button-primary flex-1">
                      View
                    </Link>

                    <button
                      onClick={() =>
                        cancelRegistration(registration._id)
                      }
                      disabled={deletingId === registration._id}
                      className="flex-1 rounded-xl border border-red-200 px-4 py-2.5 text-sm font-bold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {deletingId === registration._id ? "Cancelling..." : "Cancel"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="mt-8">
            <EmptyState message="You have not registered for any events yet." />
            <div className="mt-6 text-center">
              <Link to="/events" className="ch-button-primary">
                Explore Events
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default MyEvents;
