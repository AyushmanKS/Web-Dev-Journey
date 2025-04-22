const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

main()
  .then(() => {
    console.log("connection successful!");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

let allChats = [
  {
    from: "ayushman",
    to: "pranjali",
    msg: "pick up the call",
    created_at: new Date(),
  },
  {
    from: "pranjali",
    to: "ayushman",
    msg: "i didn't receive any call",
    created_at: new Date(),
  },
  {
    from: "ayushman",
    to: "pranjali",
    msg: "check once again",
    created_at: new Date(),
  },
  {
    from: "pranjali",
    to: "ayushman",
    msg: "Oh yes, now received",
    created_at: new Date(),
  },
  {
    from: "ayushman",
    to: "pranjali",
    msg: "Hmm, must be network issue!",
    created_at: new Date(),
  },
];

Chat.insertMany(allChats).then((res)=> {
    console.log(`Chats successfully saved: ${res}`);
});
