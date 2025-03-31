import Tutor from "../models/Tutor.js";
import bcrypt from "bcrypt";
import { createError } from "../utils/customErrorHandling.js";

export const createTutor = async (req, res, next) => {
    const { email, password,firstName,lastName, phone, departmentName,img } = req.body;

    if (!email || !password || !phone || !departmentName|| !firstName|| !lastName) {
        return next(createError(400, "All fields are required"));
    }

    try {
        const existingUser = await Tutor.findOne({ email });
        if (existingUser) {
            return next(createError(400, "Tutor already exists"));
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newTutor = await Tutor.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            phone,
            departmentName,
            img
        });

        return res.status(201).json({
            message: "User created successfully",
            tutor: newTutor,
        });

    } catch (error) {
        next(createError(500, error.message));
    }
};

export const updateTutor = async (req, res, next) => {
    const tutorId = req.params.id;
    try {
        const updatedTutor = await Tutor.findByIdAndUpdate(tutorId, req.body, { new: true, runValidators: true });
        if (!updatedTutor) {
            return next(createError(404, "Tutor not found"));
        }
        return res.status(200).json({ tutor: updatedTutor, message: "Tutor updated successfully" });

    } catch (error) {
        next(createError(500, error.message));
    }
};

export const deleteTutor = async (req, res, next) => {
    const tutorId = req.params.id;
    try {
        const deletedTutor = await Tutor.findByIdAndDelete(tutorId);
        if (!deletedTutor) {
            return next(createError(404, "Tutor not found"));
        }
        return res.status(200).json({ message: "Tutor deleted successfully" });

    } catch (error) {
        next(createError(500, error.message));
    }
};

export const viewAllTutors = async (req, res, next) => {
    try {
        const allTutors = await Tutor.find();
        console.log("tutor fetcched succefully");
        
        return res.status(200).json({
            tutors: allTutors,
            count: allTutors.length,
            message: allTutors.length > 0 ? "Tutors fetched successfully" : "No tutors found",
        });

    } catch (error) {
        next(createError(500, error.message));
    }
};

export const viewTutor = async (req, res, next) => {
    const tutorId = req.params.id;
    try {
        const tutor = await Tutor.findById(tutorId);
        if (!tutor) {
            return next(createError(404, "Tutor not found"));
        }
        return res.status(200).json({ tutor, message: "Tutor fetched successfully" });

    } catch (error) {
        next(createError(500, error.message));
    }
};
