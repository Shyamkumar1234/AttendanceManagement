const mongoose = require("mongoose");
const {Schema} = mongoose;

const adminSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    mobile_no: {
        type: Number,
        minLength: 10,
        maxLength: 10,
    },
    department: {
        type: String,
    }
})
const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;