const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js")

const listSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        url: String,
        filename: String, 
    },
    price: Number,
    location: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "review",
        },
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});

listSchema.post("findOneAndDelete", async(listing)=> {
    if(listing) {
        await Review.deleteMany({reviews: {_id : listing.reviews}});
    }
});

const Listing = mongoose.model("Listing", listSchema);
module.exports = Listing;