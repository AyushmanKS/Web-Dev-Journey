const express = require('express');
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require('../utils/wrapAsync');
const passport = require('passport');
const { saveRedirectUrl } = require('../middleware.js');

router.get("/signup",(req,res) => {
    res.render("users/signup.ejs");
});

router.post("/signup",wrapAsync( async (req,res)=>{
    try {
        let {username, email, password} = req.body;
        const newUser =  new User({email, username});
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser, (err) => {
            if(err) {
                return next(err);
            }
            console.log(registeredUser);
            req.flash("success","Welcome to wanderlust!");
            res.redirect("/listings");
        })
    }
    catch(err) {
        req.flash("error",err.message);
        res.redirect("/login");
    }
}));

// login routes
router.get("/login",(req,res)=>{
    res.render("users/login.ejs");
});

router.post("/login",saveRedirectUrl, passport.authenticate("local",{failureRedirect: '/login', failureFlash: true,}), async(req,res)=> {
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
});

// logout route
router.get("/logout",(req,res,next)=>{
    req.logout((err)=> {
        if(err) {
            next(err);
        } 
        res.redirect("/listings");
    });
});

module.exports = router;