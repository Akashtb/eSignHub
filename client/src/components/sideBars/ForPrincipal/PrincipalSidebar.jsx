import { Home, PenTool, User } from "lucide-react";
import { GiTeacher } from "react-icons/gi";
import { PiStudentFill } from "react-icons/pi";
import { Link } from "react-router"; 
import managementIcon from "../../../../src/assets/management.png"; 
import "../../menu/menu.scss";

const PrincipalSidebar = () => {
  return (
    <div className="menu">
      <div className="item">
        <span className="title main-heading">MAIN</span>
        <Link to="/" className="listItem">
          <Home />
          <span className="listItemTitle">Homepage</span>
        </Link>
        <Link to="/updateDetails" className="listItem">
          <User />
          <span className="listItemTitle">Profile</span>
        </Link>
      </div>

      <div className="item">
        <span className="title lists-heading">LISTS</span>
        <Link to="/students" className="listItem">
          <PiStudentFill />
          <span className="listItemTitle">Students</span>
        </Link>
        <Link to="/tutor" className="listItem">
          <GiTeacher />
          <span className="listItemTitle">Tutor</span>
        </Link>
        <Link to="/hod" className="listItem">
        <img src={managementIcon} alt="HOD" className="colored-icon" />
        <span className="listItemTitle">HOD</span>
        </Link>
      </div>

      <div className="item">
        <span className="title general-heading">GENERAL</span>
        <Link to="/requestLetter" className="listItem">
          <PenTool />
          <span className="listItemTitle">Request Letters</span>
        </Link>
      </div>
    </div>
  );
};

export default PrincipalSidebar;
