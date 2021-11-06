const mongoose = require("mongoose");

const restaurantSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        building: String,
        coord: Array,
        street: String,
        zipcode: String
    },
    cuisine: {
        type: String,
        required: true
    },
    borough: {
        type: String,
        required: true
    },
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
module.exports = Restaurant;