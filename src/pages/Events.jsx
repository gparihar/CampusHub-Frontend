import { useEffect, useState } from "react";
import { CalendarDays, Search, SlidersHorizontal } from "lucide-react";
import api from "../api/api";
import EventCard from "../components/EventCard";
import LoadingSpinner from "../components/LoadingSpinner";
import ApiErrorState from "../components/ApiErrorState";
import EmptyState from "../components/EmptyState";

function Events() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await api.get("/events");
      setEvents(res.data.events);
    } catch (error) {
      console.error("Failed to fetch events:", error);
      setError("Failed to fetch events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="border-b border-slate-200 bg-white py-16">
        <div className="ch-container text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
            <CalendarDays className="h-7 w-7" />
          </div>
          <p className="ch-eyebrow mt-6">Campus Life</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
            Discover Campus Events
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            Explore upcoming events, workshops, competitions and activities
            happening around your campus.
          </p>
        </div>
      </section>

      <section className="ch-container py-12">
        <div className="ch-card p-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <div className="flex flex-1 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4">
              <Search className="h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search events..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent py-3 outline-none"
              />
            </div>

            <div className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-500">
              <SlidersHorizontal className="h-4 w-4" />
              Showing {filteredEvents.length}
            </div>
          </div>
        </div>

        <div className="mt-10">
          {loading ? (
            <LoadingSpinner text="Loading events..." />
          ) : error ? (
            <ApiErrorState message={error} onRetry={fetchEvents} />
          ) : filteredEvents.length > 0 ? (
            <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
              {filteredEvents.map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
          ) : (
            <EmptyState message="No events are available right now." />
          )}
        </div>
      </section>
    </main>
  );
}

export default Events;
