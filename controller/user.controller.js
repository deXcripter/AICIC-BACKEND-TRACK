const User = require("../models/users.model");
const AppError = require("../utils/appError");
const asyncHandler = require("../utils/asyncHanlder");
const joi = require("joi");

exports.createUserAccount = asyncHandler(async (req, res, next) => {
  const schema = joi.object({
    name: joi.string().required(),
    password: joi.string().required(),
    passwordConfirm: joi.string().required(),
    email: joi.string().email().required(),
  });

  const { value, error } = schema.validate(req.body);
  if (error) {
    return next(new AppError(error.details[0].message), 400);
  }

  if (value.passwordConfirm != value.password)
    return next(new AppError("Passwords do not match", 400));

  const user = await User.create(value);

  res.status(201).json({ status: "success", data: user });
});

exports.login = asyncHandler(async (req, res) => {
  // const
});

exports.getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.json({ noOfUsers: users.length, data: users });
});
