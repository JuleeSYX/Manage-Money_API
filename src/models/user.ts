import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String, 
            require: [true, 'Please enter a product name']
        },
        email: {
            type: String, 
            require: true
        },
        password: {
            type: String, 
            required: true, 
            select: false
        },
    },{
        timestamps: true
    }
);
const User = mongoose.model('User', userSchema);

module.exports = User;