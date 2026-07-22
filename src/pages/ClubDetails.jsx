import {
  Link,
  useParams,
  useNavigate,
} from "react-router-dom";

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
      <main className="flex min-h-[70vh] items-center justify-center bg-gray-50 px-6">
        <div className="text-center">

          <p className="text-6xl">
            😕
          </p>

          <h1 className="mt-5 text-3xl font-bold text-gray-900">
            Club Not Found
          </h1>

          <p className="mt-3 text-gray-500">
            The club you're looking for doesn't exist.
          </p>

          <Link
            to="/clubs"
            className="mt-6 inline-block rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700"
          >
            Back to Clubs
          </Link>

        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">

      {/* Club Hero */}
      <section className="bg-gradient-to-br from-indigo-600 to-purple-700 py-20 text-white">

        <div className="mx-auto max-w-7xl px-6">

          <Link
            to="/clubs"
            className="text-sm font-medium text-indigo-200 transition hover:text-white"
          >
            ← Back to Clubs
          </Link>

          <div className="mt-10 grid items-center gap-12 lg:grid-cols-2">

            {/* Club Information */}
            <div>

              <span className="rounded-full bg-white/15 px-4 py-2 text-sm font-semibold">
                {club.category}
              </span>

              <h1 className="mt-6 text-4xl font-bold md:text-5xl">
                {club.name}
              </h1>

              <p className="mt-5 max-w-xl text-lg leading-8 text-indigo-100">
                {club.description}
              </p>

              <p className="mt-6 font-medium text-indigo-100">
                👥 {club.members}+ Active Members
              </p>

            </div>

            {/* Club Visual */}
            <div className="flex min-h-72 items-center justify-center rounded-3xl bg-white/10 backdrop-blur">
              <span className="text-9xl">
                {club.icon}
              </span>
            </div>

          </div>

        </div>

      </section>


      {/* Club Content */}
      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-3">

        {/* About Club */}
        <div className="lg:col-span-2">

          <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">

            <h2 className="text-2xl font-bold text-gray-900">
              About {club.name}
            </h2>

            <p className="mt-5 leading-7 text-gray-600">
              {club.description}
            </p>

            <p className="mt-4 leading-7 text-gray-600">
              Our community brings students together to collaborate,
              learn new skills, participate in activities and create
              meaningful connections across campus.
            </p>


            {/* Benefits */}
            <h3 className="mt-10 text-xl font-bold text-gray-900">
              What You'll Get
            </h3>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">

              <div className="rounded-xl bg-gray-50 p-5">
                <p className="text-2xl">
                  🤝
                </p>

                <h4 className="mt-3 font-semibold text-gray-900">
                  Meet New People
                </h4>

                <p className="mt-2 text-sm text-gray-500">
                  Connect with students who share your interests.
                </p>
              </div>


              <div className="rounded-xl bg-gray-50 p-5">
                <p className="text-2xl">
                  🚀
                </p>

                <h4 className="mt-3 font-semibold text-gray-900">
                  Build Your Skills
                </h4>

                <p className="mt-2 text-sm text-gray-500">
                  Learn through activities, workshops and projects.
                </p>
              </div>


              <div className="rounded-xl bg-gray-50 p-5">
                <p className="text-2xl">
                  🎯
                </p>

                <h4 className="mt-3 font-semibold text-gray-900">
                  Club Activities
                </h4>

                <p className="mt-2 text-sm text-gray-500">
                  Participate in regular club events and competitions.
                </p>
              </div>


              <div className="rounded-xl bg-gray-50 p-5">
                <p className="text-2xl">
                  🏆
                </p>

                <h4 className="mt-3 font-semibold text-gray-900">
                  Gain Experience
                </h4>

                <p className="mt-2 text-sm text-gray-500">
                  Develop teamwork and leadership experience.
                </p>
              </div>

            </div>

          </div>

        </div>


        {/* Join Club Card */}
        <div>

          <div className="sticky top-28 rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100 text-4xl">
              {club.icon}
            </div>

            <h2 className="mt-5 text-xl font-bold text-gray-900">
              Join {club.name}
            </h2>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              Become part of this campus community and participate
              in upcoming club activities.
            </p>

            <div className="mt-6 border-t border-gray-100 pt-6">

              <p className="text-sm text-gray-500">
                👥 {club.members}+ members
              </p>

              <p
                className={`mt-3 text-sm ${
                  isJoined
                    ? "text-green-600"
                    : "text-indigo-600"
                }`}
              >
                {isJoined
                  ? "✓ You are a member"
                  : "● Membership Open"}
              </p>

            </div>


            {/* Join Button */}
            <button
              type="button"
              onClick={handleJoinClub}
              disabled={isJoined}
              className={`mt-7 w-full rounded-xl px-6 py-3 font-semibold text-white transition ${
                isJoined
                  ? "cursor-not-allowed bg-green-500"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {isJoined
                ? "✓ Joined"
                : "Join Club"}
            </button>


            {!user && (
              <p className="mt-4 text-center text-xs text-gray-400">
                Login required to join this club.
              </p>
            )}

            {user && (
              <p className="mt-4 text-center text-xs text-gray-400">
                Free membership for CampusHub students.
              </p>
            )}

          </div>

        </div>

      </section>

    </main>
  );
}

export default ClubDetails;