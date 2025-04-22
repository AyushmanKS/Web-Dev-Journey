const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");

app.set("views",path.join(__dirname, "views"));
app.set("view engine","ejs");

main().then(()=> {
    console.log("connection successful")
})
.catch((err)=> {
    console.log(`Connection failed: ${err}`);
});

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let chat1 = new Chat({
    from: "ayushman",
    to: "pranjali",
    msg: "pick up the call",
    created_at: new Date(),
});

chat1.save().then((res)=>{
    console.log(`Message successfully sent: ${res}`);
});

app.get("/",(req, res)=> {
    res.send("Root route is working!");
});

app.listen(8080, ()=> {
    console.log("Server is listening to port 8080");
});