import { useState } from "react";
import { FaCamera } from "react-icons/fa"; 
import "./view.scss";

const View = ({ slug, columns, setOpenView }) => {
  const [image, setImage] = useState(null);



  return (
    <div className="View">
      <div className="modal">
        <span className="close" onClick={() => setOpenView(false)}>X</span>
        <h1>Add new {slug}</h1>
        
        <div className="image-upload">
          <label className="image-container">
            {image ? (
              <img src={image} alt="Preview" className="preview-img"  />
            ) : (
              <FaCamera className="upload-icon" />
            )}
          </label>
        </div>

        <form>
          {columns
            .filter((item) => item.field !== "id" && item.field !== "img")
            .map((column, index) => (
              <div className="item" key={index}>
                <label>{column.headerName}</label>
                <input type={column.type || "text"} placeholder={column.field} readOnly />
              </div>
            ))}
        </form>
      </div>
    </div>
  );
};

export default View;
