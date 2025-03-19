import jwt from "jsonwebtoken";
import { createError } from "../utils/customErrorHandling";

export const verifyToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return next(createError(401, "No token provided"))
    }
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) {
            return next(createError(403, "Invalid token"))
        }
        req.user = {
            id: user.id,
            role: user.role,
            email: user.email
        };
        next();
    })
}

export const verifyPrincipal = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user && req.user.role === "Principal") {
            next()
        } else {
            return next(createError(403, "You are not an principal to perform this operation."))
        }
    })
}

export const verifyStaff = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user && req.user.role === "tutor" || req.user.role === "HOD" || req.user.role === "Principal") {
            next()
        } else {
            return next(createError(403, "You are not an staff to perform this operation."))
        }
    })
}

export const verifyStudent = (req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user && req.user.role === "Student" || req.user.role === "tutor" || req.user.role === "HOD" || req.user.role === "Principal"){
            next()
        }else{
            return next(createError(403,"You are not an student to perform this operation."))
        }
    })
}