const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");

app.use("views",path.join(__dirname, "views"));
app.use("view engine","ejs");

main().then(()=> {
    console.log("connection successful")
})
.catch((err)=> {
    console.log(`Connection failed: ${err}`);
});

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

app.get("/",(req, res)=> {
    res.send("Root route is working!");
});

app.listen(8080, ()=> {
    console.log("Server is listening to port 8080");
});