const mongoose = require('mongoose');

main().then(() => {
    console.log("Connection successful!");
}).catch(err => {
    console.log("Error establishing connection:", err);
});

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/amazon");
}

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    price: Number,
    discount: {
        type: Number,
        default: 0,
    },
    category: {
        type: String,
        enum: ["fiction","non-fiction"],
    },
});

const Book = mongoose.model("Book", bookSchema);

let book1 = new Book({
    title: "Harry Potter",
    author: "JK Rowling",
    price: 1200,
    category: "fiction",
});
book1.save().then((res)=>{
    console.log(res);
}).catch((err)=>{
    console.log(err);
});