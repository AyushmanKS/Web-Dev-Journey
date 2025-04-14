const express = require("express");
const app = express();
const path = require("path");

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));

const port = 8080;

let posts = [
    {
        username: "AyushmanKS",
        content: "I love coding!", 
    },
    {
        username: "Aman",
        content: "I love playing soccer!", 
    },
    {
        username: "Abhilasha",
        content: "I love doing UI/UX!", 
    }
];

app.get("/posts/new",(req,resp)=>{
    resp.render("new.ejs");
});

app.post("/posts",(req,resp)=>{
    let {username, content} = req.body;
    posts.push({username, content});
    resp.send("post request working");
});

app.get("/posts",(req, resp)=>{
    resp.render("index.ejs", {posts});
});

app.listen(port, ()=>{
    console.log(`Listening to port: ${port}`);
}); 