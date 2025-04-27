import { useSelector } from "react-redux";
import { Navigate,useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, requiredRole }) => {
  const location=useLocation();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const role = useSelector((state) => state.auth.role);

  // Not logged in
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />
  }

  // If role(s) are provided, check if current role is allowed
  if (requiredRole) {
    const allowedRoles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
    if (!allowedRoles.includes(role)) {
      return <Navigate to="/login" state={{ from: location.pathname }} replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
