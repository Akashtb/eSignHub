import mongoose from "mongoose";

const tutorSchema = mongoose.Schema({
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
    },
    dateOfBirth: {
        type: Date,
    },
    departmentName: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "Tutor"
    }

},
    { timestamps: true }
)

const Tutor = mongoose.model("Tutor", tutorSchema);
export default Tutor