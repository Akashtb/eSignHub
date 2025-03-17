import Principal from "../models/Principal.js";
import bcrypt from "bcrypt";
import { createError } from "../utils/customErrorHandling.js";

export const createPrincipal = async (req, res, next) => {
    const { name, email, password, phone } = req.body;

    try {
        const existingUser = await Principal.findOne({ email });
        if (existingUser) {
            return next(createError(400, "User already exists"));
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newPrincipal = await Principal.create({
            name,
            email,
            password: hashedPassword,
            phone,
        });

        return res.status(201).json({ message: "User created successfully" });

    } catch (error) {
        next(createError(500, error.message)); 
    }
};

export const viewPrincipal = async (req, res, next) => {
    const principalId = req.params.id;

    try {
        const principal = await Principal.findById(principalId);
        if (!principal) {
            return next(createError(404, "Principal not found"));
        }

        return res.status(200).json({ principal, message: "Principal fetched successfully" });

    } catch (error) {
        next(createError(500, error.message));
    }
};

export const updatePrincipal = async (req, res, next) => {
    const principalId = req.params.id;

    try {
        const updatePrincipal = await Principal.findByIdAndUpdate(principalId, req.body, {
            new: true,
            runValidators: true,
        });

        if (!updatePrincipal) {
            return next(createError(404, "Principal not found"));
        }

        return res.status(200).json({ updatePrincipal, message: "Principal updated successfully" });

    } catch (error) {
        next(createError(500, error.message));
    }
};

export const deletePrincipal = async (req, res, next) => {
    const principalId = req.params.id;

    try {
        const deletePrincipal = await Principal.findByIdAndDelete(principalId);
        
        if (!deletePrincipal) {
            return next(createError(404, "Principal not found"));
        }

        return res.status(200).json({ message: "Principal deleted successfully" });

    } catch (error) {
        next(createError(500, error.message));
    }
};
