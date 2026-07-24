import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import { useAdmin } from "../context/AdminContext";

function AdminLogin() {
  const navigate = useNavigate();
  const { adminLogin } = useAdmin();

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
    const result = await adminLogin(
      formData.email,
      formData.password
    );

    if (result.success) {
      navigate("/admin");
    } else {
      setError(result.message);
    }
  } finally {
    setSubmitting(false);
  }
};

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 py-16">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-white shadow-2xl lg:grid-cols-[0.95fr_1.05fr]">
        <section className="hidden bg-slate-900 p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500">
            <ShieldCheck className="h-7 w-7" />
          </div>

          <div>
            <p className="ch-eyebrow text-indigo-300">Admin access</p>
            <h1 className="mt-4 text-4xl font-black tracking-tight">
              Manage CampusHub with clarity.
            </h1>
            <p className="mt-4 text-sm leading-6 text-slate-300">
              Sign in to manage events, clubs, students, and registrations from
              a focused administrative workspace.
            </p>
          </div>
        </section>

        <section className="p-8 sm:p-10">
          <div className="text-center lg:text-left">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 lg:mx-0">
              <ShieldCheck className="h-7 w-7" />
            </div>

            <h1 className="mt-6 text-3xl font-black tracking-tight text-slate-950">
              CampusHub Admin
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Sign in to manage the CampusHub platform.
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
                Admin Email
              </label>
              <div className="mt-2 flex items-center gap-3 rounded-xl border border-slate-200 px-4 focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-100">
                <Mail className="h-5 w-5 text-slate-400" />
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="admin@campushub.com"
                  className="w-full bg-transparent py-3 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-bold text-slate-700">
                Password
              </label>
              <div className="mt-2 flex items-center gap-3 rounded-xl border border-slate-200 px-4 focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-100">
                <LockKeyhole className="h-5 w-5 text-slate-400" />
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter admin password"
                  className="w-full bg-transparent py-3 outline-none"
                />
              </div>
            </div>

            <button type="submit" disabled={submitting} className="ch-button-primary w-full">
              {submitting ? "Signing in..." : "Sign In to Dashboard"}
            </button>
          </form>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-500">
            <p className="font-bold text-slate-700">Temporary development login:</p>
            <p className="mt-2">Email: admin@campushub.com</p>
            <p>Password: admin123</p>
          </div>
        </section>
      </div>
    </main>
  );
}

export default AdminLogin;
