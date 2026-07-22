import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { user,
  registeredEvents,
  joinedClubs, } = useAuth();

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-12">

        {/* Welcome */}
        <div>
          <p className="text-sm font-semibold text-indigo-600">
            STUDENT DASHBOARD
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            Welcome back, {user?.name}! 👋
          </h1>

          <p className="mt-2 text-gray-500">
            Manage your events, clubs and CampusHub profile.
          </p>
        </div>

        {/* Statistics */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  Registered Events
                </p>

                <h2 className="mt-2 text-3xl font-bold text-gray-900">
                 {registeredEvents.length}
                </h2>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-2xl">
                📅
              </div>
            </div>

            <Link
              to="/dashboard/events"
              className="mt-5 inline-block text-sm font-semibold text-indigo-600"
            >
              View My Events →
            </Link>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  Joined Clubs
                </p>

                <h2 className="mt-2 text-3xl font-bold text-gray-900">
                   {joinedClubs.length}
                </h2>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-2xl">
                👥
              </div>
            </div>

            <Link
              to="/dashboard/clubs"
              className="mt-5 inline-block text-sm font-semibold text-indigo-600"
            >
              View My Clubs →
            </Link>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  Profile
                </p>

                <h2 className="mt-2 text-lg font-bold text-gray-900">
                  {user?.course || "Student"}
                </h2>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-2xl">
                👤
              </div>
            </div>

            <Link
              to="/dashboard/profile"
              className="mt-5 inline-block text-sm font-semibold text-indigo-600"
            >
              Manage Profile →
            </Link>
          </div>

        </div>

        {/* Quick Actions */}
        <div className="mt-10 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">
            Quick Actions
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link
              to="/events"
              className="rounded-xl bg-gray-50 p-5 transition hover:bg-indigo-50"
            >
              <span className="text-2xl">🔍</span>
              <h3 className="mt-3 font-semibold text-gray-900">
                Explore Events
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Find upcoming campus events.
              </p>
            </Link>

            <Link
              to="/clubs"
              className="rounded-xl bg-gray-50 p-5 transition hover:bg-indigo-50"
            >
              <span className="text-2xl">🤝</span>
              <h3 className="mt-3 font-semibold text-gray-900">
                Discover Clubs
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Find your campus community.
              </p>
            </Link>

            <Link
              to="/dashboard/events"
              className="rounded-xl bg-gray-50 p-5 transition hover:bg-indigo-50"
            >
              <span className="text-2xl">📅</span>
              <h3 className="mt-3 font-semibold text-gray-900">
                My Events
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Manage registered events.
              </p>
            </Link>

            <Link
              to="/dashboard/profile"
              className="rounded-xl bg-gray-50 p-5 transition hover:bg-indigo-50"
            >
              <span className="text-2xl">⚙️</span>
              <h3 className="mt-3 font-semibold text-gray-900">
                My Profile
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Update account information.
              </p>
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}

export default Dashboard;