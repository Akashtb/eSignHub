import Student from "../models/Student";

export const createStudent = async(req,res)=>{
    const {name,regNumber,email,password,phone,departmentName} = req.body;
    if(!name || !regNumber || !email || !password || !phone || !departmentName){
        return res.status(400).json({message:"All fields are required"})
    }
    try {
        const existingStudent = await Student.findOne({regNumber})
        if(existingStudent){
            return res.status(400).json({message:"Student already exists"})
        }
        const salt = await bycrpt.genSalt(10);
        const hashedPassword = await bycrpt.hash(password,salt);

        await Student.create({
            name,
            regNumber,
            email,
            password:hashedPassword,
            phone,
            departmentName
        })
        return  res.status(201).json({message:"Student created successfully"})
    } catch (error) {
        console.error(error);
        return res.status(500).json({message:"Internal server error",error:error.message})
    }
}

export const updateStudent = async(req,res)=>{
    const studentId = req.params.id;
    try {
        const updateStudent = await Student.findByIdAndUpdate(studentId,req.body,{new:true,runValidators:true});
        if(!updateStudent){
            return res.status(404).json({message:"Student not found"})
        }
        return res.status(200).json({updateStudent,message:"Student updated successfully"})
    } catch (error) {
        console.error(error);
        return res.status(500).json({message:"Internal server error",error:error.message})
    }
}

export const deleteStudent = async(req,res)=>{
    const studentId = req.params.id;
    try {
        const deleteStudent = await Student.findByIdAndDelete(studentId);
        if(!deleteStudent){
            return res.status(404).json({message:"Student not found"})
        }
        res.status(200).json({message:"Student deleted successfully"})
    } catch (error) {
        console.error(error);
        return res.status(500).json({message:"Internal server error",error:error.message})
    }
}

export const viewAllStudent = async(req,res)=>{
    try {
        const allStudent = await Student.find();
        return res.status(200).json({allStudent,message:"Student fetched successfully"})
    } catch (error) {
        console.error(error);
        return res.status(500).json({message:"Internal server error",error:error.message})
    }
}

export const viewStudent = async(req,res)=>{
    const studentId = req.params.id;
    try {
        const viewStudent = await Student.findOne({_id:studentId})
        if(!viewStudent){
            return res.status(404).json({message:"Student not found"})
        }
        return res.status(200).json({viewStudent,message:"Student fetched successfully"})
    } catch (error) {
        console.error(error);
        return res.status(500).json({message:"Internal server error",error:error.message})
    }
}