import HOD from "../models/HOD.js"
import Principal from "../models/Principal.js"
import Student from "../models/Student.js"
import Tutor from "../models/Tutor.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { createError } from "../utils/customErrorHandling.js"


const roleModels = {
    Principal: Principal,
    Student: Student,
    Tutor: Tutor,
    HOD: HOD,
}

export const Login =async (req, res,next) => {
    try {
        const { email, password, role ,regNumber } = req.body;
        if (!password || !role) {
            return next(createError(400, "All fields are required"));
        }

        const Model = roleModels[role]

        if (!Model) {
            return next(createError(400, "Invalid role"))
        }
        let user
        if(role==="Student"){
             user = await Model.findOne({ regNumber });
        }else{
             user = await Model.findOne({ email });
        }

        if (!user) {
            return next(createError(400, "User not found"))
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return next(createError(400, "Invalid credentials"))
        }

        const accessToken = jwt.sign({
            id: user._id,
            role: user.role,
            email: user.email
        }, process.env.JWT_SECRET,{ expiresIn: "1h" })

        const {_id,password:_,...otherDetails} = user._doc

        const refreshToken = jwt.sign(
            {
                id: user._id,
                role: user.role,    
                email: user.email
            },
            process.env.JWT_SECRET
        )

        res.cookie("refreshToken",refreshToken,{
            httpOnly: true,
            secure: true,
            maxAge: 24 * 60 * 60 * 1000 
        }).status(201).json({message:"Login successfull",accessToken:accessToken,role:otherDetails.role})

    } catch (error) {
        next(createError(500, error.message));
    }
}


export const logOut = (req, res,next) => {
    res.clearCookie("refreshToken", { httpOnly: true, secure: true, sameSite: 'none' });
    res.status(200).json({ message: "logged out successfully" })
}