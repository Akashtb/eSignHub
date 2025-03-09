import mongoose from "mongoose";

const hodSchema = mongoose.Schema({
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
    },
    departmentName: {
        type: String,
        required: true,
    },

},
    { timestamps: true }
)

const HOD = mongoose.model("HOD",hodSchema);
export default HOD