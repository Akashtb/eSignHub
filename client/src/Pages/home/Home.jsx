import { FaUserGraduate, FaChalkboardTeacher, FaUserTie } from "react-icons/fa";
import ChartBox from "../../components/chartBox/ChartBox";
import PieChartBox from "../../components/pieChartBox/PieChartBox";
import TopBox from "../../components/topBox/TopBox";
import { useEachDepartmentTotalStudentQuery, useTotalEachUserQuery } from "../../features/redux/users/PrincipalSlice";
import "./home.scss";

// Define fixed colors for each department
const departmentColors = {
  "Computer Science": "#3498db",
  "Mech": "#e7c530",
  "Electrical Engineering": "#f39c12",
  "Civil Engineering": "#2ecc71",
  "Electronics": "#9b59b6",
  "Information Technology": "#1abc9c",
  "Biomedical Engineering": "#8e44ad",
  "Others": "#e7c530",
};

// Define fixed colors for batches
const batchColors = {
  "2020-2024": "#e67e22",
  "2021-2025": "#27ae60",
  "2022-2026": "#2980b9",
  "2023-2027": "#8e44ad",
  "2024-2028": "#f1c40f",
  "2025-2029": "#16a085",
  "2026-2030": "#d35400",
  "Others": "#7f8c8d",
};

const Home = () => {
  const { data, isLoading, isError, refetch } = useTotalEachUserQuery();
  const { data: departmentWise, refetch: departmentRefetch } = useEachDepartmentTotalStudentQuery();

  const students = data?.student ?? 0;
  const tutor = data?.tutor ?? 0;
  const HOD = data?.Hod ?? 0;

  // Convert department-wise data to PieChart format with fixed colors
  const departmentData = departmentWise?.departmentCounts?.map((item) => ({
    name: item._id,
    value: item.totalStudents,
    color: departmentColors[item._id] || departmentColors["Others"], // Default color if department is unknown
  })) ?? [];

  // Convert batch-wise data to PieChart format with fixed colors
  const batchData = departmentWise?.batchCounts?.map((item) => ({
    name: `Batch ${item._id}`,
    value: item.totalStudents,
    color: batchColors[item._id] || batchColors["Others"], // Default color if batch year is unknown
  })) ?? [];

  return (
    <div className="home">
      <div className="box box1">
        <TopBox />
      </div>
      {/* Department-wise data */}
      <div className="box box4">
        <PieChartBox title="Students by Department" data={departmentData} />
      </div>
      {/* Batch-wise data */}
      <div className="box box7">
        <PieChartBox title="Students by Batch" data={batchData} />
      </div>
      <div className="box box5">
        <ChartBox title="Students" number={students} color="#3498db" icon={<FaUserGraduate size={24} color="#41bf99" />}slug="students" />
      </div>
      <div className="box box2">
        <ChartBox title="Tutors" number={tutor} color="#b5c34e" icon={<FaChalkboardTeacher size={24} color="#c4d82d" />}slug="Tutor" />
      </div>
      <div className="box box3">
        <ChartBox title="HOD" number={HOD} color="#cb9a51" icon={<FaUserTie size={24} color="#f0a536" />} slug="HOD"/>
      </div>
    </div>
  );
};

export default Home;
