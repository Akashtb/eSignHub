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
    phone: {
        type: Number,
    },
    status: {
        type: Boolean,
        default: false
    },
    address: {
        type: String
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