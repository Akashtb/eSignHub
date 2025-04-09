import { useSelector } from "react-redux";
import { selectCurrentRole } from "./redux/auth/AuthSlice";
import { Navigate } from "react-router";

const RoleRedirect = ({children}) =>{
  const role = useSelector(selectCurrentRole);

  if (role === "Student") {
    return <Navigate to="/student" replace />;
  } else if (["Principal", "Tutor", "HOD"].includes(role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default RoleRedirect;
