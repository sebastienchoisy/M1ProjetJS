const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    status: {
        type: String,
        required: true
    },
    restaurantName: {
        type: String,
        required: true
    },
    customerName: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    items: {
        type: Array,
        required: true
    },
    totalCost: {
        type: String,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true
    }
});

const Order = mongoose.model("Order", userSchema);
module.exports = Order;