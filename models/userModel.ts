// @ts-ignore
import mongoose from "mongoose";

const userScehma = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please provide email"],
        unique: true
    },
    username: {
        type: String,
        required: [true, "Please provide username"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please provide password"],
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken : String,
    forgotPasswordTokenExpiry : Date,
    verifyToken : String,
    verifyTokenExpiry : Date
})

const User = mongoose.models.users || mongoose.model
    ("users", userScehma);

export default User;