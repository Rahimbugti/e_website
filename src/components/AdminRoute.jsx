import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AdminRoute({ children }) {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!profile) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (profile.role?.toLowerCase() !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default AdminRoute;