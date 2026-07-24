import { Link } from "react-router-dom";
import {
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  Compass,
  GraduationCap,
  HeartHandshake,
  Sparkles,
  UsersRound,
} from "lucide-react";

function Home() {
  const features = [
    {
      title: "Discover events",
      description: "Browse workshops, competitions, cultural programs, and campus activities in one polished hub.",
      icon: CalendarCheck,
    },
    {
      title: "Join communities",
      description: "Find clubs that match your interests and stay connected with student-led communities.",
      icon: UsersRound,
    },
    {
      title: "Manage your campus life",
      description: "Track registrations, memberships, and your student profile from a focused dashboard.",
      icon: Compass,
    },
  ];

  const stats = [
    { value: "50+", label: "Active clubs" },
    { value: "100+", label: "Campus events" },
    { value: "2K+", label: "Students" },
    { value: "24/7", label: "Campus access" },
  ];

  return (
    <main className="bg-slate-50">
      <section className="relative overflow-hidden border-b border-slate-200 bg-white">
        <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-indigo-50 to-transparent" />

        <div className="ch-container relative grid min-h-[640px] items-center gap-12 py-20 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-sm font-bold text-indigo-700">
              <Sparkles className="h-4 w-4" />
              Your campus community, beautifully organized
            </div>

            <h1 className="mt-7 max-w-4xl text-5xl font-black tracking-tight text-slate-950 md:text-7xl">
              Campus life, events, and clubs in one modern hub.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Discover what is happening around campus, register for events,
              join student communities, and manage your experience with a clean
              student dashboard.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link to="/events" className="ch-button-primary">
                Explore Events
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link to="/clubs" className="ch-button-secondary">
                Discover Clubs
              </Link>
            </div>

            <div className="mt-12 grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="ch-card p-4">
                  <p className="text-2xl font-black text-slate-950">{stat.value}</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="relative">
              <div className="ch-card p-6 shadow-2xl shadow-indigo-100">
                <div className="rounded-3xl bg-slate-950 p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-indigo-200">
                        UPCOMING EVENT
                      </p>
                      <h2 className="mt-2 text-3xl font-black">
                        Annual Tech Fest
                      </h2>
                    </div>

                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                      <GraduationCap className="h-7 w-7" />
                    </div>
                  </div>

                  <div className="mt-8 grid gap-3">
                    {["Innovation showcases", "Coding battles", "Student networking"].map((item) => (
                      <div key={item} className="flex items-center gap-3 rounded-2xl bg-white/10 p-4">
                        <CheckCircle2 className="h-5 w-5 text-emerald-300" />
                        <span className="text-sm font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-indigo-50 p-5">
                    <p className="text-sm font-bold text-indigo-700">Registered</p>
                    <p className="mt-2 text-3xl font-black text-slate-950">245</p>
                  </div>

                  <div className="rounded-2xl bg-emerald-50 p-5">
                    <p className="text-sm font-bold text-emerald-700">Clubs involved</p>
                    <p className="mt-2 text-3xl font-black text-slate-950">12</p>
                  </div>
                </div>
              </div>

              <div className="absolute -right-5 -top-5 rounded-2xl bg-white p-4 shadow-xl">
                <HeartHandshake className="h-8 w-8 text-indigo-600" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="ch-container">
          <div className="mx-auto max-w-3xl text-center">
            <p className="ch-eyebrow">Why CampusHub</p>
            <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-950">
              A focused platform for students who want more from campus.
            </h2>
            <p className="mt-4 text-slate-600">
              CampusHub brings discovery, participation, and student community
              into one consistent experience.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div key={feature.title} className="ch-card ch-card-hover p-7">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-slate-950">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="ch-container grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="ch-eyebrow">How it works</p>
            <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-950">
              Move from curiosity to participation in minutes.
            </h2>
            <p className="mt-4 text-slate-600">
              Explore live opportunities, open the details, register, and keep
              track of everything from your dashboard.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {["Discover", "Register", "Participate"].map((step, index) => (
              <div key={step} className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                <p className="text-sm font-black text-indigo-600">0{index + 1}</p>
                <h3 className="mt-4 text-lg font-bold text-slate-950">{step}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Find the right campus opportunity and keep it organized.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-slate-950 px-6 py-16 text-center shadow-2xl shadow-slate-200 md:px-12">
          <p className="ch-eyebrow text-indigo-300">Ready when you are</p>
          <h2 className="mx-auto mt-3 max-w-3xl text-4xl font-black tracking-tight text-white">
            Build a richer, better organized campus experience.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-300">
            Join CampusHub and start exploring events, clubs, and student-led
            opportunities today.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/register" className="rounded-xl bg-white px-6 py-3 font-bold text-slate-950 transition hover:bg-indigo-50">
              Create Your Account
            </Link>
            <Link to="/events" className="rounded-xl border border-white/20 px-6 py-3 font-bold text-white transition hover:bg-white/10">
              Browse Events
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
