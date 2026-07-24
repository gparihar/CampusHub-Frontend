import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GraduationCap, LockKeyhole, Mail } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  setSubmitting(true);

  try {
    const result = await login(
      formData.email,
      formData.password
    );

    if (result.success) {
      navigate("/dashboard");
    } else {
      setError(result.message);
    }
  } finally {
    setSubmitting(false);
  }
};

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-16">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl shadow-slate-200/70 lg:grid-cols-[0.95fr_1.05fr]">
        <section className="hidden bg-slate-950 p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <Link to="/" className="flex items-center gap-2 text-2xl font-black">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-500">
              <GraduationCap className="h-6 w-6" />
            </span>
            Campus<span className="text-indigo-300">Hub</span>
          </Link>

          <div>
            <p className="ch-eyebrow text-indigo-300">Student access</p>
            <h1 className="mt-4 text-4xl font-black tracking-tight">
              Your campus dashboard is ready.
            </h1>
            <p className="mt-4 text-sm leading-6 text-slate-300">
              Sign in to manage registrations, clubs, and your CampusHub
              profile from one clean workspace.
            </p>
          </div>
        </section>

        <section className="p-8 sm:p-10">
          <div className="text-center lg:text-left">
            <Link to="/" className="inline-flex items-center gap-2 text-2xl font-black text-slate-950 lg:hidden">
              <GraduationCap className="h-7 w-7 text-indigo-600" />
              Campus<span className="text-indigo-600">Hub</span>
            </Link>

            <h1 className="mt-6 text-3xl font-black tracking-tight text-slate-950">
              Welcome back
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Login to access your CampusHub account.
            </p>
          </div>

          {error && (
            <div className="mt-6 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm font-medium text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label className="text-sm font-bold text-slate-700">
                Email Address
              </label>

              <div className="mt-2 flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-100">
                <Mail className="h-5 w-5 text-slate-400" />
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="student@example.com"
                  className="w-full bg-transparent py-3 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-bold text-slate-700">
                Password
              </label>

              <div className="mt-2 flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-100">
                <LockKeyhole className="h-5 w-5 text-slate-400" />
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full bg-transparent py-3 outline-none"
                />
              </div>
            </div>

            <button type="submit" disabled={submitting} className="ch-button-primary w-full">
              {submitting ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Don't have an account?{" "}
            <Link to="/register" className="font-bold text-indigo-600 hover:text-indigo-700">
              Create Account
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}

export default Login;
