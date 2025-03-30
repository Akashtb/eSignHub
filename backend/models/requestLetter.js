import mongoose from "mongoose";

const requestLetterSchema = new mongoose.Schema(
  {
    fromUid: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Student", // Ensuring the sender is always a Student
    },
    fromRole: {
      type: String,
      enum: ["Student"],
      required: true,
      default: "Student", // Since it's always a student
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
          refPath: "toUids.role", // Dynamic reference to different models
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
        refPath: "approvedBy.role", // Dynamic reference
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
    seenBy: {
      type: [
        {
          userId: {
            type: mongoose.Schema.Types.ObjectId,
            refPath: "seenBy.role", // Dynamic reference
          },
          name: String,
          role: {
            type: String,
            enum: ["Principal", "Tutor", "HOD"],
          },
        },
      ],
      default: [],
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
