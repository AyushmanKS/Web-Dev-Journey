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