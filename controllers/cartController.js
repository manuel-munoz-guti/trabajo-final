const Cart = require("../models/Cart");
const catchAsync = require("../utils/catchAsync");

exports.addProductToShoppingCart = catchAsync( async (req, res, nex) => {
    const { products } = req.body;
    const user = req.user;
    const status = 'PENDING';

    // Validate if we have a shopping cart in PENDING state take one
    const shoppingCartPending = await Cart.findOne({ status: 'PENDING' });
  
    if (shoppingCartPending) {
        const newProducts = [ ...shoppingCartPending.products, ...products ];
    
        // Update the shopping cart adding more products
        const shoppingCartUpdated =  await Cart.findByIdAndUpdate({ _id: shoppingCartPending._id }, { $set: {products: newProducts}}, { new: true });

        if(!shoppingCartUpdated){
            return res.status(404).json({
                status: "SHOPING CART NOT FOUND",
              });
        }

        return res.status(200).json({
            status: "ADD PRODUCT SUCESS",
            data: {
              cart: shoppingCartUpdated,
            },
        });
    } else {
        // In the case if we don't have a shopping cart we create a new one
        const newShoppingCart = {
            user: {
                userName: user.userName,
                email: user.email
            },
            status,
            products: [ ...products ]
        };
        const shoppingCartCreated = await Cart.create(newShoppingCart);
    
        return res.status(200).json({
            status: "CREATE CART SUCESS",
            data: {
              cart: shoppingCartCreated,
            },
        });
    }
});

exports.payShoppingCartPending = catchAsync( async (req, res, nex) => {

    // Validate if we have a shopping cart in PENDING state
    const shoppingCartPending = await Cart.findOne({ status: 'PENDING' });
  
    if (shoppingCartPending && shoppingCartPending.products.length ) {
        const newStatus = 'PAID';
    
        // Update the shopping cart updating the status with PAID
        const shoppingCartUpdated =  await Cart.findByIdAndUpdate({ _id: shoppingCartPending._id }, { $set: {status: newStatus}}, { new: true });

        return res.status(200).json({
            status: "PAID SUCESS",
            data: {
              cart: shoppingCartUpdated,
            },
        });
    } 
    return res.status(404).json({
        status: "NOT FOUND",
        message: "No shopping cart with products and PENDING status found"
    });
});


exports.deleteProductsFromShoppingCart = catchAsync( async (req, res, nex) => {
    const { id } = req.params; // id of the product

    // Validate if we have a shopping cart in PENDING state
    const shoppingCartPending = await Cart.findOne({ status: 'PENDING' });
  
    if (!shoppingCartPending) {
        return res.status(404).json({
            status: "NOT FOUND",
            message: "No shopping cart in PENDING status found"
        });
    }

    // Finding the index if the product exist in the array of products
    const indexproductFound =  shoppingCartPending.products.findIndex( (element) => {
        return element['productId'] === id;
    });
    
    console.log(indexproductFound);

    if ( indexproductFound == -1) {
        return res.status(404).json({
            status: "NOT FOUND",
            message: "No product with the id found in shopping cart"
        });
    }

    // Removin the product of the array of prpducts
    const newProducts = shoppingCartPending.products.splice(indexproductFound, 1);

    const newStatus = 'PAID';
    // Update the shopping cart updating the status with PAID
    const shoppingCartUpdated =  await Cart.findByIdAndUpdate({ _id: shoppingCartPending._id }, { $set: {products: shoppingCartPending.products}}, { new: true });

    return res.status(200).json({
        status: "PRODUCT REMOVED SUCCESS",
        data: {
            cart: shoppingCartUpdated,
        },
    });
});