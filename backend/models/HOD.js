import mongoose from "mongoose";

const hodSchema = mongoose.Schema({
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
    },
    departmentName: {
        type: String,
        required: true,
    },
    role:{
        type: String,
        default: "HOD"
    }

},
    { timestamps: true }
)

const HOD = mongoose.model("HOD",hodSchema);
export default HOD