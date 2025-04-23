const express = require("express");
const app = express();
const mongoose = require("mongoose");

main().then(()=> {
    console.log("Connected to DB");
}).catch((err)=>{
    console.log(`Connection failed: ${err}`);
});

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

app.get("/",(req, res)=>{
    res.send("Hi im root! ");
});

app.listen(8080, ()=>{
    console.log("Server is listening to port 8080");
});