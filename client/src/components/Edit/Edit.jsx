import React, { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";
import "./edit.scss";
import { useGetStudentByIdQuery, useUpdateStudentDetailMutation } from "../../features/redux/users/Studentslice";
import { useGetTutorByIdQuery, useUpdateTutorDetailMutation } from "../../features/redux/users/TutorSlice";

const Edit = ({ slug, columns, setOpenEdit, selectedId, refetch }) => {
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({});
  const [updateStudent] = useUpdateStudentDetailMutation();
  const [updateTutor] = useUpdateTutorDetailMutation();
  const { data: student, isLoading, isError, refetch: singleStudentRefetch } = useGetStudentByIdQuery(selectedId, {
    skip: !selectedId,
  });

  const { data: tutor, isLoading: tutorLoading, isError: tutorError, refetch: singleTutorRefetch } = useGetTutorByIdQuery(selectedId, {
    skip: !selectedId,
  });


  console.log(selectedId);
  




  useEffect(() => {
    if (student?.student) {
      setFormData(student.student);
    } else if (tutor?.tutor) {
      setFormData(tutor.tutor);
    }
  }, [student, tutor]); 
  

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting Data:", formData); 
    try {
      let updated;
      if (slug === "Student") {
        updated = await updateStudent({ id: formData._id, studentData: formData }).unwrap();
        singleStudentRefetch()
      } else if (slug === "Tutor") {
        updated = await updateTutor({ id: formData._id, tutorData: formData }).unwrap();
        singleTutorRefetch()
      } else {
        console.error("Invalid slug:", slug);
        return;
      }
  
      console.log(updated, "User details updated successfully!");
      refetch();
      setOpenEdit(false);
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };
  

  return (
    <div className="edit">
      <div className="modal">
        <span className="close" onClick={() => setOpenEdit(false)}>X</span>
        <h1>Edit {slug}</h1>

        <div className="image-upload">
          <input type="file" accept="image/*" id="fileInput" onChange={handleImageChange} hidden />
          <label htmlFor="fileInput" className="image-container">
            {image ? (
              <img src={image} alt="Preview" className="preview-img" />
            ) : (
              <FaCamera className="upload-icon" />
            )}
          </label>
        </div>

        <form onSubmit={handleSubmit}>
          {columns
            .filter((item) => item.field !== "id" && item.field !== "img")
            .map((column, index) => (
              <div className="item" key={index}>
                <label>{column.headerName}</label>
                <input
                  type={column.type || "text"}
                  name={column.field}
                  value={formData[column.field] || ""}
                  onChange={handleInputChange}
                />
              </div>
            ))}
          <button type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default Edit;
