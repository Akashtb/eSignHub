import { Link } from "react-router-dom";
import "./chartBox.scss";
import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts";
import { useSelector } from "react-redux";
import { selectCurrentRole } from "../../features/redux/auth/AuthSlice";


const ChartBox = ({title,number,color,icon,slug}) => {
  console.log(slug);
  
  const user = useSelector(selectCurrentRole)
  const pathPrefix = user === "Student" ? "/student" : "/dashboard";
  return (
    <div className="chartBox">
      <div className="boxInfo">
        <div className="title">
          {icon}
          <span>{title}</span>
        </div>
        <h1>{number}</h1>
        <Link to={`${pathPrefix}/${slug}`} style={{ color:color }}>
          View all
        </Link>
      </div>
    </div>
  );
};

export default ChartBox;