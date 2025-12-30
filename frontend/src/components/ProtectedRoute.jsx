// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, hydrateAuth } = useAuthStore();

  // Restore auth from localStorage on refresh
  if (!isAuthenticated) {
    const token = localStorage.getItem("token");

    if (token) {
      hydrateAuth();
      return children;
    }

    return <Navigate to="/login" replace />;
  }

  return children;
}
