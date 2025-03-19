import mongoose from "mongoose";

const principalSchema  = new mongoose.Schema({
    name: {
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
    }
}, {
    timestamps: true
})


const Principal = mongoose.model("Principal",principalSchema);
export default Principal