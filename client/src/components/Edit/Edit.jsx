import React, { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";
import "./edit.scss";
import { useGetStudentByIdQuery, useUpdateStudentDetailMutation } from "../../features/redux/users/Studentslice";
import { useGetTutorByIdQuery, useUpdateTutorDetailMutation } from "../../features/redux/users/TutorSlice";
import { useGetHODByIdQuery, useUpdateHODDetailMutation } from "../../features/redux/users/HODSlice"; // FIXED

const Edit = ({ slug, columns, setOpenEdit, selectedId, refetch }) => {
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({});

  // Queries based on slug
  const { data: student, refetch: singleStudentRefetch } = useGetStudentByIdQuery(selectedId, {
    skip: !selectedId || slug !== "student",
  });

  const { data: tutor, refetch: singleTutorRefetch } = useGetTutorByIdQuery(selectedId, {
    skip: !selectedId || slug !== "Tutor",
  });

  const { data: hod, refetch: singleHODRefetch } = useGetHODByIdQuery(selectedId, {
    skip: !selectedId || slug !== "HOD", // FIXED
  });

  // Mutations
  const [updateStudent] = useUpdateStudentDetailMutation();
  const [updateTutor] = useUpdateTutorDetailMutation();
  const [updateHOD] = useUpdateHODDetailMutation(); // FIXED

  // Get user data
  const userData = slug === "student" ? student?.student 
                 : slug === "Tutor" ? tutor?.tutor 
                 : slug === "HOD" ? hod 
                 : null;

  // Populate formData when userData is available
  useEffect(() => {
    if (userData) {
      setFormData(userData);
    }
  }, [userData]);

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting Data:", formData);
    
    try {
      let updated;
      if (slug === "student") {
        updated = await updateStudent({ id: formData._id, studentData: formData }).unwrap();
        singleStudentRefetch();
      } else if (slug === "Tutor") {
        updated = await updateTutor({ id: formData._id, tutorData: formData }).unwrap();
        singleTutorRefetch();
      } else if (slug === "HOD") {
        updated = await updateHOD({ id: formData._id, HODData: formData }).unwrap(); // FIXED
        singleHODRefetch();
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

        {/* Image Upload */}
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

        {/* Form */}
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
