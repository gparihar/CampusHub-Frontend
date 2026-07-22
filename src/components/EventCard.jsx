import { Link } from "react-router-dom";

function EventCard({ event }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Header */}
      <div className="flex h-40 items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
        <span className="text-5xl">🎉</span>
      </div>

      {/* Body */}
      <div className="p-6">
        <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-600">
          {event.club}
        </span>

        <h3 className="mt-4 text-xl font-bold text-gray-900">
          {event.title}
        </h3>

        <p className="mt-3 text-sm leading-6 text-gray-600">
          {event.description}
        </p>

        <div className="mt-5 space-y-2 text-sm text-gray-500">
          <p>📅 {new Date(event.date).toLocaleDateString()}</p>
          <p>📍 {event.venue}</p>
          <p>👥 Max Participants: {event.maxParticipants}</p>
        </div>

        <Link
          to={`/events/${event._id}`}
          className="mt-6 inline-block font-semibold text-indigo-600 transition hover:text-indigo-800"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}

export default EventCard;