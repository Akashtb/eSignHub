import Student from "../models/Student.js";
import bcrypt from "bcrypt";
import { createError } from "../utils/customErrorHandling.js";

export const createStudent = async (req, res, next) => {
    const { name, regNumber, email, password,batch, phone, departmentName } = req.body;

    if (!name || !regNumber || !email || !password || !phone || !departmentName) {
        return next(createError(400, "All fields are required"));
    }

    try {
        const existingStudent = await Student.findOne({ regNumber });
        if (existingStudent) {
            return next(createError(400, "Student already exists"));
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await Student.create({
            name,
            regNumber,
            email,
            batch,
            password: hashedPassword,
            phone,
            departmentName,
        });

        return res.status(201).json({ message: "Student created successfully" });

    } catch (error) {
        next(createError(500, error.message));
    }
};

export const updateStudent = async (req, res, next) => {
    const studentId = req.params.id;

    try {
        const updateStudent = await Student.findByIdAndUpdate(studentId, req.body, {
            new: true,
            runValidators: true,
        });

        if (!updateStudent) {
            return next(createError(404, "Student not found"));
        }

        return res.status(200).json({ updateStudent, message: "Student updated successfully" });

    } catch (error) {
        next(createError(500, error.message));
    }
};

export const deleteStudent = async (req, res, next) => {
    const studentId = req.params.id;

    try {
        const deleteStudent = await Student.findByIdAndDelete(studentId);

        if (!deleteStudent) {
            return next(createError(404, "Student not found"));
        }

        return res.status(200).json({ message: "Student deleted successfully" });

    } catch (error) {
        next(createError(500, error.message));
    }
};

export const viewAllStudent = async (req, res, next) => {
    try {
        const allStudents = await Student.find();
        return res.status(200).json({ 
            students: allStudents, 
            count: allStudents.length, 
            message: allStudents.length > 0 ? "Students fetched successfully" : "No students found"
        });
    } catch (error) {
        next(createError(500, error.message));
    }
};

export const viewStudent = async (req, res, next) => {
    const studentId = req.params.id;

    try {
        const student = await Student.findById(studentId);
        if (!student) {
            return next(createError(404, "Student not found"));
        }

        return res.status(200).json({ student, message: "Student fetched successfully" });

    } catch (error) {
        next(createError(500, error.message));
    }
};
