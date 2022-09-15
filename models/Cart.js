const mongoose = require('mongoose');
const User = require('./User');

// Shopping Cart Schema
const cartSchema =  new mongoose.Schema({
    user: {
        type: {
            _id: mongoose.Schema.Types.ObjectId,
            userName: String,
            email: String
        },
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        required: true,
    },
    products: [{
        type: {
            _id: mongoose.Schema.Types.ObjectId,
            price: Number,
            quanty: Number
        },
        ref: 'Product',
        "default" : [],
        required: true
    }]
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;