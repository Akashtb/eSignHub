import mongoose from "mongoose"
import HOD from "../models/HOD.js"
import Principal from "../models/Principal.js"
import RequestLetter from "../models/requestLetter.js"
import Tutor from "../models/Tutor.js"
import { createError } from "../utils/customErrorHandling.js"

export const createRequestLetter = async (req, res,next) => {
    const fromUid = req.user.id
    const fromRole = req.user.role
    const { subject, messageBody, toUids } = req.body
    console.log(toUids, "toUids");

    try {
        await RequestLetter.create({
            fromUid,
            fromRole,
            subject,
            messageBody,
            toUids,
            status: "pending"
        })
        return res.status(201).json({ message: "Request Letter created successfully" })
    } catch (error) {
        console.error(error.message, "error message");
        
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



export const viewAllRequestLetter = async (req, res, next) => {
    const { role, id } = req.user;

    try {
        let filter = {};

        if (role === "Principal") {
            filter = {};
        } else if (role === "Tutor" || role === "HOD") {
            filter = { "toUids.userId": id };
        } else if (role === "Student") {
            filter = { fromUid: id };
        } else {
            return res.status(403).json({ message: "Unauthorized access" });
        }

        const allRequestLetter = await RequestLetter.find(filter)
            .populate("fromUid", "firstName lastName email")
            .populate("toUids.userId", "firstName lastName email role")
            .populate("approvedBy.userId", "firstName lastName email role")
            .sort({ createdAt: -1 })
            .lean();

        return res.status(200).json(allRequestLetter);
    } catch (error) {
        next(createError(500, error.message));
    }
};



export const getLetterRecipients = async (req, res, next) => {
    try {
        const { departmentName } = req.user;

        if (!departmentName) {
            return res.status(400).json({ message: "Department name is required" });
        }

        const hods = await HOD.find({ departmentName }).select("_id firstName lastName email role");
        const tutors = await Tutor.find({ departmentName }).select("_id firstName lastName email role");
        const principal = await Principal.findOne().select("_id firstName lastName email role");

        const recipients = [...hods, ...tutors, ...(principal ? [principal] : [])];

        return res.status(200).json({ recipients });
    } catch (error) {
        next(createError(500, error.message));
    }
};





export const viewRequestLetter = async (req, res, next) => {
    const { id } = req.params;

    try {
        const viewRequestLetter = await RequestLetter.findOne({ _id: id })
            .populate("fromUid", "firstName lastName email")
            .populate("toUids.userId", "firstName lastName email role")
            .populate("approvedBy", "firstName lastName email role");

        if (!viewRequestLetter) {
            return next(createError(404, "Request Letter not found"));
        }

        const fromUid = {
            email: viewRequestLetter.fromUid?.email,
            fullName: `${viewRequestLetter.fromUid?.firstName} ${viewRequestLetter.fromUid?.lastName}`
        };

        const toUids = viewRequestLetter.toUids.map(recipient => ({
            email: recipient.userId?.email,
            fullName: `${recipient.userId?.firstName} ${recipient.userId?.lastName}`,
            role: recipient.role
        }));

        const approvedBy = viewRequestLetter.approvedBy
            ? {
                email: viewRequestLetter.approvedBy.email,
                fullName: `${viewRequestLetter.approvedBy.firstName} ${viewRequestLetter.approvedBy.lastName}`,
                role: viewRequestLetter.approvedBy.role
            }
            : null; // Keep null if not approved yet

        return res.status(200).json({
            ...viewRequestLetter.toObject(),
            fromUid,
            toUids,
            approvedBy
        });

    } catch (error) {
        next(createError(500, error.message));
    }
};







// export const receviedRequestLetter = async (req, res, next) => {
//     try {
//         const requestLetters = await RequestLetter.find({ "toUids.role": req.user.role });

//         res.status(200).json({ 
//             success: true,
//             message: requestLetters.length ? "Request letters retrieved successfully" : "No request letters found",
//             requestLetters 
//         });

//     } catch (error) {
//         next(createError(500, error.message));
//     }
// };


export const listOfSentRequestLetter = async (req, res, next) => {
    try {
        const requestLetters = await RequestLetter.find({ fromUid: req.user.id });
        res.status(200).json({
            success: true,
            message: requestLetters.length ? "Request letters retrieved successfully" : "No request letters found",
            requestLetters
        });
    } catch (error) {
        next(createError(500, error.message));
    }
}


const generateUniqueCode = async () => {
    let uniqueCode;
    let isUnique = false;

    while (!isUnique) {
        uniqueCode = Math.floor(100000 + Math.random() * 900000).toString();
        const existingLetter = await RequestLetter.findOne({ uniqueCode });
        if (!existingLetter) {
            isUnique = true;
        }
    }

    return uniqueCode;
};

export const approveRequestLetter = async (req, res, next) => {
    const { id } = req.params;
    const { user } = req;

    try {
        const requestLetter = await RequestLetter.findById(id);
        if (!requestLetter) {
            return res.status(404).json({ success: false, message: "Request Letter not found" });
        }

        const isAuthorized =
            user.role.toLowerCase() === "principal" ||
            requestLetter.toUids.some(
                (recipient) =>
                    recipient.userId.toString() === user.id &&
                    recipient.role.toLowerCase() === user.role.toLowerCase()
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

        requestLetter.status = "approved";
        requestLetter.approvedBy = {
            userId: user.id,
            role: user.role,
            name: user.name,
        };

        if (!requestLetter.uniqueCode) {
            requestLetter.uniqueCode = await generateUniqueCode();
        }

        await requestLetter.save();

        res.status(200).json({
            success: true,
            message: "Request Letter approved successfully",
            uniqueCode: requestLetter.uniqueCode,
        });

    } catch (error) {
        next(createError(500, error.message));
    }
};



export const rejectRequestLetter = async (req, res, next) => {
    const { id } = req.params;
    const { user } = req;

    console.log(id, "_id rejectRequestLetter");
    try {
        const requestLetter = await RequestLetter.findById(id);
        if (!requestLetter) {
            return res.status(404).json({ success: false, message: "Request Letter not found" });
        }

        const isAuthorized =
            user.role.toLowerCase() === "principal" ||
            requestLetter.toUids.some(
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
        requestLetter.approvedBy = {
            userId: user.id,
            role: user.role
        };

        await requestLetter.save();

        res.status(200).json({ success: true, message: "Request Letter approved successfully" });

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

        const alreadySeen = requestLetter.seenBy.some(seenUser => seenUser.userId.toString() === user.id);

        if (alreadySeen) {
            return res.status(200).json({ success: true, message: "Request Letter marked as seen already" });
        }

        requestLetter.seenBy.push({ userId: user.id });
        await requestLetter.save();

        res.status(200).json({ success: true, message: "Request Letter marked as seen successfully" });

    } catch (error) {
        next(createError(500, error.message));
    }
};




export const getListOfUnseenRequestLetters = async (req, res, next) => {
    try {
        const { user } = req;

        const userId = new mongoose.Types.ObjectId(user.id);

        

        const unseenLetters = await RequestLetter.aggregate([
            {
                $match: {
                    toUids: {
                      $elemMatch: {
                        userId: userId,
                        role: user.role
                      }
                    },
                    seenBy: { $not: { $elemMatch: { userId: userId } } }
                  }
            },
            {
                $lookup: {
                    from: "students",
                    localField: "fromUid",
                    foreignField: "_id",
                    as: "fromUser"
                }
            },
            {
                $unwind: {
                    path: "$fromUser",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $addFields: {
                    "fromUser.fullName": {
                        $concat: [
                            { $ifNull: ["$fromUser.firstName", ""] },
                            " ",
                            { $ifNull: ["$fromUser.lastName", ""] }
                        ]
                    }
                }
            },
            {
                $sort: { createdAt: -1 }
            },
            {
                $project: {
                    fromUid: 0,
                }
            }
        ]);
        console.log(unseenLetters, "unseenLetters list");


        res.status(200).json({ success: true, count: unseenLetters.length, unseenLetters });

    } catch (error) {
        next(createError(500, error.message));
    }
};
