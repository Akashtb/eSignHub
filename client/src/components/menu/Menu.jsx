
import "./menu.scss";
import StaffSideBar from "../sideBars/ForStaff/StaffSideBar";
import PrincipalSidebar from "../sideBars/ForPrincipal/PrincipalSidebar";
import StudentSideBar from "../sideBars/ForStudent/StudentSideBar";
import { useSelector } from "react-redux";
import { selectCurrentRole } from "../../features/redux/auth/AuthSlice";

const Menu = () => {
  const user = useSelector(selectCurrentRole)
  const pathPrefix = user === "Student" ? "/student" : "/dashboard";
  const getSidebarItems = () => {
    switch (user) {
      case "Principal":
        return (
          <>
            <PrincipalSidebar pathPrefix={pathPrefix}/>
          </>
        );

      case "Student":
        return (
          <>
            <StudentSideBar pathPrefix={pathPrefix}/>
          </>
        );

      case "Tutor":
        return (
          <StaffSideBar pathPrefix={pathPrefix}/>
        );
      case "HOD":
        return (
          <StaffSideBar pathPrefix={pathPrefix}/>
        );


      default:
        return (
          <>
            <div className="item">
              <span className="title main-heading">MAIN</span>
              <Link to={`${pathPrefix}`} className="listItem">
                <Home />
                <span className="listItemTitle">Homepage</span>
              </Link>
            </div>
          </>
        );
    }
  };

  return <div className="menu">{getSidebarItems()}</div>;
};

export default Menu;
