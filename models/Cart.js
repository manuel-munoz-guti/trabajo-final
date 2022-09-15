const mongoose = require('mongoose');
const User = require('./User');

// Shopping Cart Schema
const cartSchema =  new mongoose.Schema({
    user: {
        type: {
            userName: String,
            email: String
        },
        required: true
    },
    status: {
        type: String,
        required: true,
    },
    products: {
        type : [{
            productId: String,
            price: Number,
            quanty: Number
        }] ,
        "default" : [],
        required: true
    }
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;