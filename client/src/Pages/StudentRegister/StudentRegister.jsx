import { useState } from "react";
import { Camera } from "lucide-react"; 
import "./StudentRegister.css";
import { useCreateStudentMutation } from "../../features/redux/users/Studentslice";
import { useNavigate } from "react-router";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dwtoizfsv/image/upload";
const UPLOAD_PRESET = "upload";

const StudentRegister = () => {
    const [imagePreview, setImagePreview] = useState(null);
    const [imageUrl, setImageUrl] = useState(""); 
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        regNumber: "",
        email: "",
        password: "",
        batch: "",
        phone: "",
        departmentName: "",
        dateOfBirth: "",
        img: "",
    });

    const [createStudent, { isLoading }] = useCreateStudentMutation();
    const navigate = useNavigate()

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));

            const uploadData = new FormData();
            uploadData.append("file", file);
            uploadData.append("upload_preset", UPLOAD_PRESET);

            try {
                const response = await fetch(CLOUDINARY_URL, {
                    method: "POST",
                    body: uploadData,
                });

                const data = await response.json();
                console.log(data.secure_url);
                
                if (data.secure_url) {
                    setImageUrl(data.secure_url);
                    setFormData((prev) => ({ ...prev, img: data.secure_url }));
                }
            } catch (error) {
                console.error("Error uploading image:", error);
            }
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.img) {
            alert("Please upload a profile picture.");
            return;
        }

        try {
            const response = await createStudent(formData);
            if (response?.error) {
                console.error("Error creating student:", response.error);
                alert("Failed to register student.");
            } else {
                alert("Student registered successfully!");
                setFormData({
                    firstName: "",
                    lastName: "",
                    regNumber: "",
                    email: "",
                    password: "",
                    batch: "",
                    phone: "",
                    departmentName: "",
                    dateOfBirth: "",
                    img: "",
                });
                setImagePreview(null);
                navigate('/landingPage')
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="studentRegister">
            <div className="studentRegisterSub">
                <h1>Student Registration</h1>

                <div className="profilePic" onClick={() => document.getElementById("fileInput").click()}>
                    {imagePreview ? (
                        <img src={imagePreview} alt="Profile Preview" className="profileImage" />
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

                <form onSubmit={handleSubmit} className="formGroup">
                    <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
                    <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
                    <input type="text" name="regNumber" placeholder="Register Number" className="fullWidth" value={formData.regNumber} onChange={handleChange} required />

                    {/* Email and Password */}
                    <input type="email" name="email" placeholder="Email" className="fullWidth" value={formData.email} onChange={handleChange} required />
                    <input type="password" name="password" placeholder="Password" className="fullWidth" value={formData.password} onChange={handleChange} required />

                    {/* Batch Dropdown */}
                    <select name="batch" className="fullWidth" value={formData.batch} onChange={handleChange} required>
                        <option value="" disabled>Select Batch</option>
                        <option value="2021-2025">2021-2025</option>
                        <option value="2022-2026">2022-2026</option>
                        <option value="2023-2027">2023-2027</option>
                        <option value="2024-2028">2024-2028</option>
                    </select>

                    <select name="departmentName" className="fullWidth" value={formData.departmentName} onChange={handleChange} required>
                        <option value="" disabled>Select Department</option>
                        <option value="Computer Science">Computer Science</option>
                        <option value="Electronics and Communication">Electronics and Communication</option>
                    </select>

                    <input type="date" name="dateOfBirth" className="fullWidth" value={formData.dateOfBirth} onChange={handleChange} required />

                    <input type="text" name="phone" placeholder="Phone Number" className="fullWidth" value={formData.phone} onChange={handleChange} required />

                    <button type="submit" className="signUpBtn" disabled={isLoading}>
                        {isLoading ? "Registering..." : "Sign Up"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default StudentRegister;
