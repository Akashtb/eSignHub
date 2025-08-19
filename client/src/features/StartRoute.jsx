import { useSelector } from "react-redux";
import { selectCurrentRole } from "./redux/auth/AuthSlice";
import { Navigate } from "react-router";

const RoleRedirect = ({ children }) => {
  const role = useSelector(selectCurrentRole);


  if (role === "Student") {
    return <Navigate to="/student/requestLetter" replace />;
  } else if (["Principal", "Tutor", "HOD"].includes(role)) {
    return <Navigate to="/dashboard" replace />;
  } else if (role === null) {
    return children;
  }

  return children ?? <Navigate to="/login" replace />;
};

export default RoleRedirect;
