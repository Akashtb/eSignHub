
import { Link } from "react-router";
import "../../menu/menu.scss";
import { PenTool, User } from "lucide-react";
const StudentSideBar = ({pathPrefix}) => {
    return (
        <div className="menu">
            <div className="item">
                <span className="title main-heading">MAIN</span>
                <Link to={`${pathPrefix}/updateDetails`} className="listItem">
                    <User/>
                    <span className="listItemTitle">Profile</span>
                </Link>
                <Link to={`${pathPrefix}/requestLetter`} className="listItem">
                    <PenTool />
                    <span className="listItemTitle">Request Letters</span>
                </Link>
            </div>
        </div>
    );
}

export default StudentSideBar