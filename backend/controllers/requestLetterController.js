import RequestLetter from "../models/requestLetter.js"
import { createError } from "../utils/customErrorHandling.js"

export const createRequestLetter = async(req,res)=>{
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

export const updateRequestLetter = async (req, res, next) => {
    const { id } = req.params;
    const { user } = req; 

    try {
        const existingRequest = await RequestLetter.findById(id);
        if (!existingRequest) {
            return next(createError(404, "Request Letter not found"));
        }

        if (existingRequest.fromUid.toString() !== user.id) {
            return next(createError(403, "You are not authorized to update this request letter"));
        }

        if (["approved", "rejected"].includes(existingRequest.status)) {
            return next(createError(400, "Request Letter cannot be updated after approval or rejection"));
        }

        const updatedRequestLetter = await RequestLetter.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );

        return res.status(200).json({
            updatedRequestLetter,
            message: "Request Letter updated successfully",
        });

    } catch (error) {
        next(createError(500, error.message));
    }
};


export const deleteRequestLetter = async (req, res, next) => {
    const { id } = req.params;
    const { user } = req; 

    try {
        const existingRequest = await RequestLetter.findById(id);
        if (!existingRequest) {
            return next(createError(404, "Request Letter not found"));
        }

        if (existingRequest.fromUid.toString() !== user.id) {
            return next(createError(403, "You are not authorized to update this request letter"));
        }

        if (["approved", "rejected"].includes(existingRequest.status)) {
            return next(createError(400, "Request Letter cannot be updated after approval or rejection"));
        }

        const updatedRequestLetter = await RequestLetter.findByIdAndDelete(id);

        return res.status(200).json({
            updatedRequestLetter,
            message: "Request Letter updated successfully",
        });

    } catch (error) {
        next(createError(500, error.message));
    }
};



//principal
export const viewAllRequestLetter = async(req,res,next)=>{
    try {
        const allRequestLetter = await RequestLetter.find()
        return res.status(200).json(allRequestLetter)
    } catch (error) {
        next(createError(500, error.message));
    }
}

//single 
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


// toUid - principal

export const receviedRequestLetter = async (req, res, next) => {
    try {
        const requestLetters = await RequestLetter.find({ "toUids.role": req.user.role });

        res.status(200).json({ 
            success: true,
            message: requestLetters.length ? "Request letters retrieved successfully" : "No request letters found",
            requestLetters 
        });

    } catch (error) {
        next(createError(500, error.message));
    }
};


// export const requestLetterforHOD = async (req, res, next) => {

//     const {id} = req.params;

//     try {
//         const requestLetters = await RequestLetter.find({ "toUids.userId": id, "toUids.role": "HOD" });
//         res.status(200).json({ 
//             success: true,
//             message: requestLetters.length ? "Request letters retrieved successfully" : "No request letters found",
//             requestLetters 
//         });
//     } catch (error) {
//         next(createError(500, error.message));
//     }

// }

// export const requestLetterForTutor = async (req, res, next) => {
//     const {id} = req.params;

//     try {
//         const requestLetters = await RequestLetter.find({ "toUids.userId": id, "toUids.role": "Tutor" });
//         res.status(200).json({ 
//             success: true,
//             message: requestLetters.length ? "Request letters retrieved successfully" : "No request letters found",
//             requestLetters 
//         });
//     } catch (error) {
//         next(createError(500, error.message));
//     }
// }

export const listOfSentRequestLetter = async (req, res, next) => {
    try {
        const requestLetters = await RequestLetter.find({ fromUid: req.user.id});
        res.status(200).json({ 
            success: true,
            message: requestLetters.length ? "Request letters retrieved successfully" : "No request letters found",
            requestLetters 
        });
    } catch (error) {
        next(createError(500, error.message));
    }
}


export const approveRequestLetter = async (req, res, next) => {
    const { id } = req.params;
    const { user } = req; 

    try {
        const requestLetter = await RequestLetter.findById(id);
        if (!requestLetter) {
            return res.status(404).json({ success: false, message: "Request Letter not found" });
        }

        const isAuthorized = requestLetter.toUids.some(
            (recipient) => recipient.userId.toString() === user.id && recipient.role.toLowerCase() === user.role.toLowerCase()
        );

        if (!isAuthorized) {
            return res.status(403).json({ success: false, message: "You are not authorized to approve this request" });
        }

        if (requestLetter.status === "approved") {
            return res.status(400).json({ success: false, message: "Request Letter already approved" });
        }
        if (requestLetter.status === "rejected") {
            return res.status(400).json({ success: false, message: "Request Letter already rejected" });
        }

        // Approve request
        requestLetter.status = "approved";
        requestLetter.approvedBy = user.id;
        await requestLetter.save();

        res.status(200).json({ success: true, message: "Request Letter approved successfully" });

    } catch (error) {
        next(createError(500, error.message));
    }
};


export const rejectRequestLetter = async (req, res, next) => {
    const { id } = req.params;
    const { user } = req; 

    try {
        const requestLetter = await RequestLetter.findById(id);
        if (!requestLetter) {
            return res.status(404).json({ success: false, message: "Request Letter not found" });
        }

        const isAuthorized = requestLetter.toUids.some(
            (recipient) => recipient.userId.toString() === user.id && recipient.role.toLowerCase() === user.role.toLowerCase()
        );

        if (!isAuthorized) {
            return res.status(403).json({ success: false, message: "You are not authorized to approve this request" });
        }

        if (requestLetter.status === "approved") {
            return res.status(400).json({ success: false, message: "Request Letter already approved" });
        }
        if (requestLetter.status === "rejected") {
            return res.status(400).json({ success: false, message: "Request Letter already rejected" });
        }

        requestLetter.status = "rejected";
        requestLetter.approvedBy = user.id;
        await requestLetter.save();

        res.status(200).json({ success: true, message: "Request Letter rejected successfully" });

    } catch (error) {
        next(createError(500, error.message));
    }
};


export const markRequestLetterAsSeen = async (req, res, next) => {
    const { id } = req.params;
    const { user } = req;

    try {
        const requestLetter = await RequestLetter.findById(id);
        if (!requestLetter) {
            return res.status(404).json({ success: false, message: "Request Letter not found" });
        }

        if (!requestLetter.seenBy.includes(user.id)) {
            requestLetter.seenBy.push(user.id);
            await requestLetter.save();
        }

        res.status(200).json({ success: true, message: "Request Letter marked as seen successfully" });

    } catch (error) {
        next(createError(500, error.message));
    }
};

export const getListOfUnseenRequestLetters = async (req, res, next) => {
    try {
        const { user } = req; 

        if (!user || user.role !== "Principal") {
            return res.status(403).json({ success: false, message: "Access denied" });
        }

        const unseenLetters = await RequestLetter.find({
            "toUids.userId": user.id,
            "toUids.role": user.role,
            seenBy: { $ne: user.id } 
        })
        .sort({ createdAt: -1 }); 

        if (unseenLetters.length === 0) {
            return res.status(404).json({ success: false, message: "No unseen request letters found" });
        }

        res.status(200).json({ success: true, count: unseenLetters.length, unseenLetters });

    } catch (error) {
        next(createError(500, error.message));
    }
};



