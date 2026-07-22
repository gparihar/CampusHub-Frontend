import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function MyClubs() {
  const { joinedClubs, leaveClub } = useAuth();

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-12">

        <p className="text-sm font-semibold text-indigo-600">
          MY CAMPUSHUB
        </p>

        <h1 className="mt-2 text-3xl font-bold text-gray-900">
          My Clubs
        </h1>

        <p className="mt-2 text-gray-500">
          View and manage the campus clubs you've joined.
        </p>

        {joinedClubs.length > 0 ? (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {joinedClubs.map((club) => (
              <div
                key={club.id}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-purple-100 text-3xl">
                  {club.icon}
                </div>

                <span className="mt-5 inline-block rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
                  {club.category}
                </span>

                <h2 className="mt-4 text-xl font-bold text-gray-900">
                  {club.name}
                </h2>

                <p className="mt-3 text-sm leading-6 text-gray-500">
                  {club.description}
                </p>

                <p className="mt-4 text-sm text-gray-500">
                  👥 {club.members}+ Members
                </p>

                <div className="mt-6 flex gap-3">
                  <Link
                    to={`/clubs/${club.id}`}
                    className="flex-1 rounded-lg bg-indigo-600 px-4 py-2 text-center text-sm font-semibold text-white"
                  >
                    View
                  </Link>

                  <button
                    type="button"
                    onClick={() => leaveClub(club.id)}
                    className="flex-1 rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
                  >
                    Leave
                  </button>
                </div>
              </div>
            ))}

          </div>
        ) : (
          <div className="mt-10 rounded-2xl border border-gray-200 bg-white py-20 text-center">
            <p className="text-5xl">🤝</p>

            <h2 className="mt-5 text-xl font-bold text-gray-900">
              No Clubs Joined
            </h2>

            <p className="mt-2 text-gray-500">
              You haven't joined any campus clubs yet.
            </p>

            <Link
              to="/clubs"
              className="mt-6 inline-block rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white"
            >
              Explore Clubs
            </Link>
          </div>
        )}

      </div>
    </main>
  );
}

export default MyClubs;