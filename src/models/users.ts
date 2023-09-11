import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String, 
            require: [true, 'Please enter a username']
        },
        password: {
            type: String, 
            required: true, 
            select: false
        },
        fullname: {
            type: String, 
            require: [true, 'Please enter a Full name']
        },
        store_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Stores',
            required: true,
        },
        role_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Roles',
            required: true
        }
    },{
        timestamps: true
    }
);
const Users = mongoose.model('Users', userSchema);

module.exports = Users;