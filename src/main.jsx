import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import "./index.css";

import App from "./App.jsx";

import { AuthProvider } from "./context/AuthContext.jsx";
import { AdminProvider } from "./context/AdminContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <AdminProvider>
        <App />
        <Toaster position="top-right" />
      </AdminProvider>
    </AuthProvider>
  </StrictMode>
);
