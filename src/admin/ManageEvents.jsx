import { useEffect, useMemo, useState } from "react";
import api from "../api/api";

function ManageEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    date: "",
    maxParticipants: "",
  });

  const token = localStorage.getItem("adminToken");

  const fetchEvents = async () => {
    try {
      setLoading(true);

      const res = await api.get("/events");
      setEvents(res.data.events || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const filteredEvents = useMemo(() => {
    return events.filter((event) =>
      event.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [events, search]);

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category: "",
      location: "",
      date: "",
      maxParticipants: "",
    });

    setEditingEvent(null);
  };

  const handleCreateEvent = async () => {
    try {
      await api.post("/events", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Event created successfully!");

      resetForm();
      setShowModal(false);
      fetchEvents();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to create event");
    }
  };

  const handleUpdateEvent = async () => {
    try {
      await api.put(`/events/${editingEvent._id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Event updated successfully!");

      resetForm();
      setShowModal(false);
      fetchEvents();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to update event");
    }
  };

  const handleDeleteEvent = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/events/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Event deleted successfully!");

      fetchEvents();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to delete event");
    }
  };

  return (
  <div className="p-8">
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold">Manage Events</h1>

      <div className="flex gap-3">
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
        >
          + Add Event
        </button>

        <input
          type="text"
          placeholder="Search events..."
          className="border rounded-lg px-4 py-2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </div>

    {loading ? (
      <p>Loading events...</p>
    ) : filteredEvents.length === 0 ? (
      <p>No events found.</p>
    ) : (
      <table className="w-full border rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Title</th>
            <th className="text-left">Category</th>
            <th className="text-left">Date</th>
            <th className="text-left">Location</th>
            <th className="text-left">Max</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredEvents.map((event) => (
            <tr key={event._id} className="border-t hover:bg-gray-50">
              <td className="p-3">{event.title}</td>

              <td>{event.category}</td>

              <td>{new Date(event.date).toLocaleDateString()}</td>

              <td>{event.location}</td>

              <td>{event.maxParticipants}</td>

              <td className="text-center">
                <button
                  className="text-blue-600 mr-4 hover:underline"
                  onClick={() => {
                    setEditingEvent(event);

                    setFormData({
                      title: event.title,
                      description: event.description,
                      category: event.category,
                      location: event.location,
                      date: event.date.split("T")[0],
                      maxParticipants: event.maxParticipants,
                    });

                    setShowModal(true);
                  }}
                >
                  Edit
                </button>

                <button
                  className="text-red-600 hover:underline"
                  onClick={() => handleDeleteEvent(event._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}

    {showModal && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 w-[500px]">
          <h2 className="text-2xl font-bold mb-5">
            {editingEvent ? "Edit Event" : "Add Event"}
          </h2>

          <div className="space-y-3">
            <input
              type="text"
              placeholder="Title"
              className="w-full border rounded p-2"
              value={formData.title}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  title: e.target.value,
                })
              }
            />

            <textarea
              placeholder="Description"
              className="w-full border rounded p-2"
              value={formData.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: e.target.value,
                })
              }
            />

            <input
              type="text"
              placeholder="Category"
              className="w-full border rounded p-2"
              value={formData.category}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  category: e.target.value,
                })
              }
            />

            <input
              type="text"
              placeholder="Location"
              className="w-full border rounded p-2"
              value={formData.location}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  location: e.target.value,
                })
              }
            />

            <input
              type="date"
              className="w-full border rounded p-2"
              value={formData.date}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  date: e.target.value,
                })
              }
            />

            <input
              type="number"
              placeholder="Max Participants"
              className="w-full border rounded p-2"
              value={formData.maxParticipants}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  maxParticipants: e.target.value,
                })
              }
            />
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={() => {
                resetForm();
                setShowModal(false);
              }}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>

            <button
              onClick={() =>
                editingEvent
                  ? handleUpdateEvent()
                  : handleCreateEvent()
              }
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              {editingEvent ? "Update Event" : "Create Event"}
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
);
}

export default ManageEvents;