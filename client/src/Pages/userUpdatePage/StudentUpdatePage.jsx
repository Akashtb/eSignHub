import { useEffect, useState } from "react";
import "./userUpdatePage.scss";
import { useSelector } from "react-redux";
import { selectCurrentRole, selectCurrentUser } from "../../features/redux/auth/AuthSlice";
import { useGetHODByIdQuery, useUpdateHODDetailMutation } from "../../features/redux/users/HODSlice";
import { useGetTutorByIdQuery, useUpdateTutorDetailMutation } from "../../features/redux/users/TutorSlice";
import { useGetStudentByIdQuery, useUpdateStudentDetailMutation } from "../../features/redux/users/Studentslice";

const StudentUpdatePage = () => {
    const user = useSelector(selectCurrentUser);
    const role = useSelector(selectCurrentRole);

    const { data, isLoading, refetch } = useGetStudentByIdQuery(user)

    const [updateStudent] = useUpdateStudentDetailMutation();

    const userData = data?.student
    
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        dateOfBirth: "",
        departmentName: "",
        img: "",
        batch: "",
    });

    useEffect(() => {
        if (userData) {
            setFormData({
                firstName: userData.firstName || "",
                lastName: userData.lastName || "",
                email: userData.email || "",
                phone: userData.phone || "",
                dateOfBirth: userData.dateOfBirth ? userData.dateOfBirth.split("T")[0] : "",
                departmentName: userData.departmentName || "",
                img: userData.img || "/noavatar.png",
                batch: userData.batch || "",
            });
        }
    }, [userData]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "upload");

        try {
            const response = await fetch("https://api.cloudinary.com/v1_1/dwtoizfsv/image/upload", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();
            setFormData((prev) => ({ ...prev, img: data.secure_url }));
        } catch (error) {
            console.error("Image upload failed:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!userData) {
                alert("User data not found!");
                return;
            }

            const updatedUser = { id: userData._id, ...({ studentData: formData }) };
            await updateStudent(updatedUser).unwrap();
            refetch()

            alert("User updated successfully!");
        } catch (error) {
            console.error("Update failed:", error);
        }
    };


    if (isLoading) return <p>Loading...</p>;

    return (
        <div className="userUpdatePage">
            <h2>Update {role}</h2>
            <form onSubmit={handleSubmit}>
                <div className="image-container">
                    <label htmlFor="imageUpload">
                        <img src={formData.img} alt="Profile" className="profile-img" />
                    </label>
                </div>

                <input
                    id="imageUpload"
                    type="file"
                    accept="image/*"
                    className="hidden-input"
                    hidden
                    onChange={handleImageUpload}
                />


                <label>First Name</label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required/>

                <label>Last Name</label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required/>

                <label>Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required/>

                <label>Phone</label>
                <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />

                <label>Date of Birth</label>
                <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />

                <label>Batch</label>
                <select name="batch" value={formData.batch} onChange={handleChange} required>
                    <option value="">Select Batch</option>
                    <option value="2021-2025">2021-2025</option>
                    <option value="2022-2026">2022-2026</option>
                    <option value="2023-2027">2023-2027</option>
                    <option value="2024-2028">2024-2028</option>
                </select>

                <label>Department</label>
                <select name="departmentName" value={formData.departmentName} onChange={handleChange} required>
                    <option value="">Select Department</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Biomedical Engineering">Biomedical Engineering</option>
                    <option value="Pharmacy">Pharmacy</option>
                    <option value="Mechanical Engineering">Mechanical Engineering</option>
                    <option value="Electrical Engineering">Electrical Engineering</option>
                </select>
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default StudentUpdatePage;
