// const AppError = require()

const AppError = require("../utils/appError");

const onlyAdmin = (req, res, next) => {
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

const myArr = [1, 2, 3];

module.exports = {
  myArr,
  onlyAdmin,
};
