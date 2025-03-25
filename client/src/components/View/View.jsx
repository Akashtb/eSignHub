import { useEffect } from "react";
import { FaCamera } from "react-icons/fa"; 
import "./view.scss";
import { useGetStudentByIdQuery } from "../../features/redux/users/Studentslice";

const View = ({ slug, selectedId, setOpenView }) => {
  
  const { data: student, isLoading, isError, refetch } = useGetStudentByIdQuery(selectedId, {
    skip: !selectedId, 
  });
  const singleStudentData = student?.student;
  

  console.log(selectedId,"student details inn vuew");
  

  useEffect(() => {
    if (selectedId) {
      refetch(); 
    }
  }, [selectedId, refetch]);

  return (
    <div className="View">
      <div className="modal">
        <span className="close" onClick={() => setOpenView(false)}>X</span>
        <h1>View {slug} Details</h1>

        <div className="image-upload">
          <label className="image-container">
            {student?.img ? (
              <img src={student.img} alt="Student Avatar" className="preview-img" />
            ) : (
              <FaCamera className="upload-icon" />
            )}
          </label>
        </div>

        <form>
          <div className="item">
            <label>First Name</label>
            <input type="text" value={singleStudentData?.firstName || ""} readOnly />
          </div>

          <div className="item">
            <label>Last Name</label>
            <input type="text" value={singleStudentData?.lastName || ""} readOnly />
          </div>

          <div className="item">
            <label>Email</label>
            <input type="email" value={singleStudentData?.email || ""} readOnly />
          </div>

          <div className="item">
            <label>Phone</label>
            <input type="text" value={singleStudentData?.phone || ""} readOnly />
          </div>

          <div className="item">
            <label>Date of Birth</label>
            <input type="text" value={singleStudentData?.dateOfBirth?.split("T")[0] || ""} readOnly />
          </div>

          <div className="item">
            <label>Registration Number</label>
            <input type="text" value={singleStudentData?.regNumber || ""} readOnly />
          </div>

          <div className="item">
            <label>Batch</label>
            <input type="text" value={singleStudentData?.batch || ""} readOnly />
          </div>

          <div className="item">
            <label>Department</label>
            <input type="text" value={singleStudentData?.departmentName || ""} readOnly />
          </div>
        </form>
      </div>
    </div>
  );
};

export default View;
