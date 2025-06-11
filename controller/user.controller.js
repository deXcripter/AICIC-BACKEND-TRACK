const User = require("../models/users.model");
const AppError = require("../utils/appError");
const asyncHandler = require("../utils/asyncHanlder");
const joi = require("joi");

exports.getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.json({ noOfUsers: users.length, data: users });
});
