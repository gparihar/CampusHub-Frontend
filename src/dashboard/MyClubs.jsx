import { Link } from "react-router-dom";
import { Shapes, UsersRound } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import EmptyState from "../components/EmptyState";

function MyClubs() {
  const { joinedClubs, leaveClub } = useAuth();

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="ch-container py-12">
        <section className="ch-card p-8">
          <p className="ch-eyebrow">My CampusHub</p>
          <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-950">
            My Clubs
          </h1>
          <p className="mt-2 text-slate-500">
            View and manage the campus clubs you've joined.
          </p>
        </section>

        {joinedClubs.length > 0 ? (
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {joinedClubs.map((club) => (
              <div key={club.id} className="ch-card ch-card-hover p-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                  <Shapes className="h-7 w-7" />
                </div>

                <span className="mt-5 inline-block rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700">
                  {club.category}
                </span>

                <h2 className="mt-4 text-xl font-black text-slate-950">
                  {club.name}
                </h2>

                <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
                  {club.description}
                </p>

                <p className="mt-4 flex items-center gap-2 text-sm text-slate-500">
                  <UsersRound className="h-4 w-4 text-indigo-600" />
                  {club.members}+ Members
                </p>

                <div className="mt-6 flex gap-3">
                  <Link to={`/clubs/${club.id}`} className="ch-button-primary flex-1">
                    View
                  </Link>

                  <button
                    type="button"
                    onClick={() => leaveClub(club.id)}
                    className="flex-1 rounded-xl border border-red-200 px-4 py-2.5 text-sm font-bold text-red-600 transition hover:bg-red-50"
                  >
                    Leave
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-8">
            <EmptyState message="You have not joined any campus clubs yet." />
            <div className="mt-6 text-center">
              <Link to="/clubs" className="ch-button-primary">
                Explore Clubs
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default MyClubs;
