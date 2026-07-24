import { useState } from "react";
import { BadgeCheck, BookOpen, Mail, Save, UserRound } from "lucide-react";
import { useAuth } from "../context/AuthContext";

function Profile() {
  const { user, login } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    course: user?.course || "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setMessage("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Update logged-in user
    login(formData);

    // Update saved account while keeping password
    const savedAccount = JSON.parse(
      localStorage.getItem("campushub-account")
    );

    if (savedAccount) {
      const updatedAccount = {
        ...savedAccount,
        name: formData.name,
        email: formData.email,
        course: formData.course,
      };

      localStorage.setItem(
        "campushub-account",
        JSON.stringify(updatedAccount)
      );
    }

    setMessage("Profile updated successfully!");
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="ch-container py-12">
        <section className="ch-card p-8">
          <p className="ch-eyebrow">My CampusHub</p>
          <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-950">
            My Profile
          </h1>
          <p className="mt-2 text-slate-500">
            View and manage your CampusHub account information.
          </p>
        </section>

        <div className="mt-8 grid gap-8 lg:grid-cols-[340px_1fr]">
          <div className="ch-card p-7 text-center">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-[2rem] bg-indigo-600 text-4xl font-black text-white shadow-lg shadow-indigo-200">
              {user?.name?.charAt(0).toUpperCase()}
            </div>

            <h2 className="mt-5 text-xl font-black text-slate-950">
              {user?.name}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {user?.email}
            </p>

            <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-2 text-sm font-bold text-indigo-700">
              <BookOpen className="h-4 w-4" />
              {user?.course || "Student"}
            </span>

            <div className="mt-6 border-t border-slate-100 pt-6">
              <p className="inline-flex items-center gap-2 text-sm font-bold text-emerald-600">
                <BadgeCheck className="h-4 w-4" />
                Active Student Account
              </p>
            </div>
          </div>

          <div className="ch-card p-8">
            <h2 className="text-2xl font-black text-slate-950">
              Personal Information
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Update your personal and academic information.
            </p>

            {message && (
              <div className="mt-6 rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700">
                {message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
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
                    <option value="">Select Course</option>
                    <option value="BCA">BCA</option>
                    <option value="BBA">BBA</option>
                    <option value="BCom">B.Com</option>
                    <option value="BA">BA</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="ch-button-primary">
                <Save className="h-4 w-4" />
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Profile;
