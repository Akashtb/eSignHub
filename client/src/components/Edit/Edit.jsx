import React, { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";
import "./edit.scss";
import { useGetStudentByIdQuery, useUpdateStudentDetailMutation } from "../../features/redux/users/Studentslice";
import { useGetTutorByIdQuery, useUpdateTutorDetailMutation } from "../../features/redux/users/TutorSlice";
import { useGetHODByIdQuery, useUpdateHODDetailMutation } from "../../features/redux/users/HODSlice";
import { toast } from "react-toastify";


const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dwtoizfsv/image/upload";
const UPLOAD_PRESET = "upload";

const Edit = ({ slug, columns, setOpenEdit, selectedId, refetch }) => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [formData, setFormData] = useState({});
  const departmentOptions = ["Computer Science", "Electronics and Communication"];
  const batchOptions = ["2021-2025", "2022-2026", "2023-2027", "2024-2028"]



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
      console.log("form data on edit", formData);
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

    if (formData.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        toast.error("Please enter a valid email address.");
        return;
      }
    }

  
    if (formData.dateOfBirth) {
      const dob = new Date(formData.dateOfBirth);
      const today = new Date();
      const age = today.getFullYear() - dob.getFullYear();
      const monthDiff = today.getMonth() - dob.getMonth();
      const dayDiff = today.getDate() - dob.getDate();
  
      const isBirthdayPassedThisYear =
        monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0);
      const actualAge = isBirthdayPassedThisYear ? age : age - 1;
  
      if (slug === "Student" && actualAge < 18) {
        toast.error("Student must be at least 18 years old.");
        return;
      }
  
      if ((slug === "Tutor" || slug === "HOD") && actualAge < 25) {
        toast.error(`${slug} must be at least 25 years old.`);
        return;
      }
    }
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
      toast.success(`${slug} updated successfully!`);
      refetch();
      setOpenEdit(false);
    } catch (error) {
      toast.error("Failed to update. Please try again.");
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

                {column.field === "batch" ? (
                  <select
                    name="batch"
                    onChange={handleInputChange}
                    value={formData.batch || ""}
                    required
                  >
                    <option value="">Select Batch</option>
                    {batchOptions.map((batch, idx) => (
                      <option key={idx} value={batch}>{batch}</option>
                    ))}
                  </select>

                ) : column.field === "departmentName" ? (
                  <select
                    name="departmentName"
                    onChange={handleInputChange}
                    value={formData.departmentName || ""}
                    required
                  >
                    <option value="">Select Department</option>
                    {departmentOptions.map((dept, idx) => (
                      <option key={idx} value={dept}>{dept}</option>
                    ))}
                  </select>

                ) : column.field === "dateOfBirth" ? (
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth ? formData.dateOfBirth.slice(0, 10) : ""}
                    onChange={handleInputChange}
                    required
                  />

                ) : (
                  <input
                    type={column.type || "text"}
                    name={column.field}
                    value={formData[column.field] || ""}
                    onChange={handleInputChange}
                    required
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
