import mongoose from "mongoose";

const priceSchema = new mongoose.Schema(
    {
        amount: {
            type: String,
            required: true
        },
        index: {
            type: Number,
        },
    },{
        timestamps: true
    }
);
const Prices = mongoose.model('Prices', priceSchema);

module.exports = Prices;