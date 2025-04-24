const express = require("express");
const app = express();
const mongoose = require("mongoose");
const listing = require("../Airbnb/models/listing.js");

main().then(()=> {
    console.log("Connected to DB");
}).catch((err)=>{
    console.log(`Connection failed: ${err}`);
});

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

app.get("/testListing",async (req,res)=> {
    let sampleListing = new listing({
        title: "My new Villa!",
        description: "By the beach~~",
        image: "",
        price: 90000,
        location: "Kanpur Uttar Pradesh",
        country: "India"
    });

    await sampleListing.save();
    res.send(`Saved to DB: ${sampleListing}`);
});

app.get("/",(req, res)=>{
    res.send("Hi im root! ");
});

app.listen(8080, ()=>{
    console.log("Server is listening to port 8080");
});