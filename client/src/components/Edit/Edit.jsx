import React, { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";
import "./edit.scss";
import { useGetStudentByIdQuery, useUpdateStudentDetailMutation } from "../../features/redux/users/Studentslice";

const Edit = ({ slug, columns, setOpenEdit, selectedId,refetch }) => {
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({}); 
  const [updateStudent] = useUpdateStudentDetailMutation();
  const { data: student, isLoading, isError,refetch:singleStudentRefetch } = useGetStudentByIdQuery(selectedId, {
    skip: !selectedId, 
  });


  console.log(student?.student);
  

  
  useEffect(() => {
    if (student?.student) {
      singleStudentRefetch()
      setFormData(student?.student);
    }
  }, [student,refetch]);

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

      
        const updated = await updateStudent({ id: formData._id, studentData: formData,}).unwrap();

        console.log(updated,"User details updated successfully!");
        // toast.success("User details updated successfully!"); 
        refetch(); 
        setOpenEdit(false); 
        singleStudentRefetch()
    } catch (error) {
        console.error("Failed to update user:", error);
        // toast.error("Failed to update user details."); 
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
