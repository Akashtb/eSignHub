import { useEffect } from "react";
import { FaCamera } from "react-icons/fa";
import "./view.scss";
import { useGetStudentByIdQuery } from "../../features/redux/users/Studentslice";
import { useGetTutorByIdQuery } from "../../features/redux/users/TutorSlice";
import { useGetHODByIdQuery } from "../../features/redux/users/HODSlice";

const View = ({ slug, selectedId, setOpenView, columns }) => {

  const { data: student, refetch: refetchStudent } = useGetStudentByIdQuery(selectedId, {
    skip: !selectedId || slug !== "student", 
  });

  const { data: tutor, refetch: refetchTutor } = useGetTutorByIdQuery(selectedId, {
    skip: !selectedId || slug !== "Tutor", 
  });

  const {data:HOD,refetch: refetchHOD} = useGetHODByIdQuery(selectedId,{
    skip: !selectedId || slug !== "HOD",
  })

  console.log(HOD);
  

  useEffect(() => {
    if (selectedId) {
      if (slug === "student") refetchStudent();
      if (slug === "Tutor") refetchTutor();
      if(slug==="HOD") refetchHOD()
    }
  }, [selectedId, slug]);

  // Assign the correct user data
  const userData = slug === "student" ? student?.student : slug === "Tutor" ? tutor?.tutor :slug === "HOD"?HOD: null;

  return (
    <div className="View">
      <div className="modal">
        <span className="close" onClick={() => setOpenView(false)}>X</span>
        <h1>View {slug} Details</h1>

        {/* Image Upload Section */}
        <div className="image-upload">
          <label className="image-container">
            {userData?.img ? (
              <img src={userData.img} alt={`${slug} Avatar`} className="preview-img" />
            ) : (
              <FaCamera className="upload-icon" />
            )}
          </label>
        </div>

        <form>
          {columns
            .filter(column => column.field !== "img") // Exclude "img" field
            .map((column) => {
              const fieldKey = column.field;
              return (
                <div className="item" key={fieldKey}>
                  <label>{column.headerName}</label>
                  <input type="text" value={userData?.[fieldKey] || ""} readOnly />
                </div>
              );
            })}
        </form>
      </div>
    </div>
  );
};

export default View;
