const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");

app.set("views",path.join(__dirname, "views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));

main().then(()=> {
    console.log("connection successful")
})
.catch((err)=> {
    console.log(`Connection failed: ${err}`);
});

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

// let chat1 = new Chat({
//     from: "ayushman",
//     to: "pranjali",
//     msg: "pick up the call",
//     created_at: new Date(),
// });

// chat1.save().then((res)=>{
//     console.log(`Message successfully sent: ${res}`);
// });

// Index Route
app.get("/chats",async (req, res)=> {
    let chats = await Chat.find();
    res.render("index.ejs",{chats});
});

// New route
app.get("/chats/new", (req, res)=>{
   res.render("new.ejs"); 
});

//create route
app.post("/chats", (req, res) => {
    let {from, to, msg} = req.body;
    let newChat = new Chat({
        from: from,
        msg: msg,
        to: to,
        created_at: new Date()
    });
    newChat.save().then((savedChat) => {
        console.log(`Chat sent successfully: ${savedChat}`);
        res.redirect("/chats");
    }).catch((err) => {
        console.log(`Error occurred while sending chat: ${err}`);
        res.status(500).send("Something went wrong while saving the chat.");
    });
});

// Edit route
app.get("/chats/:id/edit",async (req,res)=>{
    let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs",{chat});
});

// update/put edittedmessage in db route
app.put("/chats/:id",async (req,res)=>{
    let {id} = req.params;
    let {msg: newMsg} = req.body;
    let updatedChat = await Chat.findByIdAndUpdate(id,{msg: newMsg}, {runValidators: true, new: true});
    console.log(updatedChat);
    res.redirect("/chats");
});

// delete route
app.delete("/chats/:id",async (req,res)=>{
    let {id} = req.params;
    let deletedChat = await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chats");
});

app.get("/",(req, res)=> {
    res.send("Root route is working!");
});

app.listen(8080, ()=> {
    console.log("Server is listening to port 8080");
});