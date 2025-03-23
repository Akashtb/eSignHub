import React, { useState } from 'react'
import { FaCamera } from "react-icons/fa";
import "./edit.scss";
const Edit = ({ slug, columns, setOpenEdit }) => {
    const [image, setImage] = useState(null);
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          setImage(URL.createObjectURL(file)); 
        }
      };
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted");
        setOpenEdit(false);
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
                    <input type={column.type || "text"} placeholder={column.field} />
                  </div>
                ))}
              <button>Edit</button>
            </form>
          </div>
        </div>
  )
}

export default Edit