const express = require("express");
const app = express();
const path = require("path");
const {v4: uuidv4} = require("uuid");
const methodOverride = require("method-override");

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));

const port = 8080;

let posts = [
    {
        id: uuidv4(),
        username: "AyushmanKS",
        content: "I love coding!", 
    },
    {
        id: uuidv4(),
        username: "Aman",
        content: "I love playing soccer!", 
    },
    {
        id: uuidv4(),
        username: "Abhilasha",
        content: "I love doing UI/UX!", 
    }
];

app.get("/posts/new",(req,resp)=>{
    resp.render("new.ejs");
});

app.post("/posts",(req,resp)=>{
    let {username, content} = req.body;
    let id = uuidv4(); 
    posts.push({id, username, content});
    resp.redirect("/posts");
});

app.get("/posts/:id",(req,resp)=>{
    let {id} = req.params;
    let post = posts.find((p)=> id === p.id);
    resp.render("show.ejs",{post});
});

app.get("/posts",(req, resp)=>{
    resp.render("index.ejs", {posts});
});

app.patch("/posts/:id",(req,resp)=>{
    let {id} = req.params;
    let post = posts.find((p)=> id === p.id);
    let newContent = req.body.content;

    post.content = newContent; 
    resp.redirect("/posts");
});

app.get("/posts/:id/edit",(req,resp)=>{
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    resp.render("edit.ejs",{post});
});

app.listen(port, ()=>{
    console.log(`Listening to port: ${port}`);
}); 