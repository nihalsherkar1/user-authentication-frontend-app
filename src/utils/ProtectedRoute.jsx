import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRole }) {
  const userRole = sessionStorage.getItem("role");

  if (!userRole) {
    return <Navigate to={"/"} replace />;
  }

  if (userRole !== allowedRole) {
    return <Navigate to={"/dashboard"} replace />;
  }

  return children;
}
