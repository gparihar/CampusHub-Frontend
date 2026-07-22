import { Link } from "react-router-dom";

function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="mx-auto grid min-h-[600px] max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:px-8">
          
          {/* Left Content */}
          <div>
            <div className="mb-6 inline-flex rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700">
              🎓 Your Campus Community, All in One Place
            </div>

            <h1 className="text-5xl font-bold leading-tight tracking-tight text-gray-900 md:text-6xl">
              Discover.
              <br />
              Connect.
              <br />
              <span className="text-indigo-600">Experience Campus.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">
              Explore exciting events, discover student clubs, meet people with
              similar interests, and make the most of your college experience.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/events"
                className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-indigo-700"
              >
                Explore Events →
              </Link>

              <Link
                to="/clubs"
                className="rounded-xl border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition hover:border-indigo-300 hover:text-indigo-600"
              >
                Discover Clubs
              </Link>
            </div>

            {/* Statistics */}
            <div className="mt-12 flex flex-wrap gap-10">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">50+</h3>
                <p className="text-sm text-gray-500">Active Clubs</p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900">100+</h3>
                <p className="text-sm text-gray-500">Campus Events</p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900">2K+</h3>
                <p className="text-sm text-gray-500">Students</p>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative hidden lg:block">
            <div className="rounded-3xl bg-indigo-600 p-10 shadow-2xl">
              <div className="rounded-2xl bg-white p-6">
                <p className="text-sm font-semibold text-indigo-600">
                  UPCOMING EVENT
                </p>

                <h2 className="mt-3 text-2xl font-bold text-gray-900">
                  Annual Tech Fest 2026
                </h2>

                <p className="mt-3 text-gray-500">
                  Join students, developers, and creators for an exciting day
                  of technology, innovation, competitions, and networking.
                </p>

                <div className="mt-6 space-y-3 border-t border-gray-100 pt-5">
                  <p className="text-sm text-gray-600">
                    📅 August 12, 2026
                  </p>

                  <p className="text-sm text-gray-600">
                    📍 College Main Auditorium
                  </p>

                  <p className="text-sm text-gray-600">
                    👥 245 students registered
                  </p>
                </div>

                <Link
                  to="/events/1"
                  className="mt-6 block rounded-lg bg-gray-900 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-gray-800"
                >
                  View Event
                </Link>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-purple-200 opacity-60"></div>
            <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-indigo-200 opacity-60"></div>
          </div>
        </div>
      </section>
{/* Upcoming Events Section */}
<section className="bg-white py-20">
  <div className="mx-auto max-w-7xl px-6 lg:px-8">

    {/* Section Header */}
    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
          What's Happening
        </p>

        <h2 className="mt-2 text-3xl font-bold text-gray-900 md:text-4xl">
          Upcoming Events
        </h2>

        <p className="mt-3 max-w-2xl text-gray-600">
          Discover exciting events happening around your campus and find
          something that interests you.
        </p>
      </div>

      <Link
        to="/events"
        className="font-semibold text-indigo-600 transition hover:text-indigo-700"
      >
        View All Events →
      </Link>
    </div>

    {/* Event Cards */}
    <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">

      {/* Event 1 */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
        <div className="flex h-48 items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
          <span className="text-6xl">💻</span>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between">
            <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
              Technology
            </span>

            <span className="text-sm text-gray-500">
              Aug 12
            </span>
          </div>

          <h3 className="mt-4 text-xl font-bold text-gray-900">
            Annual Tech Fest 2026
          </h3>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Explore technology, innovation, coding competitions and exciting
            workshops.
          </p>

          <div className="mt-5 space-y-2 text-sm text-gray-500">
            <p>📅 August 12, 2026</p>
            <p>📍 Main Auditorium</p>
          </div>

          <Link
            to="/events/1"
            className="mt-6 block font-semibold text-indigo-600"
          >
            View Details →
          </Link>
        </div>
      </div>

      {/* Event 2 */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
        <div className="flex h-48 items-center justify-center bg-gradient-to-br from-pink-500 to-orange-400">
          <span className="text-6xl">🎭</span>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between">
            <span className="rounded-full bg-pink-50 px-3 py-1 text-xs font-semibold text-pink-600">
              Cultural
            </span>

            <span className="text-sm text-gray-500">
              Aug 20
            </span>
          </div>

          <h3 className="mt-4 text-xl font-bold text-gray-900">
            Cultural Night
          </h3>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Celebrate music, dance, art and performances from talented
            students across campus.
          </p>

          <div className="mt-5 space-y-2 text-sm text-gray-500">
            <p>📅 August 20, 2026</p>
            <p>📍 College Ground</p>
          </div>

          <Link
            to="/events/2"
            className="mt-6 block font-semibold text-indigo-600"
          >
            View Details →
          </Link>
        </div>
      </div>

      {/* Event 3 */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
        <div className="flex h-48 items-center justify-center bg-gradient-to-br from-green-500 to-emerald-600">
          <span className="text-6xl">🏆</span>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between">
            <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-600">
              Sports
            </span>

            <span className="text-sm text-gray-500">
              Sep 05
            </span>
          </div>

          <h3 className="mt-4 text-xl font-bold text-gray-900">
            Campus Sports Meet
          </h3>

          <p className="mt-3 text-sm leading-6 text-gray-600">
            Compete with students across multiple sports and represent your
            department.
          </p>

          <div className="mt-5 space-y-2 text-sm text-gray-500">
            <p>📅 September 5, 2026</p>
            <p>📍 Sports Complex</p>
          </div>

          <Link
            to="/events/3"
            className="mt-6 block font-semibold text-indigo-600"
          >
            View Details →
          </Link>
        </div>
      </div>

    </div>
  </div>
</section>
 
 {/* Popular Clubs Section */}
<section className="bg-gray-50 py-20">
  <div className="mx-auto max-w-7xl px-6 lg:px-8">

    <div className="text-center">
      <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
        Find Your Community
      </p>

      <h2 className="mt-2 text-3xl font-bold text-gray-900 md:text-4xl">
        Popular Campus Clubs
      </h2>

      <p className="mx-auto mt-3 max-w-2xl text-gray-600">
        Connect with students who share your interests, learn new skills,
        and become part of an active campus community.
      </p>
    </div>

    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

      {/* Club 1 */}
      <Link
        to="/clubs/1"
        className="group rounded-2xl border border-gray-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-100 text-3xl">
          💻
        </div>

        <h3 className="mt-5 text-lg font-bold text-gray-900 group-hover:text-indigo-600">
          Coding Club
        </h3>

        <p className="mt-2 text-sm leading-6 text-gray-600">
          Build projects, solve coding challenges and explore new technologies.
        </p>

        <p className="mt-5 text-sm font-medium text-gray-500">
          250+ Members
        </p>
      </Link>

      {/* Club 2 */}
      <Link
        to="/clubs/2"
        className="group rounded-2xl border border-gray-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-pink-100 text-3xl">
          📸
        </div>

        <h3 className="mt-5 text-lg font-bold text-gray-900 group-hover:text-indigo-600">
          Photography Club
        </h3>

        <p className="mt-2 text-sm leading-6 text-gray-600">
          Capture campus moments and improve your photography skills.
        </p>

        <p className="mt-5 text-sm font-medium text-gray-500">
          180+ Members
        </p>
      </Link>

      {/* Club 3 */}
      <Link
        to="/clubs/3"
        className="group rounded-2xl border border-gray-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-green-100 text-3xl">
          🌱
        </div>

        <h3 className="mt-5 text-lg font-bold text-gray-900 group-hover:text-indigo-600">
          Eco Club
        </h3>

        <p className="mt-2 text-sm leading-6 text-gray-600">
          Make campus greener through sustainability and environmental initiatives.
        </p>

        <p className="mt-5 text-sm font-medium text-gray-500">
          120+ Members
        </p>
      </Link>

      {/* Club 4 */}
      <Link
        to="/clubs/4"
        className="group rounded-2xl border border-gray-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-orange-100 text-3xl">
          🎵
        </div>

        <h3 className="mt-5 text-lg font-bold text-gray-900 group-hover:text-indigo-600">
          Music Club
        </h3>

        <p className="mt-2 text-sm leading-6 text-gray-600">
          Perform, collaborate and connect with musicians across campus.
        </p>

        <p className="mt-5 text-sm font-medium text-gray-500">
          200+ Members
        </p>
      </Link>

    </div>

    <div className="mt-10 text-center">
      <Link
        to="/clubs"
        className="inline-flex rounded-xl border border-indigo-600 px-6 py-3 font-semibold text-indigo-600 transition hover:bg-indigo-600 hover:text-white"
      >
        Explore All Clubs →
      </Link>
    </div>

  </div>
</section>

{/* How It Works */}
<section className="bg-white py-20">
  <div className="mx-auto max-w-7xl px-6 lg:px-8">
    <div className="text-center">
      <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
        Simple & Easy
      </p>

      <h2 className="mt-2 text-3xl font-bold text-gray-900 md:text-4xl">
        Make the Most of Campus Life
      </h2>

      <p className="mx-auto mt-4 max-w-2xl text-gray-600">
        Discover opportunities, connect with communities and participate
        in activities that make your college experience memorable.
      </p>
    </div>

    <div className="mt-14 grid gap-10 md:grid-cols-3">
      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100 text-3xl">
          🔍
        </div>
        <h3 className="mt-5 text-xl font-bold text-gray-900">
          Discover
        </h3>
        <p className="mt-3 text-gray-600">
          Find upcoming events and explore clubs that match your interests.
        </p>
      </div>

      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-100 text-3xl">
          🤝
        </div>
        <h3 className="mt-5 text-xl font-bold text-gray-900">
          Connect
        </h3>
        <p className="mt-3 text-gray-600">
          Join clubs and connect with students who share your passions.
        </p>
      </div>

      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-green-100 text-3xl">
          🚀
        </div>
        <h3 className="mt-5 text-xl font-bold text-gray-900">
          Participate
        </h3>
        <p className="mt-3 text-gray-600">
          Register for events and build unforgettable campus experiences.
        </p>
      </div>
    </div>
  </div>
</section>

{/* CTA Section */}
<section className="px-6 py-20">
  <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-indigo-600 px-6 py-16 text-center shadow-xl md:px-12">
    <h2 className="text-3xl font-bold text-white md:text-4xl">
      Ready to Explore Your Campus?
    </h2>

    <p className="mx-auto mt-4 max-w-2xl text-lg text-indigo-100">
      Join CampusHub today and discover events, clubs and opportunities
      happening around your college.
    </p>

    <div className="mt-8 flex flex-wrap justify-center gap-4">
      <Link
        to="/register"
        className="rounded-xl bg-white px-6 py-3 font-semibold text-indigo-600 transition hover:bg-gray-100"
      >
        Create Your Account
      </Link>

      <Link
        to="/events"
        className="rounded-xl border border-indigo-300 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700"
      >
        Browse Events
      </Link>
    </div>
  </div>
</section>
    </main>
  );
}

export default Home;