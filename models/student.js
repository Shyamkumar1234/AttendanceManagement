const mongoose = require("mongoose");
const {Schema} = mongoose;

const studentSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    mobile_no: {
        type: Number,
        minLength: 10,
        maxLength: 10,
    },
    department: {
        type: String,
        required: true,
    },
    regNumber: {
        type: Number,
        required: true,
    }
})
const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
