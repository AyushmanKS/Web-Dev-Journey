const mongoose = require("mongoose");
const {Schema} = mongoose;

main()
    .then(() => console.log("Connection successful"))
    .catch((err) => console.log(err));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/relationDemo");
}

const orderSchema = new Schema({
    item: String,
    price: Number,
});

const customerSchema = new Schema({
    name: String,
    orders: [
        {
            type: Schema.Types.ObjectId,
            ref: "Order"
        }
    ]
});

const Order = mongoose.model("Order", orderSchema);
const Customer = mongoose.model("Customer", customerSchema);

const addCustomes = async() => {
    let cust1 = new Customer({
        name: "Ayushman KS",
    });
    let order1 = await Order.findOne({item: "Chole Bhature"});
    let order2 = await Order.findOne({item: "Noodles"});

    cust1.orders.push(order1);
    cust1.orders.push(order2);

    let result = await cust1.save();
    console.log(result);
};

addCustomes();

// const addOrders = async() => {
//     let res = await Order.insertMany([
//         {
//             item: "Chole Bhature",
//             price: 180,
//         },
//         {
//             item: "Noodles",
//             price: 165,
//         },
//     ]);
//     console.log(res);
// }

// addOrders();