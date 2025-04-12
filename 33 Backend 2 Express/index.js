const express = require("express");
const app = express();

console.dir(app);

let port = 3000;

app.listen(port, ()=> {
    console.log(`app is listening on port ${port}`);
});

// app.use((req, res)=> {
//     console.log("request received");
//     res.send("this is a basic response");
// });

app.get('/',(req, res)=> {
    res.send("you contacted root path");
});

app.get('/apple',(req, res)=> {
    res.send("you contacted apple path");
});

app.get('*',(req, res)=> {
    res.send("this path does not exist");
});