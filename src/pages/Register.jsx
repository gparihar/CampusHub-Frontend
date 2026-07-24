import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { BookOpen, GraduationCap, LockKeyhole, Mail, UserRound } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import api from "../api/api";

function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    course: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setSubmitting(true);
    await api.post("/auth/register", formData);

    const result = await login(
      formData.email,
      formData.password
    );

    if (result.success) {
      navigate("/dashboard");
    }
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
      "Registration failed"
    );
  } finally {
    setSubmitting(false);
  }
};

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-16">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl shadow-slate-200/70 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="p-8 sm:p-10">
          <div className="text-center lg:text-left">
            <Link to="/" className="inline-flex items-center gap-2 text-2xl font-black text-slate-950">
              <GraduationCap className="h-7 w-7 text-indigo-600" />
              Campus<span className="text-indigo-600">Hub</span>
            </Link>

            <h1 className="mt-6 text-3xl font-black tracking-tight text-slate-950">
              Create your account
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Join your campus community today.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label className="text-sm font-bold text-slate-700">
                Full Name
              </label>
              <div className="mt-2 flex items-center gap-3 rounded-xl border border-slate-200 px-4 focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-100">
                <UserRound className="h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full bg-transparent py-3 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-bold text-slate-700">
                Email Address
              </label>
              <div className="mt-2 flex items-center gap-3 rounded-xl border border-slate-200 px-4 focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-100">
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
                Course
              </label>
              <div className="mt-2 flex items-center gap-3 rounded-xl border border-slate-200 px-4 focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-100">
                <BookOpen className="h-5 w-5 text-slate-400" />
                <select
                  name="course"
                  required
                  value={formData.course}
                  onChange={handleChange}
                  className="w-full bg-transparent py-3 outline-none"
                >
                  <option value="">Select your course</option>
                  <option value="BCA">BCA</option>
                  <option value="BBA">BBA</option>
                  <option value="BCom">B.Com</option>
                  <option value="BA">BA</option>
                  <option value="Other">Other</option>
                </select>
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
                  minLength="6"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Minimum 6 characters"
                  className="w-full bg-transparent py-3 outline-none"
                />
              </div>
            </div>

            <button type="submit" disabled={submitting} className="ch-button-primary w-full">
              {submitting ? "Creating..." : "Create Account"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link to="/login" className="font-bold text-indigo-600 hover:text-indigo-700">
              Login
            </Link>
          </p>
        </section>

        <section className="hidden bg-slate-950 p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500">
            <GraduationCap className="h-7 w-7" />
          </div>

          <div>
            <p className="ch-eyebrow text-indigo-300">Start strong</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight">
              Turn campus opportunities into a clear plan.
            </h2>
            <p className="mt-4 text-sm leading-6 text-slate-300">
              Your account gives you access to event registrations, club
              memberships, and your personal dashboard.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Register;
