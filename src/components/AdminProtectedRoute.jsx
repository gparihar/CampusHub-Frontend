import { Navigate } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";

function AdminProtectedRoute({ children }) {
  const { admin } = useAdmin();

  if (!admin) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}

export default AdminProtectedRoute;