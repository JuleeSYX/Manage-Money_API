import mongoose from "mongoose";
 
const invoiceSchema = new mongoose.Schema(
    {
        type: {
            type: Number, 
            require: [true, 'Please enter a type name']
        },
        price:{
            type: Number
        },
        status:{
            type: Number
        },
        remark:{
            type: String
        },
        cate_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Categories',
            required: [true, 'Please Select a Category']
        },
        cancelBy:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
            required: false,
        },
        user_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
            required: [true, 'Please Select a Users']
        },
        store_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Stores',
            required: [true, 'Please Select a Stores']
        }
    },{
        timestamps: true
    }
);
const Invoices = mongoose.model('Invoices', invoiceSchema);

module.exports = Invoices;