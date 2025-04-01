import mongoose from "mongoose";

const principalSchema  = new mongoose.Schema({
    img:{
        type:String
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
    },
    phone: {
        type: Number,
    },
    role:{
        type: String,
        default: "Principal"
    }
}, {
    timestamps: true
})


const Principal = mongoose.model("Principal",principalSchema);
export default Principal