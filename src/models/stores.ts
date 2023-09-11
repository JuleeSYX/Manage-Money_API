import mongoose from "mongoose";

const storeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
    },{
        timestamps: true
    }
);
const Stores = mongoose.model('Stores', storeSchema);

module.exports = Stores;