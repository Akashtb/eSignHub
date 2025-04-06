import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectCurrentRole } from "./redux/auth/AuthSlice";

const RoleRedirect = () => {
  const navigate = useNavigate();
  const role = useSelector(selectCurrentRole)
  useEffect(() => {
    if (role === "Student") {
      navigate("/student");
    } else if (role === "Tutor" || role === "HOD" || role === "Principal") {
      navigate("/dashboard");
    } else {
      navigate("/landingPage");
    }
  }, [role, navigate]);

  return null; 
};

export default RoleRedirect;
