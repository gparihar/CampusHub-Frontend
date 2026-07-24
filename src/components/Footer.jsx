import { Link } from "react-router-dom";
import { ArrowRight, GraduationCap, HeartHandshake } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="ch-container py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link
              to="/"
              className="flex items-center gap-2 text-2xl font-bold tracking-tight text-white"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-500 text-white">
                <GraduationCap className="h-5 w-5" />
              </span>
              Campus<span className="text-indigo-400">Hub</span>
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-6 text-slate-400">
              Your digital campus community. Discover events, join clubs,
              connect with students and make your college experience better.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white">Explore</h3>

            <div className="mt-4 flex flex-col gap-3 text-sm text-slate-400">
              <Link to="/events" className="transition hover:text-indigo-400">
                Events
              </Link>

              <Link to="/clubs" className="transition hover:text-indigo-400">
                Clubs
              </Link>

              <Link to="/gallery" className="transition hover:text-indigo-400">
                Gallery
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white">CampusHub</h3>

            <div className="mt-4 flex flex-col gap-3 text-sm text-slate-400">
              <Link to="/about" className="transition hover:text-indigo-400">
                About Us
              </Link>

              <Link to="/contact" className="transition hover:text-indigo-400">
                Contact
              </Link>

              <Link to="/login" className="transition hover:text-indigo-400">
                Student Login
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white">Join the Community</h3>

            <p className="mt-4 text-sm leading-6 text-slate-400">
              Create your account and start exploring your campus.
            </p>

            <Link
              to="/register"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-400"
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-slate-800 pt-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright 2026 CampusHub. All rights reserved.</p>

          <p className="inline-flex items-center gap-2">
            <HeartHandshake className="h-4 w-4 text-indigo-400" />
            Built for students, by students.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
