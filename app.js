const express = require("express");
const app = express();
const mongoose = require("mongoose");
const {Schema} = mongoose;
const {env} = require("process");
const PORT = process.env.PORT || 8080;
const ejsMate = require("ejs-mate");
const path = require("path");
const Faculty = require("./models/faculty");


const main = async() => {
    await mongoose.connect("mongodb://127.0.0.1:27017/sams");
}
main().then(() => {
    console.log("connection successful!");
}).catch((err) =>{
    console.log(err);
})


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "/public")));
// app.engine("ejs", ejsMate);
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
    res.render("checkOnlyAttendance");
})

app.get("/addsomeData", async(req, res) => {

})


app.listen(PORT, () => {
    console.log(`application is listening to the port : ${PORT}`);
})