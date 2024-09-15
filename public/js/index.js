
let facultyRegBtn = document.getElementById("facultyRegBtn");
try{
    facultyRegBtn.addEventListener("click", (event)=>{
        event.preventDefault();
        location.href = "/facultyReg";
    })
}catch(err){
    console.log(err);
}

// for home page sidebar
let menuBar = document.getElementById("menuBar");
let sideBar = document.getElementById("sideBar");
let crossBtn = document.getElementById("cross");
let hide_bg = document.getElementById("hide_bg");

try{
    menuBar.addEventListener("click", ()=>{
    sideBar.style.marginLeft = "0";
    hide_bg.style.display = "block";
});
} catch(err){
    console.log(err);
}
try{
    hide_bg.addEventListener("click", () => {
        sideBar.style.marginLeft = "-100%";
        hide_bg.style.display = "none";
    })
} catch(err){
    console.log(err);
}

try{
    crossBtn.addEventListener("click", ()=>{
        sideBar.style.marginLeft = "-100%";
        hide_bg.style.display = "none";
    })
} catch(err){
    console.log(err);
}

// for home page image slider

try{
    setInterval(()=>{
        setTimeout(() => {
            document.getElementById("homeImage").setAttribute("src", "https://kvalito.ch/wp-content/uploads/2020/08/Computer-Network-2048x1365.jpg");
        }, 1500);
        setTimeout(() => {
            document.getElementById("homeImage").setAttribute("src", "https://www.linbis.com/wp-content/uploads/2024/08/dalle-2024-08-28-12-15-10-create-a-detailed-and-realistic-cover-image-to-illustrate-an-article-about-computer-aided-dispatch-cad-software-for-emergency-services-the-image-sh.webp");
        }, 3000);
        setTimeout(() => {
            document.getElementById("homeImage").setAttribute("src", "https://www.sharda.ac.in/blog/attachments/blog_images/CSE_(1).jpg");
        }, 4500);
        setTimeout(() => {
            document.getElementById("homeImage").setAttribute("src", "https://www.pembrokeshire.ac.uk/wp-content/uploads/2018/07/Computer-Science.gif");
        }, 6000);
        setTimeout(() => {
            document.getElementById("homeImage").setAttribute("src", "https://www.wcitv.com/wp-content/uploads/2019/04/iStock-987365514.jpg");
        }, 7500);

    }, 9000);
} catch(err){
    console.log(err);
}