const express = require('express');
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {listingSchema, reviewSchema} = require("../schema.js");
const expressError = require("../utils/ExpressErrors.js");
const Listing = require("../models/listing.js");
const {isLoggedIn} = require('../middleware.js');

const validateListing = (req, res, next) => {
    let {error} = listingSchema.validate(req.body);
    if(error) {
        throw new expressError(400, error);
    }
    else {
        next();
    }
}

// Index route
router.get("/",wrapAsync(async (req,res) => {
    let allListings = await Listing.find({});
    res.render("listings/index.ejs",{allListings});
  })
);

// new route
router.get("/new",isLoggedIn, (req,res)=>{    
    res.render("listings/new.ejs");
});

// Show route
router.get("/:id",wrapAsync(async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    res.render("listings/show.ejs",{listing});
  })
);

// Create route
router.post("/",isLoggedIn, validateListing, wrapAsync(async (req,res,next) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    req.flash("success","New listing created");
    res.redirect("/listings");
  })
);

// Edit route
router.get("/:id/edit",isLoggedIn, validateListing, wrapAsync(async (req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
  })
);

// Update route
router.put("/:id",isLoggedIn, validateListing, wrapAsync(async (req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect("/listings");
  })
);

// delete route
router.delete("/:id",wrapAsync(async (req, res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
  })
);

module.exports = router;