import RequestLetter from "../models/requestLetter.js"

export const createrequestLetter = async(req,res)=>{
    const {fromUid} = req.params
    const {fromRole,subject,messageBody,toUid} = req.body
    try {
        await RequestLetter.create({
            fromUid,
            fromRole,
            subject,
            messageBody,
            toUid,
            status:"pending"
        })
        return res.status(201).json({message:"Request Letter created successfully"})
    } catch (error) {
        next(createError(500, error.message));
    }
}

export const updateRequestLetter = async(req,res,next)=>{
    const {id} = req.params
    try {
        const existingRequest = await RequestLetter.findById(id);

        if (!existingRequest) return next(createError(404, "Request Letter not found"));

        if (["approved", "rejected"].includes(existingRequest.status)) {
            return next(createError(400, "Request Letter cannot be updated after approval or rejection"));
        }

        const updateRequestLetter = await RequestLetter.findByIdAndUpdate(id,req.body,{new:true,runValidators:true})
            
        return res.status(200).json({updateRequestLetter,message:"Request Letter updated successfully"})
    } catch (error) {
        next(createError(500, error.message));
    }
}

export const deleteRequestLetter = async(req,res,next)=>{
    const {id} = req.params
    try {
        const existingRequest = await RequestLetter.findById(id);

        if (!existingRequest) return next(createError(404, "Request Letter not found"));

        if (["approved", "rejected"].includes(existingRequest.status)) {
            return next(createError(400, "Request Letter cannot be delete after approval or rejection"));
        }

        await RequestLetter.findByIdAndDelete(id)
            
        return res.status(200).json({message:"Request Letter deleted successfully"})
    } catch (error) {
        next(createError(500, error.message));
    }
} 

export const viewAllRequestLetter = async(req,res,next)=>{
    try {
        const allRequestLetter = await RequestLetter.find()
        return res.status(200).json(allRequestLetter)
    } catch (error) {
        next(createError(500, error.message));
    }
}


export const viewRequestLetter= async(req,res,next)=>{
    const {id}=req.params
    try {
        const viewRequestLetter = await RequestLetter.findOne({_id:id})
        if(!viewRequestLetter){
            return next(createError(404,"Request Letter not found"))
        }
        return res.status(200).json(viewRequestLetter)
    } catch (error) {
        next(createError(500, error.message));
    }
}
