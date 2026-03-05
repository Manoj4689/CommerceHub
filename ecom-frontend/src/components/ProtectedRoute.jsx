import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import AuthContext from "../Context/AuthContext";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, user, isLoading } = useContext(AuthContext);
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="container mt-5 pt-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return (
      <div className="container mt-5 pt-5">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Access Denied</h4>
          <p>You do not have permission to access this page.</p>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
