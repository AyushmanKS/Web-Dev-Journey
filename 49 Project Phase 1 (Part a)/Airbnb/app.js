if(process.env.NODE_ENV != "production") {
    require('dotenv').config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path"); 
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const expressError = require("../Airbnb/utils/ExpressErrors.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js"); 

app.set("view engine","ejs");
app.set("views",path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

const listingsRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

main().then(()=> {
    console.log("Connected to DB");
}).catch((err)=>{
    console.log(`Connection failed: ${err}`);
});

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

const sessionOptions = {
    secret : "mysupersecretcode",
    resave: false,
    saveUninitialized: true,
    cookie : {
        expires: Date.now() + 7 * 24  * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true
    }
};

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=> {
    res.locals.success = req.flash("success");
    res.locals.currUser = req.user;
    next();
});

// navigating through routes
app.use("/listings",listingsRouter);
// navigating through review routes
app.use('/listings/:id/reviews',reviewsRouter);
// user router
app.use("/",userRouter);

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