import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const isLoggedIn = window.localStorage.getItem("loggedIn") === "true";

  localStorage.getItem("loggedIn");
  localStorage.getItem("userType");
  localStorage.getItem("token");

  return isLoggedIn ? <Outlet /> : <Navigate to="/auth/signup" />;
}

export default ProtectedRoute;
