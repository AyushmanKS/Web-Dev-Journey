const express = require("express");
const app = express();

const port = 8080;

app.use(express.urlencoded({extended : true}));
app.use(express.json());

app.get("/register", (req, resp)=>{
    let {user, password} = req.query;
    resp.send(`Standard get response, welcome ${user}`);
});

app.post("/register", (req, resp)=>{
    console.log(req.body);
    resp.send("Standard post response");
});

app.listen(port, ()=> {
    console.log(`listening to port ${port}`);
});