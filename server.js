const express = require("express");
const bodyparser = require ("body-parser");
const mongoose = require ("mongoose");
const { text } = require("express");
const app = express();
app.use(express.static("public"));
app.set("view engine","ejs");
app.use(bodyparser.urlencoded({extended: true}));
const url = 'mongodb://localhost:27017/test1';
mongoose.connect(
    url, 
    { 
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }
)

const messageSchema = new mongoose.Schema({
    name: String,
    password: String,
    email: String,
    address: String,
    school: String,
});

const messageModel = mongoose.model("inbox",messageSchema);

app.post("/submit",(req,res) => {
    var message = new messageModel();
    message.name = req.body.name;
    message.password = req.body.password;
    message.email = req.body.email;
    message.address = req.body.address;
    message.school = req.body.school;

    message.save(function(err,doc){
        if(!err){
            console.log("data saved into database")
            res.redirect("/");
        } else {
            console.log(err)
        }
    })
})

app.get("/",(req,res) =>{
    res.render("index");
});

app.get("/contact",(req,res) =>{
    res.render("contact");
});

app.get("/form",(req,res) =>{
    res.render("form");
});

app.get("/register",(req,res) =>{
    res.render("register");
});

app.listen(3000, () => {
    console.log("server listening on 3000")
})

