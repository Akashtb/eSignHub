import { Link } from "react-router-dom";
import "./chartBox.scss";
import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts";


const ChartBox = ({title,number,color,icon}) => {
  
  return (
    <div className="chartBox">
      <div className="boxInfo">
        <div className="title">
          {icon}
          <span>{title}</span>
        </div>
        <h1>{number}</h1>
        <Link to="/" style={{ color:color }}>
          View all
        </Link>
      </div>
    </div>
  );
};

export default ChartBox;