import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";

function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [registered, setRegistered] = useState(false);

  useEffect(() => {
    fetchEvent();
  }, []);

  const fetchEvent = async () => {
    try {
      const res = await api.get("/events");

      const foundEvent = res.data.events.find(
        (e) => e._id === id
      );

      setEvent(foundEvent || null);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      const token = localStorage.getItem("campushub-token");

      await api.post(
        "/registrations",
        {
          eventId: event._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRegistered(true);
      alert("Successfully registered!");
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Registration failed"
      );
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-xl">
        Loading...
      </div>
    );
  }

  if (!event) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-3xl font-bold">
          Event Not Found
        </h1>

        <Link
          to="/events"
          className="mt-6 inline-block text-indigo-600"
        >
          Back to Events
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-indigo-600 to-purple-700 py-20 text-white">
        <div className="mx-auto max-w-6xl px-6">

          <Link
            to="/events"
            className="text-indigo-200"
          >
            ← Back
          </Link>

          <h1 className="mt-6 text-5xl font-bold">
            {event.title}
          </h1>

          <p className="mt-4 text-lg">
            {event.description}
          </p>

          <div className="mt-8 space-y-2">
            <p>📅 {new Date(event.date).toLocaleDateString()}</p>
            <p>📍 {event.venue}</p>
            <p>🏢 {event.club}</p>
            <p>👥 Max Participants: {event.maxParticipants}</p>
          </div>

          <button
            onClick={handleRegister}
            disabled={registered}
            className={`mt-10 rounded-xl px-8 py-3 font-semibold ${
              registered
                ? "bg-green-600"
                : "bg-white text-indigo-700"
            }`}
          >
            {registered
              ? "Registered"
              : "Register Now"}
          </button>
        </div>
      </section>
    </main>
  );
}

export default EventDetails;