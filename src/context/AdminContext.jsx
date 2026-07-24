import { createContext, useContext, useState } from "react";
import api from "../api/api";

const AdminContext = createContext();

export function AdminProvider({ children }) {
  const [admin, setAdmin] = useState(() => {
    const savedAdmin = localStorage.getItem("campushub-admin");
    return savedAdmin ? JSON.parse(savedAdmin) : null;
  });

  const adminLogin = async (email, password) => {
  try {
    const res = await api.post("/auth/login", {
      email,
      password,
    });

    const { token, user } = res.data;

    if (user.role !== "admin") {
      throw new Error("Access denied");
    }

    setAdmin(user);

    localStorage.setItem(
      "campushub-admin",
      JSON.stringify(user)
    );

    localStorage.setItem("adminToken", token);

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      message:
        error.response?.data?.message ||
        error.message ||
        "Login failed",
    };
  }
};

  const adminLogout = () => {
    setAdmin(null);
    localStorage.removeItem("campushub-admin");
    localStorage.removeItem("adminToken");
  };

  return (
    <AdminContext.Provider
      value={{
        admin,
        adminLogin,
        adminLogout,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  return useContext(AdminContext);
}
