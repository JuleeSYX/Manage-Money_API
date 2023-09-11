import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String, 
            require: [true, 'Please enter a category name']
        },
        description: {
            type: String, 
        },
        image:{
            type: String
        },
        index:{
            type: Number
        }
    },{
        timestamps: true
    }
);
const Categories = mongoose.model('Categories', categorySchema);

module.exports = Categories;