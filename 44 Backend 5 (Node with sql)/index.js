const {faker} = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");

app.use(methodOverride("_method"));
app.use(express.urlencoded({extended: true}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'delta_app',
  password: 'prestigecr7'
});

let getRandomUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.username(),
    faker.internet.email(),
    faker.internet.password(),
  ];
}

// let q = "insert into user (id, username, email, password) values ?";
// let users  = [
//   ["123b","123_newuserb","abs@gmail.comb","abcb"],
//   ["123c","123_newuserc","abs@gmail.comc","abcc"],
// ];
// let data = [];
// for(let i=0; i<100; i++) {
//   data.push(getRandomUser());
// }

// home page
app.get('/',(req,res)=>{
  let q = `select count(*) from user`;
    try {
    connection.query(q, (err, result)=>{
    if(err) throw err;
    let total = result[0]["count(*)"];
    res.render("home.ejs",{total});
      });
    } catch(err) {
      console.log(err);
      res.send("Some error in fetching data!");
    }
});

// show users
app.get('/user',(req,res)=>{
  let q = "select * from user";
  try {
    connection.query(q, (err, result)=>{
    if(err) throw err;
    res.render("showusers.ejs",{result});
      });
    } catch(err) {
      console.log(err);
      res.send("Some error in fetching data!");
    }
});

// Edit route
app.get('/user/:id/edit',(req,res)=>{
  let {id} = req.params;
  let q = `select * from user where id='${id}'`;
  try {
    connection.query(q, (err, result)=>{
      if(err) throw err;
      let user = result[0];
      res.render("edit.ejs",{user});
      });
    } catch(err) {
      console.log(err);
      res.send("Some error in editing data!");
    }
});

// update db route
app.patch('/user/:id',(req,res)=>{
  let {id} = req.params;
  let {password: formPass,username: newUsername} = req.body; 
  let q = `select * from user where id='${id}'`;
  try {
    connection.query(q, (err,result)=>{
      if(err) throw err;
      let user = result[0];
      if(formPass != user.password) {
        res.send("Wrong assword");
      }
      else {
        let q2 = `update user set username='${newUsername}' where id='${id}'`;
        connection.query(q2, (err, result)=>{
            if(err) throw err;
            res.redirect("/user");
        });
      }
    });    
  }
  catch(err) {
    console.log(err);
    res.send("some error in updating db");
  }
});

app.listen("8080", ()=>{
  console.log("Server is listening to port 8080");
});