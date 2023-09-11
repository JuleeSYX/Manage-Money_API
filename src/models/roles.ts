import mongoose from "mongoose";

const roleSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
    },{
        timestamps: true
    }
);
const Roles = mongoose.model('Roles', roleSchema);

module.exports = Roles;