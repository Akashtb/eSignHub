import jwt from "jsonwebtoken";
import { createError } from "../utils/customErrorHandling.js";

export const verifyToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ error: "No token provided" }); 
    }

    const token = authHeader.split(' ')[1];
    
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: err.message }); 
        }
        req.user = user;

        next();
    });
};


export const verifyPrincipal = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user && req.user.role === "Principal") {
            next()
        } else {
            return next(createError(403, "You are not an principal to perform this operation."))
        }
    })
}

export const verifyHOD = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user && req.user.role === "HOD" || req.user.role === "Principal") {
            next()
        } else {
            return next(createError(403, "You are not an principal to perform this operation."))
        }
    })
}

export const verifyTutor = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user && req.user.role === "Tutor" || req.user.role === "Principal") {
            next()
        } else {
            return next(createError(403, "You are not an principal to perform this operation."))
        }
    })
}


export const verifyStaff = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user && req.user.role === "Tutor" || req.user.role === "HOD" || req.user.role === "Principal") {
            next()
        } else {
            return next(createError(403, "You are not an staff to perform this operation."))
        }
    })
}

export const verifyStudent = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user && req.user.role === "Student" || req.user.role === "Tutor" || req.user.role === "HOD" || req.user.role === "Principal") {
            next()
        } else {
            return next(createError(403, "You are not an student to perform this operation."))
        }
    })
}