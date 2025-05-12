const express = require('express');
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const {reviewSchema} = require("../schema.js");
const reviewController = require("../controllers/reviews.js");

const validateReview = (req, res, next) => {
    let {error} = reviewSchema.validate(req.body);
    if(error) {
        throw new expressError(400, error);
    }
    else {
        next();
    }
}

// reviews - post route
router.post('/',validateReview,wrapAsync(reviewController.createReview));

// reviews - delete
router.delete('/:reviewId',wrapAsync (reviewController.destroyReview));

module.exports = router;