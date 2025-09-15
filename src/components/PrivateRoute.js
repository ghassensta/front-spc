// src/components/PrivateRoute.js
import { Navigate } from "react-router-dom";
import { useAuth } from "src/sections/auth/contexts/AuthContext";

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <p>Chargement...</p>; // ou un spinner
  }

  if (!user) {
    return <Navigate to="/login" replace />; // Redirige vers login
  }

  return children;
}
