import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  CalendarCheck,
  Compass,
  LayoutDashboard,
  Settings,
  Sparkles,
  UsersRound,
} from "lucide-react";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { user,
  joinedClubs, } = useAuth();

  const [registrationCount, setRegistrationCount] = useState(0);
  const [registrationsLoading, setRegistrationsLoading] = useState(true);
  const [recentRegistrations, setRecentRegistrations] = useState([]);

  useEffect(() => {
    fetchRegistrationCount();
  }, []);

  const fetchRegistrationCount = async () => {
    try {
      setRegistrationsLoading(true);
      const token = localStorage.getItem("campushub-token");

      const res = await api.get("/registrations/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setRegistrationCount(res.data.count);
      setRecentRegistrations(res.data.registrations || []);
    } catch (error) {
      console.error(error);
    } finally {
      setRegistrationsLoading(false);
    }
  };

  const stats = [
    {
      label: "Registered Events",
      value: registrationsLoading ? "..." : registrationCount,
      icon: CalendarCheck,
      link: "/dashboard/events",
      linkText: "View My Events",
    },
    {
      label: "Joined Clubs",
      value: joinedClubs.length,
      icon: UsersRound,
      link: "/dashboard/clubs",
      linkText: "View My Clubs",
    },
    {
      label: "Profile",
      value: user?.course || "Student",
      icon: Settings,
      link: "/dashboard/profile",
      linkText: "Manage Profile",
    },
  ];

  const quickActions = [
    {
      title: "Explore Events",
      description: "Find upcoming campus events.",
      to: "/events",
      icon: Compass,
    },
    {
      title: "Discover Clubs",
      description: "Find your campus community.",
      to: "/clubs",
      icon: UsersRound,
    },
    {
      title: "My Events",
      description: "Manage registered events.",
      to: "/dashboard/events",
      icon: CalendarCheck,
    },
    {
      title: "My Profile",
      description: "Update account information.",
      to: "/dashboard/profile",
      icon: Settings,
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="ch-container py-12">
        <section className="rounded-[2rem] bg-slate-950 p-8 text-white shadow-2xl shadow-slate-200">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-indigo-300">
                <LayoutDashboard className="h-4 w-4" />
                Student Dashboard
              </p>

              <h1 className="mt-4 text-4xl font-black tracking-tight">
                Welcome back, {user?.name}
              </h1>

              <p className="mt-3 max-w-2xl text-slate-300">
                Manage your events, clubs and CampusHub profile from one
                focused workspace.
              </p>
            </div>

            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white/10 text-indigo-200">
              <Sparkles className="h-8 w-8" />
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-6 md:grid-cols-3">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div key={stat.label} className="ch-card ch-card-hover p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-500">
                      {stat.label}
                    </p>

                    <h2 className="mt-2 text-3xl font-black text-slate-950">
                      {stat.value}
                    </h2>
                  </div>

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                    <Icon className="h-6 w-6" />
                  </div>
                </div>

                <Link
                  to={stat.link}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-indigo-600"
                >
                  {stat.linkText}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            );
          })}
        </section>

        <section className="mt-8 grid gap-8 lg:grid-cols-[1fr_0.8fr]">
          <div className="ch-card p-7">
            <div className="flex items-center justify-between">
              <div>
                <p className="ch-eyebrow">Recent registrations</p>
                <h2 className="mt-2 text-2xl font-black text-slate-950">
                  Your latest event activity
                </h2>
              </div>

              <Link to="/dashboard/events" className="text-sm font-bold text-indigo-600">
                View all
              </Link>
            </div>

            <div className="mt-6 space-y-3">
              {recentRegistrations.slice(0, 3).map((registration) => (
                <Link
                  key={registration._id}
                  to={`/events/${registration.event?._id}`}
                  className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 p-4 transition hover:border-indigo-100 hover:bg-indigo-50"
                >
                  <div>
                    <h3 className="font-bold text-slate-950">
                      {registration.event?.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      {registration.event?.date
                        ? new Date(registration.event.date).toLocaleDateString()
                        : "Date unavailable"}
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-indigo-600" />
                </Link>
              ))}

              {!registrationsLoading && recentRegistrations.length === 0 && (
                <div className="rounded-2xl border border-dashed border-slate-200 p-6 text-center text-sm text-slate-500">
                  You have not registered for any events yet.
                </div>
              )}
            </div>
          </div>

          <div className="ch-card p-7">
            <p className="ch-eyebrow">Upcoming events</p>
            <h2 className="mt-2 text-2xl font-black text-slate-950">
              Find something new to join
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Explore campus events and register for the ones that fit your
              interests, schedule and goals.
            </p>

            <Link to="/events" className="ch-button-primary mt-6">
              Browse Events
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        <section className="mt-8 ch-card p-7">
          <p className="ch-eyebrow">Quick actions</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {quickActions.map((action) => {
              const Icon = action.icon;

              return (
                <Link
                  key={action.title}
                  to={action.to}
                  className="rounded-2xl bg-slate-50 p-5 transition hover:bg-indigo-50"
                >
                  <Icon className="h-6 w-6 text-indigo-600" />
                  <h3 className="mt-4 font-bold text-slate-950">
                    {action.title}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    {action.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}

export default Dashboard;
