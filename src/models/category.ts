import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String, 
            require: [true, 'Please enter a product name']
        },
        price: {
            type: String, 
            require: true
        },
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Please Select a user']
        }
    },{
        timestamps: true
    }
);
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;