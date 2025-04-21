const mongoose = require('mongoose');

main().then((res)=>{
        console.log(res);
    })
    .catch(err => console.log("Connection successful!"));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:2717/test");
}

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
});