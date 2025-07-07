const User = require("../models/users.model");
const AppError = require("../utils/appError");
const asyncHandler = require("../utils/asyncHanlder");
const joi = require("joi");

let allUsers = [];
exports.getAllUsers = asyncHandler(async (req, res, next) => {
  if (allUsers.length > 1) {
    console.log("this has been cached");
    return res.json({ noOfUsers: allUsers.length, data: allUsers });
  }
  allUsers = await User.find();
  res.json({ noOfUsers: allUsers.length, data: allUsers });
});

exports.getUserProfile = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;
  const user = await User.findById(userId);

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.deleteUser = asyncHandler(async (req, res, next) => {
  const userId = req.params.userId;
  const user = await User.findByIdAndDelete(userId);

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  res.status(204).json({ message: "User deleted" });
});

exports.upgradeToAdmin = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;

  // Find the user to upgrade
  const user = await User.findById(userId);

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  // Check if user is already an admin
  if (user.role === "admin") {
    return next(new AppError("User is already an admin", 400));
  }

  // Update the user's role to admin
  user.role = "admin";
  await user.save();

  res.status(200).json({
    status: "success",
    message: "User has been upgraded to admin role",
    data: {
      user,
    },
  });
});

exports.onlyAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return next(
      new AppError(
        "You are not authorized to access this resource",
        403
      )
    );
  }

  next();
};
