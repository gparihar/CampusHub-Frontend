import { Link } from "react-router-dom";
import {
  ArrowRight,
  BadgeCheck,
  CalendarCheck,
  GraduationCap,
  HeartHandshake,
  ShieldCheck,
  UsersRound,
} from "lucide-react";

function About() {
  const values = [
    {
      title: "Student first",
      description: "Every workflow is built around helping students find, join, and manage campus opportunities.",
      icon: GraduationCap,
    },
    {
      title: "Community driven",
      description: "CampusHub brings clubs, events, and student participation into one organized experience.",
      icon: HeartHandshake,
    },
    {
      title: "Reliable management",
      description: "Admins get the tools they need to keep events, clubs, students, and registrations in sync.",
      icon: ShieldCheck,
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="border-b border-slate-200 bg-white py-20">
        <div className="ch-container text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
            <BadgeCheck className="h-7 w-7" />
          </div>

          <p className="ch-eyebrow mt-6">About CampusHub</p>
          <h1 className="mx-auto mt-3 max-w-4xl text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
            A modern campus platform for connected student life.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            CampusHub helps students discover events, join clubs, and manage
            their campus experience while giving admins a clean way to keep
            everything organized.
          </p>
        </div>
      </section>

      <section className="ch-container py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {values.map((value) => {
            const Icon = value.icon;

            return (
              <div key={value.title} className="ch-card ch-card-hover p-7">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                  <Icon className="h-6 w-6" />
                </div>
                <h2 className="mt-5 text-xl font-black text-slate-950">
                  {value.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_0.85fr]">
          <div className="ch-card p-8">
            <p className="ch-eyebrow">Our mission</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">
              Make campus participation easier to discover and manage.
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              Students should not have to search across scattered notices,
              groups, and messages to understand what is happening on campus.
              CampusHub creates a single place for discovery, registration,
              and student community.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-3xl bg-slate-950 p-7 text-white">
              <CalendarCheck className="h-7 w-7 text-indigo-300" />
              <p className="mt-5 text-3xl font-black">100+</p>
              <p className="mt-1 text-sm text-slate-300">Events organized</p>
            </div>
            <div className="rounded-3xl bg-indigo-600 p-7 text-white">
              <UsersRound className="h-7 w-7 text-indigo-100" />
              <p className="mt-5 text-3xl font-black">50+</p>
              <p className="mt-1 text-sm text-indigo-100">Student clubs</p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="mx-auto max-w-7xl rounded-[2rem] bg-white p-8 text-center shadow-sm ring-1 ring-slate-200">
          <h2 className="text-3xl font-black text-slate-950">
            Ready to explore CampusHub?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            Browse events, discover clubs, and make the most of your campus
            experience.
          </p>
          <Link to="/events" className="ch-button-primary mt-6">
            Explore Events
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}

export default About;
