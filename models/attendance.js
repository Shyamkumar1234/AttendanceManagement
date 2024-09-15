const mongoose = require("mongoose");
const {Schema} = mongoose;

const attendanceSchema = new Schema({
    Developertoken: {
        type: String,
        default: "NGP@Admin",
    },
    regNumber: {
        type: String,
        required: true,
        
    },
    studentPresent: {
        type: Number,
        default: 0,
    },
    workingDays: {
        type: Number,
        default: 0,
    }
})
const Attendance = mongoose.model("Attendance", attendanceSchema);
module.exports = Attendance;