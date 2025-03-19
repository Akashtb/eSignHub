import mongoose from "mongoose";

const requestLetterSchema = new mongoose.Schema(
  {
    fromUid: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    fromRole: {
      type: String,
      enum: ["student", "tutor", "hod"], 
      required: true,
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
        },
        role: {
          type: String,
          enum: ["Principal", "Tutor", "HOD"],
          required: true,
        },
      },
    ],
    approvedBy: {
        type: mongoose.Schema.Types.ObjectId,
    },
    seenBy:{
        type: [mongoose.Schema.Types.ObjectId],
        default: []
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

  },
  { timestamps: true }
);

const RequestLetter = mongoose.model("RequestLetter", requestLetterSchema);
export default RequestLetter;
