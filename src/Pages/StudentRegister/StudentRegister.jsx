import { useState } from "react";
import { Camera } from "lucide-react"; // Using Lucide-react for the camera icon
import "./StudentRegister.css";

const StudentRegister = () => {
    const [profileImage, setProfileImage] = useState(null);

    // Function to handle file input change
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setProfileImage(imageUrl);
        }
    };

    return (
        <div className="studentRegister">
            <div className="studentRegisterSub">
                <h1>Student Registration</h1>

                {/* Profile Picture Upload */}
                <div className="profilePic" onClick={() => document.getElementById("fileInput").click()}>
                    {profileImage ? (
                        <img src={profileImage} alt="Profile Preview" className="profileImage" />
                    ) : (
                        <Camera size={40} color="gray" />
                    )}
                </div>
                <input
                    type="file"
                    id="fileInput"
                    accept="image/*"
                    className="hiddenInput"
                    onChange={handleImageChange}
                />

                <div className="formGroup">
                    <input type="text" placeholder="First Name" />
                    <input type="text" placeholder="Last Name" />
                    <input type="text" placeholder="Register Number" className="fullWidth" />

                    {/* Batch Dropdown */}
                    <select className="fullWidth">
                        <option value="" disabled selected>Select Batch</option>
                        <option value="2021-2025">2021-2025</option>
                        <option value="2022-2026">2022-2026</option>
                        <option value="2023-2027">2023-2027</option>
                        <option value="2024-2028">2024-2028</option>
                    </select>

                    {/* Course Dropdown */}
                    <select className="fullWidth">
                        <option value="" disabled selected>Select Course</option>
                        <option value="B.Pharm">B.Pharm</option>
                        <option value="D.Pharm">D.Pharm</option>
                        <option value="M.Pharm">M.Pharm</option>
                    </select>

                    <input type="text" placeholder="Year" />
                    <input type="text" placeholder="Age" />
                    <input type="email" placeholder="Email" className="fullWidth" />
                    <input type="text" placeholder="Phone Number" className="fullWidth" />
                </div>

                <button className="signUpBtn">Sign Up</button>
            </div>
        </div>
    );
};

export default StudentRegister;
