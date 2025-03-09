import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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
        Batch: {
            type: String,
            required: true,
        },
        departmentName: {
            type: String,
            required: true,
        },
        departmentCode: {
            type: String,
        },
        instituteCode: {
            type: String,
        },
        currentSemester: {
            type: Number,
            required: true,
        },
        assignedTutor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tutor",
        },
    },
    { timestamps: true }
);


const Student = mongoose.model("Student", studentSchema);

export default Student;
