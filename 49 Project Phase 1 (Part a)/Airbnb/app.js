const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("../Airbnb/models/listing.js");
const path = require("path"); 
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

app.set("view engine","ejs");
app.set("views",path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

main().then(()=> {
    console.log("Connected to DB");
}).catch((err)=>{
    console.log(`Connection failed: ${err}`);
});

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

// app.get("/testListing",async (req,res)=> {
//     let sampleListing = new listing({
//         title: "My new Villa!",
//         description: "By the beach~~",
//         image: "",
//         price: 90000,
//         location: "Kanpur Uttar Pradesh",
//         country: "India"
//     });

//     await sampleListing.save();
//     res.send(`Saved to DB: ${sampleListing}`);
// });

// Index route
app.get("/listings",async (req,res) => {
    let allListings = await Listing.find({});
    res.render("listings/index.ejs",{allListings});
});

// new route
app.get("/listings/new",(req,res)=>{    
    res.render("listings/new.ejs");
});

// Show route
app.get("/listings/:id",async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
});

// Create route
app.post("/listings",async (req,res,next)=>{
    try {
        const newListing = new Listing(req.body.listing);
        await newListing.save();
        res.redirect("/listings");
    } catch(err) {
        next(err);
    }    
});

// Edit route
app.get("/listings/:id/edit", async (req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
});

// Update route
app.put("/listings/:id",async (req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect("/listings");
});

// delete route
app.delete("/listings/:id",async (req, res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
})

app.get("/",(req, res)=>{
    res.send("Hi im root! ");
});

ap.use((err,req, res,next)=> {
    res.send("Something went wrong!");
});

app.listen(8080, ()=>{
    console.log("Server is listening to port 8080");
});