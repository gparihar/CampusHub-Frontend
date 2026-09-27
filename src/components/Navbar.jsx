import { NavLink, Link, useNavigate } from "react-router-dom";
import {
  GraduationCap,
  LayoutDashboard,
  LogIn,
  LogOut,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Events", path: "/events" },
    { name: "Clubs", path: "/clubs" },
    { name: "Gallery", path: "/gallery" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Admin", path: "/admin/login", icon: ShieldCheck },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
      <div className="ch-container flex items-center justify-between py-4">
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold tracking-tight text-slate-950"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-200">
            <GraduationCap className="h-5 w-5" />
          </span>
          Campus<span className="text-indigo-600">Hub</span>
        </Link>

        <div className="hidden items-center gap-2 lg:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `inline-flex items-center rounded-full px-3 py-2 text-sm font-semibold transition ${
                  isActive
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                }`
              }
            >
              {item.icon && <item.icon className="mr-1.5 h-4 w-4" />}
              {item.name}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="hidden items-center gap-2 text-sm font-semibold text-slate-700 transition hover:text-indigo-600 sm:flex"
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>

              <div className="hidden items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-2 md:flex">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
                  {user.name?.charAt(0).toUpperCase()}
                </div>

                <span className="text-sm font-semibold text-indigo-700">
                  {user.name}
                </span>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="ch-button-secondary hover:border-red-200 hover:bg-red-50 hover:text-red-600"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hidden items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:text-indigo-600 sm:flex"
              >
                <LogIn className="h-4 w-4" />
                Login
              </Link>

              <Link to="/register" className="ch-button-primary">
                <UserRound className="h-4 w-4" />
                Join CampusHub
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
