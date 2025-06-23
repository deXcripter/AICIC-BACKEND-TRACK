const AppError = require("../utils/appError");
const jwt = require("jsonwebtoken");
const asyncHandler = require("../utils/asyncHanlder");
const User = require("../models/users.model");

exports.protectRoute = asyncHandler(async (req, res, next) => {
  //   console.log(req.headers);
  // 1) check if the auth-header exists, and if it does, fetch the token from the header

  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer ")
  ) {
    return next(
      new AppError(
        "You are not logged in. Please login to access this route",
        401
      )
    );
  }

  const token = req.headers.authorization.split(" ")[1];

  // 2) verify if the jwt is valid
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // 3) validate if the user the token belongs to still exist
  const user = await User.findById(decoded.id);
  if (!user)
    return next(
      new AppError(
        "The user belonging to this token does no longer exist",
        401
      )
    );

  // 9:00 am
  // 10: 01 am
  console.log(user.passwordUpdatedAt, new Date(decoded.iat * 1000));
  // password was updated at 10:45
  // jwt token was issued at 10:50
  // TODO: compare my timestamps instead of Fates
  if (user.passwordUpdatedAt > new Date(decoded.iat * 1000)) {
    return next(
      new AppError(
        "This password was recently changed. Please login again",
        401
      )
    );
  }

  req.user = user; // loads the user to the request
  next();
});
