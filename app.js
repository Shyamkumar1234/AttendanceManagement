const express = require("express");
const app = express();
const mongoose = require("mongoose");
const {Schema} = mongoose;
const PORT = process.env.PORT || 8080;
const methodOverride = require("method-override");
const path = require("path");
const Faculty = require("./models/faculty");
const Admin = require("./models/admin");
const Student = require("./models/student");
const Attendance = require("./models/attendance");
const ExpressError = require("./ExpressError");
// const dbUrl = 'mongodb+srv://sharmaji:2hMJb8vkjyrltAND@cluster0.viyiq.mongodb.net/AttendanceManagemant?retryWrites=true&w=majority&appName=Cluster0';

main().then(() => {
    console.log("connection successful!");
}).catch((err) =>{
    console.log(err);
})
async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/satms");
}

function asyncWrap(fn){
    return function(err, req, res){
        fn(err, req, res).catch((err) => {
            next(err);
        })
    }
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(methodOverride("_method"));
app.use(express.urlencoded({extended: true}));



// Creating Routes
app.get("/", (req, res) => {
    res.render("LoginLevel.ejs");
})
app.get("/facultyLogin", (req, res) => {
    res.render("facultyLoginForm.ejs");
})
app.get("/facultyReg", (req, res) => {
    res.render("facultyRegForm.ejs");
})
app.get("/AdminLogin", (req, res) => {
    res.render("adminLoginForm.ejs");
})

app.get("/getAttendance", (req, res) => {
    res.render("checkOnlyAttendance.ejs");
})
app.get("/alert", (req, res) => {
    res.render("successfulAlert.ejs");
})

// Database Handling

//Add New faculty details -> facultyRegForm.ejs
app.post("/addNewFaculty", asyncWrap(async(req, res) => {
    const data = req.body;
    let insertedData = await Faculty.insertMany({name: data.facultyname, email: data.facultyemail, mobile_no: data.facultymobile, department: data.facultyDepartment, password: data.facultypassword});
    insertedData.save;
    res.redirect("/alert");
}));
// Login faculty into his account -> adminLoginForm.ejs
app.post("/facultyLogin", asyncWrap(async(req, res) => {
    let dbData = await Faculty.find({$and: [{email: req.body.formEmail}, {password: req.body.formPassword}]});
    if(dbData == ""){
        console.log("some error occured");
    }else{
        res.redirect(`/facultyHome/${dbData[0]._id}`);
    }
}));

// Login Admin into his account -> adminLoginForm.ejs
app.post("/AdminLogin", asyncWrap(async(req, res) => {
    const dbData = await Admin.find({$and: [{email: req.body.formEmail}, {mobile_no: req.body.formMobile}]})
    if(dbData == ""){
        throw new ExpressError(401, "UnAuthorized Access");
    }else{
        res.redirect(`/facultyHome/${dbData[0]._id}`);
    }
}))

// Handling home page
// faculty Home page
app.get("/facultyHome/:id", asyncWrap(async(req, res) => {
    let {id} = req.params;
    const facultyData = await Faculty.findById(id);
    res.render("facultyHomePage.ejs", {facultyData});
}));
app.get("/showAdmins/:id", asyncWrap(async(req, res) => {
    let {id} = req.params;
    const facultyData = await Faculty.findById(id);
    const allAdmins = await Admin.find({});
    const allFaculties = await Faculty.find({});
    res.render("showAdmin.ejs", {facultyData, allAdmins, allFaculties});
}));
app.delete("/admins/:sender/:id", asyncWrap(async(req, res) => {
    let {id, sender} = req.params;
    const deletedData = await Admin.findByIdAndDelete(id);
    res.redirect(`/showAdmins/${sender}`);
}))
app.get("/AdminReg/:id", asyncWrap(async(req, res) => {
    let {id} = req.params;
    const facultyData = await Faculty.findById(id);
    res.render("adminRegForm.ejs", {facultyData});
}))
// Add New admin details -> adminRegForm.ejs
app.post("/addNewAdmin/:id", asyncWrap(async(req, res) => {
    let {id} = req.params;
    const data = req.body;
    const insertedData = await Admin.insertMany({name: data.adminname, email: data.adminemail, mobile_no: data.adminmobile, department: data.adminDepartment, password: data.adminpassword});
    insertedData.save;
    res.render("adminRegAlert.ejs", {id});
}))
app.get("/NewReg/:id", asyncWrap(async(req, res, next) => {
    let {id} = req.params;
    const checkAccess = await Faculty.findById(id) || Admin.findById(id);
    if(checkAccess == ""){
        throw new ExpressError(401, "UnAuthorized Access !");
    }else{
        const facultyData = await Faculty.findById(id);
        res.render("NewReg.ejs", {facultyData});
    }
}))
app.post("/NewReg/:id", asyncWrap(async(req, res, next) => {
    let {id} = req.params;
    const checkAccess = await Faculty.findById(id) || Admin.findById(id);
    if(checkAccess == ""){
    throw new ExpressError(401, "UnAuthorized Access !");
    }else{
        const data = req.body;
        const insertedData = await Student.insertMany({name: data.studentName, email: data.studentEmail, mobile_no: data.studentMobile, department: data.studentDepartment, regNumber: data.studentReg});
        const insertInAttendance = await Attendance.insertMany({Developertoken: 'NGP@Admin', regNumber: data.studentReg, studentPresent: 0, workingDays: 0});
        insertInAttendance.save;
        insertedData.save;
        res.render("adminRegAlert.ejs", {id});
    }
}))
app.get("/makeAttendance/:id", asyncWrap(async(req, res) => {
    let {id} = req.params;
    const facultyData = await Faculty.findById(id) || Admin.findById(id);
    res.render("makeAttendance.ejs", {facultyData});
}));
app.get("/tickoutAttendance/:id/", asyncWrap(async(req, res) => {
    let {id} = req.params;
    try{
        const facultyData = await Faculty.findById(id) || Admin.findById(id);
        const studentData = await Student.find({}).sort({regNumber: 1});
        const prevWorkingDays = await Attendance.findOne({Developertoken: "NGP@Admin"});
        const updatedData = await Attendance.updateMany({Developertoken: "NGP@Admin"}, {workingDays: prevWorkingDays.workingDays + 1});
        updatedData.save;
        res.render("tickOut.ejs", {facultyData, studentData});
    }catch(err){
        res.status(400).send("No Students are registered !")
    }
}));
app.post("/submitAttendance/:id", asyncWrap(async(req, res) => {
    let {id} = req.params;
    const Students = await Attendance.find({});
    for(let student of Students){
        let attendi = req.body[`name${student.regNumber}`];
        if(attendi){
            const prevStudentPresent = await Attendance.findOne({regNumber: student.regNumber});
            const updatedData = await Attendance.findOneAndUpdate({regNumber: student.regNumber}, {studentPresent : prevStudentPresent.studentPresent + 1});
            updatedData.save;
        }
    }
    res.redirect(`/facultyHome/${id}`);
}));







// Error Handling starts from here
app.all("*", asyncWrap((req, res, next) => {
    throw new ExpressError(404, "Page Not Found !");
}))

app.use((err, req, res, next) => {
    let {status = 500, message = "Something went wrong"} = err;
    res.status(status).render("error.ejs", {status, message});
})


app.listen(PORT, () => {
    console.log(`application is listening to the port : ${PORT}`);
})