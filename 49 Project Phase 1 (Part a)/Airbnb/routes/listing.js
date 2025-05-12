const express = require('express');
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {listingSchema, reviewSchema} = require("../schema.js");
const expressError = require("../utils/ExpressErrors.js");
const {isLoggedIn} = require('../middleware.js');
const listingController = require('../controllers/listings.js');
const multer = require('multer');
const upload = multer({dest: 'uploads/'});

const validateListing = (req, res, next) => {
    let {error} = listingSchema.validate(req.body);
    if(error) {
        throw new expressError(400, error);
    }
    else {
        next();
    }
}

router
    .route("/")
    // Index route
    .get(wrapAsync(listingController.index))
    // Create route
    // .post(isLoggedIn, validateListing, wrapAsync(listingController.createListing));
    .post(upload.single("listing[image]"), (req,res)=>{
        res.send(req.file);
    });

// new route
router.get("/new",isLoggedIn, listingController.renderNewForm);

router
    .route("/:id")
    // Show route
    .get(wrapAsync(listingController.showListing))
    // Update route
    .put(isLoggedIn, validateListing, wrapAsync(listingController.updateListing))
    // delete route
    .delete(wrapAsync(listingController.destroyListing));

// Edit route
router.get("/:id/edit",isLoggedIn, validateListing, wrapAsync(listingController.renderEditForm));

module.exports = router;