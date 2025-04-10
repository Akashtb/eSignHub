import mongoose from "mongoose";

const requestLetterSchema = new mongoose.Schema(
  {
    fromUid: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Student", 
    },
    fromRole: {
      type: String,
      enum: ["Student"],
      required: true,
      default: "Student", 
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    messageBody: {
      type: String,
      required: true,
    },
    toUids: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          refPath: "toUids.role", 
        },
        role: {
          type: String,
          enum: ["Principal", "Tutor", "HOD"],
          required: true,
        },
      },
    ],
    approvedBy: {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: "approvedBy.role", 
      },
      role: {
        type: String,
        enum: ["Principal", "Tutor", "HOD"],
      },
      name: {
        type: String,
        trim: true,
      },
    },
    seenBy: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
        }
      }
    ],
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    uniqueCode :{
      type:String,
    }
  },
  { timestamps: true }
);

const RequestLetter = mongoose.model("RequestLetter", requestLetterSchema);
export default RequestLetter;
