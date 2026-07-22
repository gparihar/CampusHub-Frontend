import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import ManageEvents from "./admin/ManageEvents";
import ManageClubs from "./admin/ManageClubs";
import ManageStudents from "./admin/ManageStudents";

import AdminProtectedRoute from "./components/AdminProtectedRoute";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import Clubs from "./pages/Clubs";
import ClubDetails from "./pages/ClubDetails";
import Gallery from "./pages/Gallery";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./dashboard/Dashboard";
import MyEvents from "./dashboard/MyEvents";
import MyClubs from "./dashboard/MyClubs";
import Profile from "./dashboard/Profile";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route
  path="/admin/login"
  element={<AdminLogin />}
/>

<Route
  path="/admin"
  element={
    <AdminProtectedRoute>
      <AdminDashboard />
    </AdminProtectedRoute>
  }
/>

<Route
  path="/admin/events"
  element={
    <AdminProtectedRoute>
      <ManageEvents />
    </AdminProtectedRoute>
  }
/>

<Route
  path="/admin/clubs"
  element={
    <AdminProtectedRoute>
      <ManageClubs />
    </AdminProtectedRoute>
  }
/>

<Route
  path="/admin/students"
  element={
    <AdminProtectedRoute>
      <ManageStudents />
    </AdminProtectedRoute>
  }
/>

        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetails />} />

        <Route path="/clubs" element={<Clubs />} />
        <Route path="/clubs/:id" element={<ClubDetails />} />

        <Route path="/gallery" element={<Gallery />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/events" element={<MyEvents />} />
        <Route path="/dashboard/clubs" element={<MyClubs />} />
        <Route path="/dashboard/profile" element={<Profile />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;