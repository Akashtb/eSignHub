import { LogOut, User } from "lucide-react"; 
import "./navbar.scss";
import { useLogOutMutation } from "../../features/redux/auth/AuthApiSlice";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { logOut } from "../../features/redux/auth/AuthSlice";
import NotificationDropdown from "../NotificationDropdown/NotificationDropdown";
import { toast } from "react-toastify";


const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logOutAPi] = useLogOutMutation(); 

  const handleLogout = async () => {
    try {
      await logOutAPi().unwrap();
      dispatch(logOut());
      localStorage.removeItem("persist:root");
      toast.success("Logged out successfully!");
      navigate("/landingPage");
    } catch (error) {
      toast.error("Logout failed. Please try again.");
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="navbar">
      <div className="logo">
        <img src="logo.svg" alt="Logo" />
        <span>Application</span>
      </div>

      <div className="icons">
        <NotificationDropdown/>
        <div className="user">
          <User size={24} style={{ cursor: "pointer" }} />
        </div>
        <LogOut size={24} className="icon logout-icon" onClick={handleLogout} style={{ cursor: "pointer" }} />
      </div>
    </div>
  );
};

export default Navbar;
