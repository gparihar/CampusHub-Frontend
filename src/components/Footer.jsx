import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>
            <Link
              to="/"
              className="text-2xl font-bold tracking-tight text-white"
            >
              Campus<span className="text-indigo-500">Hub</span>
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-6 text-gray-400">
              Your digital campus community. Discover events, join clubs,
              connect with students and make your college experience better.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="font-semibold text-white">Explore</h3>

            <div className="mt-4 flex flex-col gap-3 text-sm">
              <Link
                to="/events"
                className="transition hover:text-indigo-400"
              >
                Events
              </Link>

              <Link
                to="/clubs"
                className="transition hover:text-indigo-400"
              >
                Clubs
              </Link>

              <Link
                to="/gallery"
                className="transition hover:text-indigo-400"
              >
                Gallery
              </Link>
            </div>
          </div>

          {/* CampusHub */}
          <div>
            <h3 className="font-semibold text-white">CampusHub</h3>

            <div className="mt-4 flex flex-col gap-3 text-sm">
              <Link
                to="/about"
                className="transition hover:text-indigo-400"
              >
                About Us
              </Link>

              <Link
                to="/contact"
                className="transition hover:text-indigo-400"
              >
                Contact
              </Link>

              <Link
                to="/login"
                className="transition hover:text-indigo-400"
              >
                Student Login
              </Link>
            </div>
          </div>

          {/* Join */}
          <div>
            <h3 className="font-semibold text-white">
              Join the Community
            </h3>

            <p className="mt-4 text-sm leading-6 text-gray-400">
              Create your account and start exploring your campus.
            </p>

            <Link
              to="/register"
              className="mt-5 inline-block rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500"
            >
              Get Started
            </Link>
          </div>

        </div>

        {/* Bottom Footer */}
        <div className="mt-12 flex flex-col gap-4 border-t border-gray-800 pt-8 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © 2026 CampusHub. All rights reserved.
          </p>

          <p>
            Built for students, by students.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;