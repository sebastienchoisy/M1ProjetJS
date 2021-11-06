const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    restaurants: {
        type: Array,
    }
});

// On génère un Token
userSchema.methods.generateAuthToken = async function() {
    const user = this;
    const token = jwt.sign({username: user.username},
        "bigmac",{expiresIn: '24h'});
    user.token = token;
    return token;
};

const User = mongoose.model("User", userSchema);
module.exports = User;