/**
 * global error handler middleware for Express applications
 * ----------------------------------------------------------
 * This middleware catches and processes all errors that are passed to next() throughout the application
 * It handles errors differently based on the environment (production vs development)
 */

exports.gloablErrorHandler = (err, req, res, next) => {
  if (process.env.NODE_ENV == "production") {
    return handleProductionError(err, res);
  } else {
    return handleDevelopmentError(err, res);
  }
};

/**
 * handles errors in development environment:
 * It returns detailed error information since we don't need to sanitize error data in development
 */
function handleDevelopmentError(err, res) {
  const statusCode = err.statucCode || 500;
  const message = err.message || "Something went wrong somewhere";

  res.status(statusCode).json({
    message,
    err: err,
  });
}

/**
 * @desc this function assumes we are running on the production enviroment, and tries to
 *  hide sensitive information from the users of the application.
 *  when an error is called with the `AppError` constructor we defined in the `./utils/appError.js` file,
 *  it is treated as an operational error (an error that we allow the user to see).
 *  Because of this, if any other error (bug) occurs in our application and we fail to either catch or handle them,
 *  it is therefore a `non-operational` error and is not sent to the client (or user)
 */
function handleProductionError(err, res) {
  if (err.isOperational) {
    res.status(err.statusCode).json({ message: err.message });
  } else {
    res.status(500).json({
      message:
        "Dear user, something went wrong and we are on it already",
    });
  }
}
