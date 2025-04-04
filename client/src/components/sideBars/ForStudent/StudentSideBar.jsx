
import { Link } from "react-router"; 
import "../../menu/menu.scss";
import { PenTool } from "lucide-react";
const StudentSideBar = () => {
    return (
        <div className="menu">
            <div className="item">
                <span className="title main-heading">MAIN</span>
                <Link to="/requestLetter" className="listItem">
                    <PenTool />
                    <span className="listItemTitle">Request Letters</span>
                </Link>
            </div>
        </div>
    );
}

export default StudentSideBar