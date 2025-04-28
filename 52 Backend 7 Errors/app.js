const express = require("express");
const app = express();
const ExpressError = require("./ExpressError");

const checkToken = (req,res,next)=> {
    let {token} = req.query;
    if(token === "giveaccess") {
        next();
    }
    throw new ExpressError(401, "ACCESS DENIED");
};

app.get('/admin',(req,res)=>{
    throw new ExpressError(403, "Access to admin is forbidden");
});

app.get("/api",checkToken,(req,res)=>{
    res.send("data");
});

app.get('/random',(req,res)=>{
    res.send("This is a random page");
});

app.get('/',(req,res)=>{
    res.send("Hi i am root!");
})

app.listen(8080, ()=>{
    console.log("Listening to port");
});
