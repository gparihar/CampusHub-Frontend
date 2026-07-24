import { Link } from "react-router-dom";
import { ArrowRight, Shapes, UsersRound } from "lucide-react";

function ClubCard({ club }) {
  return (
    <div className="group ch-card ch-card-hover p-7">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
        <Shapes className="h-8 w-8" />
      </div>

      <span className="mt-6 inline-block rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700">
        {club.category}
      </span>

      <h3 className="mt-4 text-xl font-bold text-slate-950 transition group-hover:text-indigo-700">
        {club.name}
      </h3>

      <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
        {club.description}
      </p>

      <div className="mt-6 flex items-center justify-between">
        <p className="flex items-center gap-2 text-sm font-medium text-slate-500">
          <UsersRound className="h-4 w-4 text-indigo-500" />
          {club.members}+ Members
        </p>

        <Link
          to={`/clubs/${club.id}`}
          className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-800"
        >
          View Club
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}

export default ClubCard;
