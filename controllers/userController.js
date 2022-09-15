const fs = require("fs");
const crypto = require("crypto");
const User = require("../models/User");
const catchAsync = require("../utils/catchAsync");

exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find();
  const usersWithoutPassword = [];

  users.forEach( (user) => {
    let newUser = user.toObject();
    delete newUser.password;
    usersWithoutPassword.push(newUser);
  }); 

  res.status(200).json({
    status: "success",
    timeOfRequest: req.requestTime,
    results: users.length,
    data: {
      users: usersWithoutPassword,
    },
  });
});

exports.addUser = catchAsync(async (req, res) => {
  req.body.password = crypto
    .createHash("sha256")
    .update(req.body.password)
    .digest("hex");

  let newUser = await User.create(req.body);
  newUser = newUser.toObject();
  delete newUser.password;

  res.status(200).json({
    status: "success",
    data: {
      user: newUser,
    },
  });
});

exports.getUserById = catchAsync(async (req, res) => {
  let foundUser = await User.findById(req.params.id);
  foundUser = foundUser.toObject();
  delete foundUser.password;

  if (foundUser) {
    res.status(200).json({
      status: "success",
      data: {
        user: foundUser,
      },
    });
  } else {
    res.status(404).json({
      status: "not found",
    });
  }
});

exports.updateUser = async (req, res) => {

  const userToUpdate = req.body;
  const { id } = req.params;

  let userUpdated = await User.findByIdAndUpdate({ _id: id },  userToUpdate , { new: true });
  userUpdated = userUpdated.toObject();
  delete userUpdated.password;

  if (userUpdated) {
    return res.status(200).json({
      status: "PUT success",
      data: {
        user: userUpdated,
      },
    });
  } else {
    
    return res.status(404).json({
      status: "Not found",
    });
  }
}

exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  let userDeleted = await User.findByIdAndDelete({ _id: id });
  userDeleted = userDeleted.toObject();
  delete userDeleted.password;
  
  if (userDeleted) {  
    return res.status(200).json({
      status: "DELETE success",
      data: {
        user: userDeleted,
      },
    });
  } else {
    
    return res.status(404).json({
      status: "Not found",
    });
  }
}