import { useEffect, useState } from "react";
import api from "../api/api";
import EventCard from "../components/EventCard";

function Events() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.get("/events");
        setEvents(res.data.events);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-br from-indigo-600 to-purple-700 py-20 text-white">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-indigo-200">
            Campus Life
          </p>

          <h1 className="mt-3 text-4xl font-bold md:text-5xl">
            Discover Campus Events
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-indigo-100">
            Explore upcoming events, workshops, competitions and activities
            happening around your campus.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        {/* Search */}
        <div className="mx-auto max-w-2xl">
          <input
            type="text"
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-gray-300 bg-white px-5 py-4 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        {/* Results */}
        <div className="mt-12">
          {loading ? (
            <div className="text-center py-20">
              <p className="text-lg text-gray-500">Loading events...</p>
            </div>
          ) : (
            <>
              <p className="mb-6 text-sm text-gray-500">
                Showing {filteredEvents.length} events
              </p>

              {filteredEvents.length > 0 ? (
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {filteredEvents.map((event) => (
                    <EventCard
                      key={event._id}
                      event={event}
                    />
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center">
                  <p className="text-5xl">🔍</p>

                  <h2 className="mt-4 text-xl font-bold text-gray-900">
                    No events found
                  </h2>

                  <p className="mt-2 text-gray-500">
                    No events are available right now.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
}

export default Events;