import { Link } from "react-router-dom";
import {
  ArrowRight,
  CalendarDays,
  MapPin,
  Sparkles,
  UsersRound,
} from "lucide-react";

function EventCard({ event }) {
  return (
    <div className="group overflow-hidden ch-card ch-card-hover">
      <div className="flex h-40 items-center justify-center bg-gradient-to-br from-indigo-600 via-sky-500 to-emerald-400">
        <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white/20 text-white shadow-xl backdrop-blur">
          <Sparkles className="h-8 w-8" />
        </div>
      </div>

      <div className="p-6">
        <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700">
          {event.category}
        </span>

        <h3 className="mt-4 text-xl font-bold text-slate-950 transition group-hover:text-indigo-700">
          {event.title}
        </h3>

        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
          {event.description}
        </p>

        <div className="mt-5 space-y-2 text-sm text-slate-500">
          <p className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-indigo-500" />
            {new Date(event.date).toLocaleDateString()}
          </p>

          <p className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-indigo-500" />
            {event.location}
          </p>

          <p className="flex items-center gap-2">
            <UsersRound className="h-4 w-4 text-indigo-500" />
            Max Participants: {event.maxParticipants}
          </p>
        </div>

        <Link
          to={`/events/${event._id}`}
          className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-indigo-600 transition hover:text-indigo-800"
        >
          View Details
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}

export default EventCard;
