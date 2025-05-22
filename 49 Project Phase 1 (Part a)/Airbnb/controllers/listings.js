const Listing = require('../models/listing');

module.exports.index = async (req,res) => {
    let allListings = await Listing.find({});
    res.render("listings/index.ejs",{allListings});
};

module.exports.renderNewForm = (req,res)=>{    
    res.render("listings/new.ejs");
};

module.exports.showListing = async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id).populate("reviews").populate("owner");
    res.render("listings/show.ejs",{listing});
};

module.exports.createListing = async (req,res,next) => {
    let url =  req.file.path;
    let filename = req.file.filename;

    const newListing = new Listing(req.body.listing);
    newListing.image = {url, filename};
    await newListing.image;
    await newListing.save();
    req.flash("success","New listing created");
    res.redirect("/listings");
};

module.exports.renderEditForm = async (req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
};

module.exports.updateListing = async (req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect("/listings");
};

module.exports.destroyListing = async (req, res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
};