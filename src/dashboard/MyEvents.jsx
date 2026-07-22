import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";

function MyEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyEvents();
  }, []);

  const fetchMyEvents = async () => {
    try {
      const token = localStorage.getItem("campushub-token");

      const res = await api.get("/registrations/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setEvents(res.data.registrations);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const cancelRegistration = async (registrationId) => {
    try {
      const token = localStorage.getItem("campushub-token");

      await api.delete(`/registrations/${registrationId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setEvents((prev) =>
        prev.filter((item) => item._id !== registrationId)
      );

      alert("Registration cancelled.");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to cancel registration."
      );
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <h2 className="text-xl">Loading...</h2>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <p className="text-sm font-semibold text-indigo-600">
          MY CAMPUSHUB
        </p>

        <h1 className="mt-2 text-3xl font-bold">
          My Events
        </h1>

        <p className="mt-2 text-gray-500">
          View and manage your registered events.
        </p>

        {events.length > 0 ? (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((registration) => {
              const event = registration.event;

              return (
                <div
                  key={registration._id}
                  className="rounded-2xl border bg-white p-6 shadow-sm"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-100 text-3xl">
                    🎉
                  </div>

                  <h2 className="mt-5 text-xl font-bold">
                    {event.title}
                  </h2>

                  <p className="mt-2 text-gray-600">
                    {event.description}
                  </p>

                  <div className="mt-4 space-y-2 text-sm text-gray-500">
                    <p>📅 {new Date(event.date).toLocaleDateString()}</p>
                    <p>📍 {event.venue}</p>
                    <p>🏢 {event.club}</p>
                  </div>

                  <div className="mt-6 flex gap-3">
                    <Link
                      to={`/events/${event._id}`}
                      className="flex-1 rounded-lg bg-indigo-600 px-4 py-2 text-center text-white"
                    >
                      View
                    </Link>

                    <button
                      onClick={() =>
                        cancelRegistration(registration._id)
                      }
                      className="flex-1 rounded-lg border border-red-300 px-4 py-2 text-red-600"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="mt-10 rounded-2xl bg-white py-20 text-center shadow-sm">
            <p className="text-5xl">📅</p>

            <h2 className="mt-5 text-2xl font-bold">
              No Registered Events
            </h2>

            <p className="mt-2 text-gray-500">
              You haven't registered for any events yet.
            </p>

            <Link
              to="/events"
              className="mt-6 inline-block rounded-xl bg-indigo-600 px-6 py-3 text-white"
            >
              Explore Events
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}

export default MyEvents;