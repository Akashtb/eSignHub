import React, { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";
import "./edit.scss";
import { useGetStudentByIdQuery, useUpdateStudentDetailMutation } from "../../features/redux/users/Studentslice";
import { useGetTutorByIdQuery, useUpdateTutorDetailMutation } from "../../features/redux/users/TutorSlice";
import { useGetHODByIdQuery, useUpdateHODDetailMutation } from "../../features/redux/users/HODSlice";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dwtoizfsv/image/upload";
const UPLOAD_PRESET = "upload";

const Edit = ({ slug, columns, setOpenEdit, selectedId, refetch }) => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [formData, setFormData] = useState({});

  const { data: student, refetch: singleStudentRefetch } = useGetStudentByIdQuery(selectedId, {
    skip: !selectedId || slug !== "student",
  });

  const { data: tutor, refetch: singleTutorRefetch } = useGetTutorByIdQuery(selectedId, {
    skip: !selectedId || slug !== "Tutor",
  });

  const { data: hod, refetch: singleHODRefetch } = useGetHODByIdQuery(selectedId, {
    skip: !selectedId || slug !== "HOD",
  });

  const [updateStudent] = useUpdateStudentDetailMutation();
  const [updateTutor] = useUpdateTutorDetailMutation();
  const [updateHOD] = useUpdateHODDetailMutation();

  const userData = slug === "student" ? student?.student
    : slug === "Tutor" ? tutor?.tutor
      : slug === "HOD" ? hod
        : null;

  useEffect(() => {
    if (userData) {
      setFormData(userData);
      setImageUrl(userData.img || "");
    }
  }, [userData]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));

      const uploadData = new FormData();
      uploadData.append("file", file);
      uploadData.append("upload_preset", UPLOAD_PRESET);

      try {
        const response = await fetch(CLOUDINARY_URL, {
          method: "POST",
          body: uploadData,
        });

        const data = await response.json();
        if (data.secure_url) {
          setImageUrl(data.secure_url);
          setFormData((prev) => ({ ...prev, img: data.secure_url }));
          console.log("Uploaded image URL:", data.secure_url);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
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
      if (slug === "student") {
        updated = await updateStudent({ id: formData._id, studentData: formData }).unwrap();
        singleStudentRefetch();
      } else if (slug === "Tutor") {
        updated = await updateTutor({ id: formData._id, tutorData: formData }).unwrap();
        singleTutorRefetch();
      } else if (slug === "HOD") {
        updated = await updateHOD({ id: formData._id, HODData: formData }).unwrap();
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
            {imageUrl ? (
              <img src={imageUrl} alt="Profile" className="preview-img" />
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

                {column.field === "dateOfBirth" ? (
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth ? new Date(formData.dateOfBirth).toISOString().split("T")[0] : ""}
                    onChange={handleInputChange}
                  />
                ) : (
                  <input
                    type={column.type || "text"}
                    name={column.field}
                    value={formData[column.field] || ""}
                    onChange={handleInputChange}
                  />
                )}
              </div>
            ))}
          <button type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default Edit;
