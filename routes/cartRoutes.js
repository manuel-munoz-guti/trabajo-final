const express = require('express');
const cartRoute = express.Router();
const cartController = require('../controllers/cartController');
const authController = require('../controllers/authController');


cartRoute
    .route('/product')
    .all(authController.protect)
    .post(cartController.addProductToShoppingCart);

cartRoute
    .route('/product/:id')
    .all(authController.protect)
    .delete(cartController.deleteProductsFromShoppingCart);

cartRoute
    .route('/pay')
    .all(authController.protect)
    .post(cartController.payShoppingCartPending);

module.exports = cartRoute;