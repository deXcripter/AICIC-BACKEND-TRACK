const User = require("../models/users.model");
const AppError = require("../utils/appError");
const asyncHandler = require("../utils/asyncHanlder");
const joi = require("joi");

exports.getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();
  res.json({ noOfUsers: users.length, data: users });
});

exports.deleteUser = asyncHandler(async (req, res, next) => {
  const userId = req.params.userId;
  const user = await User.findByIdAndDelete(userId);

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  res.status(204).json({ message: "User deleted" });
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
