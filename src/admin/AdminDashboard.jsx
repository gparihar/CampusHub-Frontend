import { Link } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";

function AdminDashboard() {
  const { admin, adminLogout } = useAdmin();

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-7xl px-6 py-10">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-indigo-600">
              ADMIN PANEL
            </p>

            <h1 className="mt-2 text-3xl font-bold text-gray-900">
              Welcome, {admin?.name}
            </h1>

            <p className="mt-2 text-gray-500">
              Manage events, clubs and students from one place.
            </p>
          </div>

          <button
            onClick={adminLogout}
            className="rounded-lg bg-red-600 px-5 py-2 font-semibold text-white hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        {/* Stats */}
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-xl bg-white p-6 shadow">
            <h2 className="text-lg font-semibold">📅 Events</h2>
            <p className="mt-3 text-4xl font-bold">0</p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <h2 className="text-lg font-semibold">👥 Clubs</h2>
            <p className="mt-3 text-4xl font-bold">0</p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <h2 className="text-lg font-semibold">🎓 Students</h2>
            <p className="mt-3 text-4xl font-bold">0</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <Link
            to="/admin/events"
            className="rounded-xl bg-indigo-600 p-6 text-center font-semibold text-white hover:bg-indigo-700"
          >
            Manage Events
          </Link>

          <Link
            to="/admin/clubs"
            className="rounded-xl bg-purple-600 p-6 text-center font-semibold text-white hover:bg-purple-700"
          >
            Manage Clubs
          </Link>

          <Link
            to="/admin/students"
            className="rounded-xl bg-green-600 p-6 text-center font-semibold text-white hover:bg-green-700"
          >
            Manage Students
          </Link>
        </div>

      </div>
    </main>
  );
}

export default AdminDashboard;