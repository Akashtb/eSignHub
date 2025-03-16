import HOD from "../models/HOD.js"
import Principal from "../models/Principal.js"
import Student from "../models/Student.js"
import Tutor from "../models/Tutor.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


const roleModels = {
    principle: Principal,
    student: Student,
    tutor: Tutor,
    hod: HOD,
}

export const Login =async (req, res) => {
    try {
        const { email, password, role ,regNumber } = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({ message: "Email,Password and role are required" })
        }

        const Model = roleModels[role.toLowerCase()]

        if (!Model) {
            return res.status(400).json({ message: "Invalid role" })
        }
        let user
        if(Model==="Student"){
             user = await Model.findOne({ regNumber });
        }else{
             user = await Model.findOne({ email });
        }

        if (!user) {
            return res.status(400).json({ message: "User not found" })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" })
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

        res.cookie("resfreshToken",refreshToken,{
            httpOnly: true,
            secure: true,
            maxAge: 24 * 60 * 60 * 1000 
        }).status(201).json({message:"Login successfull",accessToken:accessToken,role:otherDetails.role})

    } catch (error) {
        res.status(500).json(error)
    }
}


export const logOut = (req, res) => {
    res.clearCookie("refreshToken", { httpOnly: true, secure: true, sameSite: 'none' });
    res.status(200).json({ message: "logged out successfully" })
}