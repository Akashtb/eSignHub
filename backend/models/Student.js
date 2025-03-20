import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
        },
        dateOfBirth: {
            type: Date,
        },
        status: {
            type: Boolean,
            default: true,
        },
        regNumber: {
            type: String,
            required: true,
            unique: true,
        },
        batch: {
            type: String,
            required: true,
        },
        departmentName: {
            type: String,
            required: true,
        },
        role:{
            type: String,
            default: "Student"
        }
        // assignedTutor: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: "Tutor",
        // },
        // assignedHOD: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: "HOD",
        // },
    },
    { timestamps: true }
);


const Student = mongoose.model("Student", studentSchema);

export default Student;
