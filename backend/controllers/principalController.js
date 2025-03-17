import Principal from "../models/Principal.js"
import bcrypt from "bcrypt"


export const createPrincipal = async(req,res)=>{
    const{name,email,password,phone}=req.body
    try{
        const existingUser = await Principal.findOne({email})
        if(existingUser){
            return res.status(400).json({message:"User already exists"})
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newPrincipal = await Principal.create(
            {
                name,
                email,
                password:hashedPassword,
                phone
            })

            return res.status(201).json({message:"User created successfully"})
    }catch(error){
        console.error(error)
        return res.status(500).json({ message: "Internal server error", error: error.message })
    }
}

export const viewPrincipal = async(req,res)=>{
    const principalId = req.params.id;
    try {
        const principal = await Principal.findOne({_id:principalId});
        if(!principal){
            return res.status(404).json({message:"Principal not found"})
        }
        return res.status(200).json({principal,message:"Principal fetched successfully"})
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Internal server error", error: error.message })
    }
}

export const updatePrincipal = async(req,res)=>{
    const principalId = req.params.id;
    try {
        const updatePrincipal = await Principal.findByIdAndUpdate(principalId,req.body,{new:true,runValidators:true});
        if(!updatePrincipal){
            return res.status(404).json({message:"Principal not found"})
        }
        return res.status(200).json({updatePrincipal,message:"Principal updated successfully"})    
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Internal server error", error: error.message })
    }
}



export const deletePrincipal = async (req, res) => {
    const principalId = req.params.id;
    try {
        const deletePrincipal = await Principal.findByIdAndDelete(principalId);
        console.log(deletePrincipal);
        
        if (!deletePrincipal) {
            return res.status(404).json({ message: "Principal not found" });
        }
        return res.status(200).json({ message: "Principal deleted successfully" });

    } catch (error) {
        console.error("Error deleting principal:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

