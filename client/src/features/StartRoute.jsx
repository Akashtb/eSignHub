import { useSelector } from "react-redux";
import { selectCurrentRole } from "./redux/auth/AuthSlice";
import { Navigate, useLocation } from "react-router";

const RoleRedirect = ({ children }) => {
  const role = useSelector(selectCurrentRole);
  const location = useLocation();
  console.log("Current Role:", role, "Path:", location.pathname);

  if (role === "Student") {
    return <Navigate to="/student/requestLetter" replace />;
  } else if (["Principal", "Tutor", "HOD"].includes(role)) {
    return <Navigate to="/dashboard" replace />;
  }

  if (role === null) {
    if (
      location.pathname === "/login" ||
      location.pathname === "/studentRegister" ||
      location.pathname === "/landingPage"
    ) {
      return children;
    }
    return <Navigate to="/landingPage" replace />;
  }

  return children ?? <Navigate to="/landingPage" replace />;
};

export default RoleRedirect;
