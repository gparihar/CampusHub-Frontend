import { Link } from "react-router-dom";

function ClubCard({ club }) {
  return (
    <div className="group rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100 text-4xl">
        {club.icon}
      </div>

      <span className="mt-6 inline-block rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
        {club.category}
      </span>

      <h3 className="mt-4 text-xl font-bold text-gray-900 transition group-hover:text-indigo-600">
        {club.name}
      </h3>

      <p className="mt-3 text-sm leading-6 text-gray-600">
        {club.description}
      </p>

      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm font-medium text-gray-500">
          👥 {club.members}+ Members
        </p>

        <Link
          to={`/clubs/${club.id}`}
          className="text-sm font-semibold text-indigo-600 hover:text-indigo-800"
        >
          View Club →
        </Link>
      </div>
    </div>
  );
}

export default ClubCard;