import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";

function AdminLogin() {
  const navigate = useNavigate();
  const { adminLogin } = useAdmin();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const result = await adminLogin(
    formData.email,
    formData.password
  );

  if (result.success) {
    navigate("/admin");
  } else {
    setError(result.message);
  }
};

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-950 px-6">

      <div className="w-full max-w-md rounded-2xl border border-gray-800 bg-gray-900 p-8 shadow-2xl">

        <div className="text-center">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-indigo-600 text-2xl">
            🛡️
          </div>

          <h1 className="mt-5 text-2xl font-bold text-white">
            CampusHub Admin
          </h1>

          <p className="mt-2 text-sm text-gray-400">
            Sign in to manage the CampusHub platform.
          </p>

        </div>

        {error && (
          <div className="mt-6 rounded-lg bg-red-500/10 p-3 text-sm text-red-400">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >

          <div>
            <label className="text-sm font-medium text-gray-300">
              Admin Email
            </label>

            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="admin@campushub.com"
              className="mt-2 w-full rounded-xl border border-gray-700 bg-gray-800 px-4 py-3 text-white outline-none transition focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-300">
              Password
            </label>

            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter admin password"
              className="mt-2 w-full rounded-xl border border-gray-700 bg-gray-800 px-4 py-3 text-white outline-none transition focus:border-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-500"
          >
            Sign In to Dashboard
          </button>

        </form>

        {/* Temporary */}
        <div className="mt-6 rounded-xl bg-gray-800 p-4 text-xs text-gray-400">
          <p>Temporary development login:</p>
          <p className="mt-2">
            Email: admin@campushub.com
          </p>
          <p>Password: admin123</p>
        </div>

      </div>

    </main>
  );
}

export default AdminLogin;