const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

// DYNAMIC KEY VALUE PAIR RULED BY HEROKU TO ESTABLISH PORT
const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");


app.use((req, res, next) => {
    var log = ` ${Date()} : ${req.method} : ${req.url}`;
    console.log(log);   
    
    fs.appendFile("server.log", log + "\n", (err)=>{
        if(err){
            console.log("Logging went wrong");
        }
    });

    next();
});

// app.use((req, res, next)=>{
//         res.render("work.hbs");
        
//     }
// });


app.use(express.static(__dirname + "/public"));

hbs.registerHelper("getCurrentYear", () => {
    return new Date().getFullYear();
});

hbs.registerHelper("screamIt", (text) => {
    return text.toUpperCase();
});

app.get("/", (req, res)=>{
    
    res.render("home.hbs", {
        name: "Andrew",
        surname: "Melnikoff",
        likes: ["Living", " University", " Programming"],
        pageTitle: `About Andrew`,
        welcomeMsg: "Hello, buddy"
    })

});

app.get("/about", (req, res)=>{
    res.render("about.hbs", {
        pageTitle: "About us"
    });
});

app.get("/bad", (req, res)=>{
    res.send({
        result: "Not able to configure this request"
    });
});

app.get("/projects", (req, res) => {
    res.render("work.hbs",{
        projects: ["1. Good project", " 2. A very good project", " 3. The best project on the Internet"],
        pageTitle: "PORTFOLIO SITE"
    });
});

app.listen(port, () => {
    console.log(`server is up and running on port ${port}`);
});