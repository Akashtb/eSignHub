import { useState } from "react";
import { FaCamera } from "react-icons/fa";
import "./add.scss";
import { useCreateStudentMutation } from "../../features/redux/users/Studentslice";
import { useCreateTutorMutation } from "../../features/redux/users/TutorSlice";
import { useCreateHODMutation } from "../../features/redux/users/HODSlice";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dwtoizfsv/image/upload";
const UPLOAD_PRESET = "upload";

const batchOptions = ["2021-2025", "2022-2026", "2023-2027", "2024-2028" ]

const departmentOptions = ["Computer Science", "Electronics and Communication"];

const Add = ({ slug, columns, setOpen,refetch }) => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(""); 
  const [formData, setFormData] = useState({}); 

  const [createStudent, { isLoading: isLoadingStudent }] = useCreateStudentMutation();
  const [createTutor, { isLoading: isLoadingTutor }] = useCreateTutorMutation();
  const [createHOD, { isLoading: isLoadingHOD }] = useCreateHODMutation();

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
    const finalData = { ...formData, img: imageUrl };

    console.log(finalData,"finalData");
    

    try {
      let create;
      if (slug === "Tutor") {
        create = await createTutor(finalData);
      } else if (slug === "HOD") {
        create = await createHOD(finalData);
        console.log("API Response:", create);
      } else {
        console.error("Invalid slug:", slug);
        return;
      }
      refetch()
      setOpen(false);
    } catch (error) {
      console.error("Failed to add user:", error);
    }
  };

  return (
    <div className="add">
      <div className="modal">
        <span className="close" onClick={() => setOpen(false)}>X</span>
        <h1>Add new {slug}</h1>

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
                
                {column.field === "batch" ? (
                  <select name="batch" onChange={handleInputChange}>
                    <option value="">Select Batch</option>
                    {batchOptions.map((batch, idx) => (
                      <option key={idx} value={batch}>{batch}</option>
                    ))}
                  </select>
                ) : column.field === "departmentName" ? (
                  <select name="departmentName" onChange={handleInputChange}>
                    <option value="">Select Department</option>
                    {departmentOptions.map((dept, idx) => (
                      <option key={idx} value={dept}>{dept}</option>
                    ))}
                  </select>
                ) : column.field === "dateOfBirth" ? (
                  <input
                    type="date"
                    name="dateOfBirth"
                    onChange={handleInputChange}
                  />
                ) : (
                  <input
                    type={column.type || "text"}
                    name={column.field}
                    placeholder={column.headerName}
                    onChange={handleInputChange}
                  />
                )}
              </div>
            ))}
          <button type="submit" disabled={ isLoadingTutor || isLoadingHOD}>
            {(isLoadingStudent || isLoadingTutor || isLoadingHOD) ? "Submitting..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Add;
