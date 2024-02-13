import mongoose, { Schema } from "mongoose";

const userScema = new mongoose.Schema({
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
}, 
{timestamps: true});// מוסיף תאריכים מתי היוזר נוצר במונגו

const User = mongoose.model('User', userScema);

export default User;