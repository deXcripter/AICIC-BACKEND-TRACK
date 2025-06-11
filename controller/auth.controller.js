const User = require("../models/users.model");
const AppError = require("../utils/appError");
const asyncHandler = require("../utils/asyncHanlder");
const joi = require("joi");
const jwt = require("jsonwebtoken");

exports.signup = asyncHandler(async (req, res, next) => {
  const schema = joi.object({
    name: joi.string().required(),
    password: joi.string().required(),
    passwordConfirm: joi.string().required(),
    email: joi.string().email().required(),
  });

  const { error, value } = schema.validate(req.body);

  if (error) {
    return next(new AppError(error.details[0].message, 400));
  }

  if (value.passwordConfirm != value.password)
    return next(new AppError("Passwords do not match", 400));

  const user = await User.create(value);

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.status(201).json({ status: "success", data: user, token });
});

exports.login = asyncHandler(async (req, res, next) => {
  // get the email and password from the client

  //   const email = req.body.email;
  //   const password = req.body.password;

  //   if (!email) return new AppError("Please enter your email", 400);
  //   if (!password)
  //     return new AppError("Please enter your password", 400);
  const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
  });

  const { value, error } = loginSchema.validate(req.body);
  if (error) {
    return next(new AppError(error.message, 400));
  }

  // check if the email exists in the database
  const foundUser = await User.findOne({ email: value.email }).select(
    "password"
  );

  // check if the password matches the found user
  if (
    !foundUser ||
    !(await foundUser.comparePassword(
      value.password,
      foundUser.password
    ))
  )
    return next(new AppError("Invald credentials", 404));

  const token = jwt.sign(
    { id: foundUser._id },
    process.env.JWT_SECRET
  );

  res.json({
    token,
  });
});
