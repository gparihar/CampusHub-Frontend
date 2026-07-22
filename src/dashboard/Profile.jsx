import { useState } from "react";
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
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-5xl px-6 py-12">

        {/* Header */}
        <div>
          <p className="text-sm font-semibold text-indigo-600">
            MY CAMPUSHUB
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            My Profile
          </h1>

          <p className="mt-2 text-gray-500">
            View and manage your CampusHub account information.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-3">

          {/* Profile Card */}
          <div>
            <div className="rounded-2xl border border-gray-200 bg-white p-7 text-center shadow-sm">

              {/* Avatar */}
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-indigo-600 text-4xl font-bold text-white">
                {user?.name?.charAt(0).toUpperCase()}
              </div>

              <h2 className="mt-5 text-xl font-bold text-gray-900">
                {user?.name}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {user?.email}
              </p>

              <span className="mt-4 inline-block rounded-full bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-600">
                {user?.course || "Student"}
              </span>

              <div className="mt-6 border-t border-gray-100 pt-6">
                <p className="text-sm text-green-600">
                  ● Active Student Account
                </p>
              </div>

            </div>
          </div>

          {/* Edit Profile */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">

              <h2 className="text-xl font-bold text-gray-900">
                Personal Information
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                Update your personal and academic information.
              </p>

              {message && (
                <div className="mt-6 rounded-xl bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                  ✓ {message}
                </div>
              )}

              <form
                onSubmit={handleSubmit}
                className="mt-8 space-y-6"
              >

                {/* Name */}
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  />
                </div>

                {/* Course */}
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Course
                  </label>

                  <select
                    name="course"
                    required
                    value={formData.course}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-indigo-500"
                  >
                    <option value="">Select Course</option>
                    <option value="BCA">BCA</option>
                    <option value="BBA">BBA</option>
                    <option value="BCom">B.Com</option>
                    <option value="BA">BA</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700"
                >
                  Save Changes
                </button>

              </form>

            </div>
          </div>

        </div>

      </div>
    </main>
  );
}

export default Profile;