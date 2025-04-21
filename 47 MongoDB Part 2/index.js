const mongoose = require('mongoose');

main().then(() => {
    console.log("Connection successful!");
}).catch(err => {
    console.log("Error establishing connection:", err);
});

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/test");
}

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
});

const User = mongoose.model("User", userSchema);
const Employee = mongoose.model("Employee", userSchema);

const user1 = new User({name: "Ayushman", email: "ayushmanks1845@gmail.com", age: 21});
user1.save().then((res)=>{
    console.log(`user successfully saved: ${res}`)
}).catch((err)=>{
    console.log(`Error saving user: ${err}`);
});