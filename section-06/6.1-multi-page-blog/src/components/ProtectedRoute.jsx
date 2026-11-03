import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../AuthContext";

// Wrap a page with this to make it login-only.
function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // send to login and remember the page the user wanted
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
}

export default ProtectedRoute;
