import { Link } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  ClipboardList,
  LogOut,
  ShieldCheck,
  UsersRound,
} from "lucide-react";
import api from "../api/api";

function AdminDashboard() {
  const { admin, adminLogout } = useAdmin();

  const [stats, setStats] = useState({
    events: 0,
    clubs: 0,
    students: 0,
    registrations: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("adminToken");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const [eventsRes, clubsRes, studentsRes, registrationsRes] = await Promise.all([
        api.get("/events", config),
        api.get("/clubs", config),
        api.get("/users", config),
        api.get("/registrations/count", config),
      ]);

      setStats({
        events: eventsRes.data.events.length,
        clubs: clubsRes.data.clubs.length,
        students: studentsRes.data.students.length,
        registrations: registrationsRes.data.count,
      });
    } catch (error) {
      console.error("Failed to fetch dashboard stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { label: "Events", value: stats.events, icon: CalendarDays },
    { label: "Clubs", value: stats.clubs, icon: UsersRound },
    { label: "Students", value: stats.students, icon: ShieldCheck },
    { label: "Registrations", value: stats.registrations, icon: ClipboardList },
  ];

  const actions = [
    { label: "Manage Events", to: "/admin/events", icon: CalendarDays },
    { label: "Manage Clubs", to: "/admin/clubs", icon: UsersRound },
    { label: "Manage Students", to: "/admin/students", icon: ShieldCheck },
    { label: "Manage Registrations", to: "/admin/registrations", icon: ClipboardList },
  ];

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="ch-container py-10">
        <section className="rounded-[2rem] bg-slate-950 p-8 text-white shadow-2xl shadow-slate-200">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="ch-eyebrow text-indigo-300">Admin panel</p>
              <h1 className="mt-3 text-4xl font-black tracking-tight">
                Welcome, {admin?.name}
              </h1>
              <p className="mt-3 max-w-2xl text-slate-300">
                Manage events, clubs, students and registrations from one
                professional workspace.
              </p>
            </div>

            <button onClick={adminLogout} className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-500 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-red-600">
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </section>

        <section className="mt-8 grid gap-6 md:grid-cols-4">
          {statCards.map((stat) => {
            const Icon = stat.icon;

            return (
              <div key={stat.label} className="ch-card ch-card-hover p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-slate-500">{stat.label}</p>
                    <p className="mt-3 text-4xl font-black text-slate-950">
                      {loading ? "..." : stat.value}
                    </p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        <section className="mt-8 ch-card p-7">
          <p className="ch-eyebrow">Quick actions</p>
          <div className="mt-6 grid gap-4 md:grid-cols-4">
            {actions.map((action) => {
              const Icon = action.icon;

              return (
                <Link key={action.label} to={action.to} className="rounded-2xl bg-slate-50 p-5 transition hover:bg-indigo-50">
                  <Icon className="h-6 w-6 text-indigo-600" />
                  <h2 className="mt-4 font-black text-slate-950">{action.label}</h2>
                  <span className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-indigo-600">
                    Open
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}

export default AdminDashboard;
