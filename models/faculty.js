const mongoose = require("mongoose");
const {Schema} = mongoose;

const facultySchema = new Schema({
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
        required: true,
    }
})
const Faculty = mongoose.model("Faculty", facultySchema);
module.exports = Faculty;