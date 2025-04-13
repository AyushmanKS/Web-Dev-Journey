const express = require("express");
const app = express();

const port = 8080;

app.get("/register", (req, resp)=>{
    let {user, password} = req.query;
    resp.send(`Standard get response, welcome ${user}`);
});

app.post("/register", (req, resp)=>{
    resp.send("Standard post response");
});

app.listen(port, ()=> {
    console.log(`listening to port ${port}`);
});