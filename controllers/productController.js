const fs = require("fs");
const Product = require("../models/Product");
const catchAsync = require("../utils/catchAsync");

exports.getAllProducts = catchAsync(async (req, res) => {
  const products = await Product.find();

  res.status(200).json({
    status: "success",
    timeOfRequest: req.requestTime,
    results: products.length,
    data: {
      products,
    },
  });
});

exports.addProduct = catchAsync(async (req, res) => {
  const newProduct = await Product.create(req.body);
  res.status(200).json({
    status: "success",
    data: {
      product: newProduct,
    },
  });
});

exports.getProductById = catchAsync(async (req, res) => {
  const foundProduct = await Product.findById(req.params.id);
  if (foundProduct) {
    res.status(200).json({
      status: "success",
      data: {
        product: foundProduct,
      },
    });
  } else {
    res.status(404).json({
      status: "not found",
    });
  }
});

exports.updateProduct = catchAsync(async (req, res) => {

  const productToUpdate = req.body;
  const { id } = req.params;

  const productUpdated = await Product.findByIdAndUpdate({ _id: id },  productToUpdate , { new: true });
  
  if (productUpdated) {
    return res.status(200).json({
      status: "PUT success",
      data: {
        product: productUpdated,
      },
    });
  } else {
    
    return res.status(404).json({
      status: "Not found",
    });
  }
});


exports.deleteProduct = catchAsync( async (req, res) => {
  const { id } = req.params;

  const productDeleted = await Product.findByIdAndDelete({ _id: id });
  
  if (productDeleted) {  
    return res.status(200).json({
      status: "DELETE success",
      data: {
        product: productDeleted,
      },
    });
  } else {
    
    return res.status(404).json({
      status: "Not found",
    });
  }
});