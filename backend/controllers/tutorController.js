import Tutor from "../models/Tutor.js";
import bycrpt from "bcrypt"

export const createTutor = async(req,res)=>{
    const{email,password,name,phone,departmentName} = req.body
    try {
        const existingUser = await Tutor.findOne({email})
        if(existingUser){
            res.status(400).json({message:"User already exists"})
        }

        const salt = await bycrpt.genSalt(10);
        const hashedPassword = await bycrpt.hash(password,salt);

        await Tutor.create({
            name,
            email,
            password:hashedPassword,
            phone,
            departmentName
        })
        return  res.status(201).json({message:"User created successfully"})
    } catch (error) {
        console.error(error)
        return res.status(500).json({message:"Internal server error",error:error.message})
    }
}

export const updateTutor = async(req,res)=>{
    const tutorId = req.params.id;
    try{
        const updateTutor = await Tutor.findByIdAndUpdate(tutorId,req.body,{new:true,runValidators:true});
        if(!updateTutor){
            return res.status(404).json({message:"Tutor not found"})
        }
        return res.status(200).json({updateTutor,message:"Tutor updated successfully"})
    }catch(error){
        console.error(error)
        return res.status(500).json({message:"Internal server error",error:error.message})
    }
}

export const deleteTutor = async(req,res)=>{
    const tutorId = req.params.id;
    try {
        const deleteTutor = await Tutor.findByIdAndDelete(tutorId);
        if(!deleteTutor){
            return res.status(404).json({message:"Tutor not found"})
        }
        res.status(200).json({message:"Tutor deleted successfully"})
    } catch (error) {
        console.error(error)
        return res.status(500).json({message:"Internal server error",error:error.message})
    }
}
export const viewAllTutor = async(req,res)=>{
    try{
        const allTutor = await Tutor.find();
        if(!allTutor){
            return res.status(404).json({message:"Tutor not found"})
        }
        return res.status(200).json({allTutor,message:"Tutor fetched successfully"})
    }catch(error){
        console.error(error)
        return res.status(500).json({message:"Internal server error",error:error.message})
    }
}

export const viewTutor = async(req,res)=>{
    const tutorId = req.params.id;
    try{
        const viewTutor = await Tutor.findOne({_id:tutorId});
        if(!viewTutor){
            return res.status(404).json({message:"Tutor not found"})
        }
        return res.status(200).json({viewTutor,message:"Tutor fetched successfully"})
    }catch(error){
        console.error(error)
        return res.status(500).json({message:"Internal server error",error:error.message})
    }
}