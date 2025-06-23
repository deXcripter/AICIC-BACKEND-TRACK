const User = require("../models/users.model");
const AppError = require("../utils/appError");
const asyncHandler = require("../utils/asyncHanlder");
const joi = require("joi");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../utils/mailer");

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

  return sendToken(res, user._id);
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

  return sendToken(res, foundUser._id);
});

// send otp to the user email
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  // 1) get the email from the user
  const { email } = req.body;
  if (!email)
    return next(new AppError("Please enter your email", 400));

  // 2) verify if the email is a valid email (is registered on our system)
  const user = await User.findOne({ email });
  if (!user) return next(new AppError("User not found", 404));

  // 3) update the user and set the OTP
  let OTP = 0;

  while (OTP < 1000) {
    OTP = Math.floor(Math.random() * 10000);
  }

  // 8486;

  await sendEmail(user.email, "Password Reset", OTP);

  user.OTP = OTP;
  await user.save();

  // 4) send a response to the client
  res.send({ message: "OTP Sent. Please check your email" });
});

// send otp to the user email
exports.resetPassword = asyncHandler(async (req, res, next) => {
  // 1) extract the email, otp and new password from the body
  const { otp, email, password } = req.body;
  if (!otp || !email) {
    return next(
      new AppError("Please provide your OTP and Email", 400)
    );
  }

  // 2) Verify the OTP
  const user = await User.findOne({ email });
  // if (!user || parseInt(user.OTP) !== parseInt(otp)) {
  //   return next(new AppError("Invalid credentials", 400));
  // }

  if (!user) {
    return next(new AppError("No user found with this email", 404));
  }

  if (parseInt(user.OTP) !== parseInt(otp)) {
    return next(new AppError("OTP Mismatch", 400));
  }

  // 3) Update the password and confirm
  user.password = password;
  user.OTP = undefined;

  await user.save({ validateBeforeSave: true });

  return sendToken(res, user._id);
});

function sendToken(res, userId) {
  // 1) to generate a token from the user ID
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET);
  res.status(200).json({ token });
  // 2) to send the token as a response back to the client
}
