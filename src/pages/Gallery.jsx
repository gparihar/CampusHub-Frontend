import {
  Camera,
  Image,
  Music,
  Sparkles,
  Trophy,
  UsersRound,
} from "lucide-react";

function Gallery() {
  const moments = [
    { title: "Tech workshops", category: "Technology", icon: Sparkles },
    { title: "Cultural events", category: "Culture", icon: Music },
    { title: "Sports meet", category: "Sports", icon: Trophy },
    { title: "Club activities", category: "Community", icon: UsersRound },
    { title: "Campus captures", category: "Photography", icon: Camera },
    { title: "Student showcases", category: "Events", icon: Image },
  ];

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="border-b border-slate-200 bg-white py-20">
        <div className="ch-container text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
            <Camera className="h-7 w-7" />
          </div>
          <p className="ch-eyebrow mt-6">Campus Gallery</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
            Moments from campus life
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            A polished snapshot of events, clubs, achievements, and student
            activities across CampusHub.
          </p>
        </div>
      </section>

      <section className="ch-container py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {moments.map((moment, index) => {
            const Icon = moment.icon;

            return (
              <div key={moment.title} className="group ch-card ch-card-hover overflow-hidden">
                <div className={`flex h-56 items-center justify-center ${
                  index % 3 === 0
                    ? "bg-indigo-600"
                    : index % 3 === 1
                      ? "bg-slate-950"
                      : "bg-emerald-600"
                }`}>
                  <div className="flex h-20 w-20 items-center justify-center rounded-[2rem] bg-white/15 text-white backdrop-blur">
                    <Icon className="h-10 w-10" />
                  </div>
                </div>
                <div className="p-6">
                  <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700">
                    {moment.category}
                  </span>
                  <h2 className="mt-4 text-xl font-black text-slate-950">
                    {moment.title}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    CampusHub keeps student life visible, organized, and easy
                    to revisit.
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}

export default Gallery;
