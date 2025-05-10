const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

main().then(()=>{
    console.log("Successfully connected to db");
    return initDB();
}).catch((err)=>{
    console.log(`Error connecting to db: ${err}`);
});

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

const initDB = async()=> {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=>({...obj, owner: "681c4b2ef0ade0ff9932b253"}));
    await Listing.insertMany(initData.data);
    console.log("Data is initialized");
};
