const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const CustomError = require("../utils/customError");
const { hashPassword, comparePassword } = require("../utils/passwordUtil");
const { generateToken } = require("../utils/jwtUtil");
const { isValidObjectId } = require("mongoose");

const getUser = async (req, res, next) => {
  let id = req.userId;
  try {
    let user = await User.findById(id).select('-password');
    if (!user) {
      throw new CustomError("User not Found", 404);
    }
    res.status(200).json({success:true, message: "User fetched successfully", data: user });
  } catch (error) {
    next(error);
  }
};

const getUsers = async (req, res, next) => {
  try {
    let users = await User.find().select('-password');
    res
      .status(200)
      .json({success:true, message: "Users fetched successfully", data: users });
  } catch (error) {
    next(error);
  }
};

const registerUser = async (req, res, next) => {
  let { email, username, password, name } = req.body;
  try {
    let hashedPassword = await hashPassword(password);
    let user = new User({ name, password: hashedPassword, username, email });
    let error = user.validateSync();
    if (error) {
      throw new CustomError("All fields are required", 400);
    }
    await user.save();
    res
      .status(201)
      .json({success:true, message: "User registered successfully", data: user });
  } catch (error) {
    if (error.code === 11000) {
      next(new CustomError("Email or Username already exists"));
    }
  }
};

let login = async (req, res, next) => {
  let { email, password } = req.body;
  try {
    let user = await User.findOne({ email: email });
    if (!user) {
      throw new CustomError("User not found", 404);
    }
    let isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      throw new CustomError("Invalid credentials", 400);
    }
    let token = generateToken({ id: user._id });
    res
      .status(200)
      .json({success:true, message: "login successful", token: token, data: user });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  let { id } = req.params;
  try {
    if(!isValidObjectId(id)){
      throw new CustomError('Invalid id', 400)
    }
    let user = await User.findByIdAndDelete(id).select('-password');
    if (!user) {
      throw new CustomError("User not Found", 404);
    }
    res.status(200).json({success:true, message: "User deleted successfully", data: user });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  let id = req.userId;
  let { name, password } = req.body;
  try {
    let update = {};
    if (name) update.name = name;
    if (password) update.password = await hashPassword(password);

    const user = await User.findByIdAndUpdate(
      id,
      { $set: update },
      { new: true, runValidators: true }
    ).select('-password');
    if (!user) {
      throw new CustomError("User not found", 404);
    }

    res.status(200).json({success:true, message: "User updated successfully", data: user });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUser,
  getUsers,
  login,
  registerUser,
  deleteUser,
  updateUser,
};
