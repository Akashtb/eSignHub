import HOD from "../models/HOD.js"
import bycrpt from "bcrypt"
import { createError } from "../utils/customErrorHandling.js"


export const createHod = async(req,res,next)=>{
    const{email,password,name,phone,departmentName} = req.body
    try {
        const existingUser = await HOD.findOne({email})
        if(existingUser){
            return next(createError(400,"User already exists"))
        }
        const salt = await bycrpt.genSalt(10);
        const hashedPassword = await bycrpt.hash(password,salt);

        await HOD.create({
            name,
            email,
            password:hashedPassword,
            phone,
            departmentName
        })
        return  res.status(201).json({message:"User created successfully"})
    } catch (error) {
        next(createError(500, error.message));
    }
}

export const updateHod = async(req,res,next)=>{
    const{id} = req.params
    try{
        const updateHod  = await HOD.findByIdAndUpdate(id,req.body,{new:true,runValidators:true});
        if(!updateHod){
            return next(createError(404,"User not found"))
        }
        return res.status(200).json({updateHod,message:"HOD updated successfully"})
    }catch(error){
        next(createError(500, error.message));
    }
}

export const deleteHod = async(req,res,next)=>{
    const{id} = req.params
    try {
        const deleteHod = await HOD.findByIdAndDelete(id)
        if(!deleteHod){
            return next(createError(404,"User not found"))
        }
        return res.status(200).json({message:"HOD deleted successfully"})
    } catch (error) {
        next(createError(500, error.message));
    }
}

export const viewAllHod = async(req,res,next)=>{
    try{
        const viewAllHod = await HOD.find()
        return res.status(200).json(viewAllHod)
    }catch(error){
        next(createError(500, error.message));
    }
}

export const viewHod= async(req,res,next)=>{
    const{id}=req.params
    try{
        const viewAll = await HOD.findOne({_id:id})
        if(!viewAll){
            return next(createError(404,"User not found"))
        }
        return res.status(200).json(viewAll)
    }catch(error){ 
        next(createError(500, error.message));
    }
}