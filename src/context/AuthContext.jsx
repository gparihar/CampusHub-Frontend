import { createContext, useContext, useState } from "react";
import api from "../api/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("campushub-user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [registeredEvents, setRegisteredEvents] = useState(() => {
    const savedEvents = localStorage.getItem("campushub-events");
    return savedEvents ? JSON.parse(savedEvents) : [];
  });

  const [joinedClubs, setJoinedClubs] = useState(() => {
    const savedClubs = localStorage.getItem("campushub-clubs");
    return savedClubs ? JSON.parse(savedClubs) : [];
  });

  // Login
 const login = async (email, password) => {
  try {
    const res = await api.post("/auth/login", {
      email,
      password,
    });

    const { user, token } = res.data;

    setUser(user);

    localStorage.setItem(
      "campushub-user",
      JSON.stringify(user)
    );

    localStorage.setItem(
      "campushub-token",
      token
    );

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message ||
        "Login failed",
    };
  }
};

  // Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("campushub-user");
localStorage.removeItem("campushub-token");
  };

  // Register for Event
  const registerEvent = (event) => {
    const alreadyRegistered = registeredEvents.some(
      (item) => item.id === event.id
    );

    if (alreadyRegistered) {
      return false;
    }

    const updatedEvents = [...registeredEvents, event];

    setRegisteredEvents(updatedEvents);

    localStorage.setItem(
      "campushub-events",
      JSON.stringify(updatedEvents)
    );

    return true;
  };

  // Join Club
  const joinClub = (club) => {
    const alreadyJoined = joinedClubs.some(
      (item) => item.id === club.id
    );

    if (alreadyJoined) {
      return false;
    }

    const updatedClubs = [...joinedClubs, club];

    setJoinedClubs(updatedClubs);

    localStorage.setItem(
      "campushub-clubs",
      JSON.stringify(updatedClubs)
    );

    return true;
  };

  // Cancel Event Registration
const removeEvent = (eventId) => {
  const updatedEvents = registeredEvents.filter(
    (event) => event.id !== eventId
  );

  setRegisteredEvents(updatedEvents);

  localStorage.setItem(
    "campushub-events",
    JSON.stringify(updatedEvents)
  );
};

// Leave Club
const leaveClub = (clubId) => {
  const updatedClubs = joinedClubs.filter(
    (club) => club.id !== clubId
  );

  setJoinedClubs(updatedClubs);

  localStorage.setItem(
    "campushub-clubs",
    JSON.stringify(updatedClubs)
  );
};

  return (
    <AuthContext.Provider
      value={{
         user,
    login,
    logout,
    registeredEvents,
    joinedClubs,
    registerEvent,
    joinClub,
    removeEvent,
    leaveClub,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}