import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Used as a layout route wrapping every page that requires login (see
// App.jsx) — renders the matched child route via <Outlet/> once
// authenticated, otherwise bounces to /login and remembers where to
// return afterward.
export default function ProtectedRoute() {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return null;
  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  return <Outlet />;
}
