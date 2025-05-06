const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path"); 
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const expressError = require("../Airbnb/utils/ExpressErrors.js");

app.set("view engine","ejs");
app.set("views",path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");

main().then(()=> {
    console.log("Connected to DB");
}).catch((err)=>{
    console.log(`Connection failed: ${err}`);
});

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

// navigating through routes
app.use("/listings",listings);
// navigating through review routes
app.use('/listings/:id/reviews',reviews);

app.get("/",(req, res)=>{
    res.send("Hi im root! ");
});

// Page not found error
app.all(/.*/, (req, res, next) => {
    next(new expressError(404, "Page Not Found!"));
});


// throw custom errors
app.use((err, req, res, next) => {
    const { statusCode = 500, message = "Something went wrong!" } = err;
    // Ensure statusCode is an integer
    if (!Number.isInteger(statusCode)) {
        statusCode = 500;
    }
    res.render("error.ejs", {message});
    // res.status(statusCode).send(message);
});

app.listen(8080, ()=>{
    console.log("Server is listening to port 8080");
});