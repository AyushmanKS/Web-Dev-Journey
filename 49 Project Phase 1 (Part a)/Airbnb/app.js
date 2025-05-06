const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("../Airbnb/models/listing.js");
const review = require("../Airbnb/models/review.js");
const path = require("path"); 
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const expressError = require("../Airbnb/utils/ExpressErrors.js");
const {listingSchema, reviewSchema} = require("./schema.js");

app.set("view engine","ejs");
app.set("views",path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

const listings = require("./routes/listing.js");

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

const validateReview = (req, res, next) => {
    let {error} = reviewSchema.validate(req.body);
    if(error) {
        throw new expressError(400, error);
    }
    else {
        next();
    }
}

// navigating through routes
app.use("/listings",listings);

// reviews - post route
app.post('/listings/:id/reviews',validateReview,wrapAsync(async (req, res)=> {
    let listing = await Listing.findById(req.params.id);
    let newReview = new review(req.body.review);

    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    res.redirect(`/listings/${listing._id}`);
}));

// reviews - delete
app.delete('/listings/:id/reviews/:reviewId',wrapAsync (async(req,res)=> {
    let {id,reviewId} = req.params;
    await Listing.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await review.findByIdAndDelete(reviewId);
    res.redirect(`/listings/${id}`);
}));

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