import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  MapPin,
  Tag,
  UsersRound,
} from "lucide-react";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";
import ApiErrorState from "../components/ApiErrorState";

function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [registered, setRegistered] = useState(false);
  const [registering, setRegistering] = useState(false);

  useEffect(() => {
    fetchEvent();
  }, []);

  const fetchEvent = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await api.get("/events");

      const foundEvent = res.data.events.find(
        (e) => e._id === id
      );

      setEvent(foundEvent || null);
    } catch (err) {
      console.error(err);
      setError("Failed to load event details");
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
      setRegistering(true);
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
      toast.success("Successfully registered!");
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Registration failed"
      );
    } finally {
      setRegistering(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-xl">
        <LoadingSpinner text="Loading event..." />
      </div>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-20">
        <div className="mx-auto max-w-3xl">
          <ApiErrorState message={error} onRetry={fetchEvent} />
        </div>
      </main>
    );
  }

  if (!event) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-6">
        <div className="ch-card max-w-md p-10 text-center">
          <h1 className="text-3xl font-black text-slate-950">
            Event Not Found
          </h1>

          <Link to="/events" className="ch-button-primary mt-6">
            Back to Events
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="border-b border-slate-200 bg-white py-12">
        <div className="ch-container">
          <Link
            to="/events"
            className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-800"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Events
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_360px]">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-2 text-sm font-bold text-indigo-700">
                <Tag className="h-4 w-4" />
                {event.category}
              </span>

              <h1 className="mt-6 max-w-4xl text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
                {event.title}
              </h1>

              <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
                {event.description}
              </p>
            </div>

            <aside className="ch-card p-6">
              <div className="space-y-4">
                <p className="flex items-center gap-3 text-sm font-semibold text-slate-600">
                  <CalendarDays className="h-5 w-5 text-indigo-600" />
                  {new Date(event.date).toLocaleDateString()}
                </p>
                <p className="flex items-center gap-3 text-sm font-semibold text-slate-600">
                  <MapPin className="h-5 w-5 text-indigo-600" />
                  {event.location}
                </p>
                <p className="flex items-center gap-3 text-sm font-semibold text-slate-600">
                  <UsersRound className="h-5 w-5 text-indigo-600" />
                  Max Participants: {event.maxParticipants}
                </p>
              </div>

              <button
                onClick={handleRegister}
                disabled={registered || registering}
                className={`mt-6 w-full rounded-xl px-6 py-3 font-bold transition ${
                  registered
                    ? "bg-emerald-600 text-white"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                }`}
              >
                {registered
                  ? "Registered"
                  : registering
                    ? "Registering..."
                    : "Register Now"}
              </button>
            </aside>
          </div>
        </div>
      </section>

      <section className="ch-container py-12">
        <div className="grid gap-6 md:grid-cols-3">
          {["Easy registration", "Campus verified", "Student focused"].map((item) => (
            <div key={item} className="ch-card p-6">
              <CheckCircle2 className="h-6 w-6 text-emerald-600" />
              <h3 className="mt-4 font-bold text-slate-950">{item}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Keep your campus participation organized from your student dashboard.
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default EventDetails;
