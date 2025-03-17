import HOD from "../models/HOD.js"
import bycrpt from "bcrypt"


export const createHod = async(req,res)=>{
    const{email,password,name,phone,departmentName} = req.body
    try {
        const existingUser = await HOD.findOne({email})
        if(existingUser){
            res.status(400).json({message:"User already exists"})
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
        console.error(error)
        res.status(500).json({message:error.message})
    }
}

export const updateHod = async(req,res)=>{
    const{id} = req.params
    try{
        const updateHod  = await HOD.findByIdAndUpdate(id,req.body,{new:true,runValidators:true});
        if(!updateHod){
            return res.status(404).json({message:"HOD not found"})
        }
        return res.status(200).json({updateHod,message:"HOD updated successfully"})
    }catch(error){
        console.error(error)
        return res.status(500).json({message:error.message})
    }
}

export const deleteHod = async(req,res)=>{
    const{id} = req.params
    try {
        const deleteHod = await HOD.findByIdAndDelete(id)
        if(!deleteHod){
            return res.status(400).json({message:"HOD not found"})
        }
        return res.status(200).json({message:"HOD deleted successfully"})
    } catch (error) {
        console.error(error)
        return res.status(500).json({message:error.message})
    }
}

export const viewAllHod = async(req,res)=>{
    try{
        const viewAllHod = await HOD.find()
        return res.status(200).json(viewAllHod)
    }catch(error){
        console.error(error)
        return res.status(500).json({message:error.message})
    }
}

export const viewHod= async(req,res)=>{
    const{id}=req.params
    try{
        const viewAll = await HOD.findOne({_id:id})
        if(!viewAll){
            return res.status(404).json({message:"User not found"})
        }
        return res.status(200).json(viewAll)
    }catch(error){ 
        console.error(error)
        return res.status(500).json({message:error.message})
    }
}