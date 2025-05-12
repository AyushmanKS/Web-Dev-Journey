const express = require('express');
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {listingSchema, reviewSchema} = require("../schema.js");
const expressError = require("../utils/ExpressErrors.js");
const {isLoggedIn} = require('../middleware.js');
const listingController = require('../controllers/listings.js');

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
router.get("/",wrapAsync(listingController.index));

// new route
router.get("/new",isLoggedIn, listingController.renderNewForm);

// Show route
router.get("/:id",wrapAsync(listingController.showListing));

// Create route
router.post("/",isLoggedIn, validateListing, wrapAsync(listingController.createListing));

// Edit route
router.get("/:id/edit",isLoggedIn, validateListing, wrapAsync(listingController.renderEditForm));

// Update route
router.put("/:id",isLoggedIn, validateListing, wrapAsync(listingController.updateListing));

// delete route
router.delete("/:id",wrapAsync(listingController.destroyListing));

module.exports = router;