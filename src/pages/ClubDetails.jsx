import {
  Link,
  useParams,
  useNavigate,
} from "react-router-dom";
import {
  ArrowLeft,
  BadgeCheck,
  CheckCircle2,
  Rocket,
  Shapes,
  Trophy,
  UsersRound,
} from "lucide-react";

import { clubs } from "../data/clubs";
import { useAuth } from "../context/AuthContext";

function ClubDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    user,
    joinClub,
    joinedClubs,
  } = useAuth();

  // Find club using URL ID
  const club = clubs.find(
    (club) => club.id === Number(id)
  );

  // Check if user already joined
  const isJoined = joinedClubs.some(
    (item) => item.id === club?.id
  );

  // Handle joining club
  const handleJoinClub = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    joinClub(club);
  };

  // Club not found
  if (!club) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-6">
        <div className="ch-card max-w-md p-10 text-center">
          <h1 className="text-3xl font-black text-slate-950">
            Club Not Found
          </h1>

          <p className="mt-3 text-slate-500">
            The club you're looking for doesn't exist.
          </p>

          <Link to="/clubs" className="ch-button-primary mt-6">
            Back to Clubs
          </Link>
        </div>
      </main>
    );
  }

  const benefits = [
    {
      title: "Meet New People",
      description: "Connect with students who share your interests.",
      icon: UsersRound,
    },
    {
      title: "Build Your Skills",
      description: "Learn through activities, workshops and projects.",
      icon: Rocket,
    },
    {
      title: "Club Activities",
      description: "Participate in regular club events and competitions.",
      icon: Shapes,
    },
    {
      title: "Gain Experience",
      description: "Develop teamwork and leadership experience.",
      icon: Trophy,
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="border-b border-slate-200 bg-white py-12">
        <div className="ch-container">
          <Link
            to="/clubs"
            className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-800"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Clubs
          </Link>

          <div className="mt-8 grid items-center gap-10 lg:grid-cols-[1fr_360px]">
            <div>
              <span className="inline-flex rounded-full bg-indigo-50 px-4 py-2 text-sm font-bold text-indigo-700">
                {club.category}
              </span>

              <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
                {club.name}
              </h1>

              <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
                {club.description}
              </p>

              <p className="mt-6 inline-flex items-center gap-2 font-bold text-slate-700">
                <UsersRound className="h-5 w-5 text-indigo-600" />
                {club.members}+ Active Members
              </p>
            </div>

            <aside className="ch-card p-7">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                <Shapes className="h-8 w-8" />
              </div>

              <h2 className="mt-5 text-xl font-black text-slate-950">
                Join {club.name}
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Become part of this campus community and participate
                in upcoming club activities.
              </p>

              <div className="mt-6 border-t border-slate-100 pt-6">
                <p className="flex items-center gap-2 text-sm text-slate-500">
                  <UsersRound className="h-4 w-4 text-indigo-600" />
                  {club.members}+ members
                </p>

                <p
                  className={`mt-3 flex items-center gap-2 text-sm font-bold ${
                    isJoined
                      ? "text-emerald-600"
                      : "text-indigo-600"
                  }`}
                >
                  <BadgeCheck className="h-4 w-4" />
                  {isJoined
                    ? "You are a member"
                    : "Membership Open"}
                </p>
              </div>

              <button
                type="button"
                onClick={handleJoinClub}
                disabled={isJoined}
                className={`mt-7 w-full rounded-xl px-6 py-3 font-bold text-white transition ${
                  isJoined
                    ? "cursor-not-allowed bg-emerald-600"
                    : "bg-indigo-600 hover:bg-indigo-700"
                }`}
              >
                {isJoined ? "Joined" : "Join Club"}
              </button>

              {!user && (
                <p className="mt-4 text-center text-xs text-slate-400">
                  Login required to join this club.
                </p>
              )}

              {user && (
                <p className="mt-4 text-center text-xs text-slate-400">
                  Free membership for CampusHub students.
                </p>
              )}
            </aside>
          </div>
        </div>
      </section>

      <section className="ch-container grid gap-10 py-12 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="ch-card p-8">
            <h2 className="text-2xl font-black text-slate-950">
              About {club.name}
            </h2>

            <p className="mt-5 leading-7 text-slate-600">
              {club.description}
            </p>

            <p className="mt-4 leading-7 text-slate-600">
              Our community brings students together to collaborate,
              learn new skills, participate in activities and create
              meaningful connections across campus.
            </p>

            <h3 className="mt-10 text-xl font-black text-slate-950">
              What You'll Get
            </h3>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {benefits.map((benefit) => {
                const Icon = benefit.icon;

                return (
                  <div key={benefit.title} className="rounded-2xl bg-slate-50 p-5">
                    <Icon className="h-6 w-6 text-indigo-600" />

                    <h4 className="mt-3 font-bold text-slate-950">
                      {benefit.title}
                    </h4>

                    <p className="mt-2 text-sm text-slate-500">
                      {benefit.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="ch-card h-fit p-7">
          <CheckCircle2 className="h-7 w-7 text-emerald-600" />
          <h3 className="mt-4 text-lg font-black text-slate-950">
            Campus verified
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Club details are organized for students to explore and manage from
            their CampusHub account.
          </p>
        </div>
      </section>
    </main>
  );
}

export default ClubDetails;
