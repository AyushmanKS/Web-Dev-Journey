const {faker} = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require("express");
const app = express();

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

//   try {
//     connection.query(q,[data], (err, result)=>{
//     if(err) throw err;
//     console.log(result);
//     });
//   } catch(err) {
//     console.log(err);
//   }

// connection.end();

// console.log(getRandomUser());

app.get('/',(req,res)=>{
  let q = `select count(*) from user`;
    try {
    connection.query(q, (err, result)=>{
    if(err) throw err;
    console.log(result);
    res.send(result);
      });
    } catch(err) {
      console.log(err);
      res.send("Some error in fetching data!");
    }
});

app.listen("8080", ()=>{
  console.log("Server is listening to port 8080");
});