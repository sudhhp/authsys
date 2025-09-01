const NotFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`); // Added space after hyphen
  res.status(404);
  next(error);
};
const ErrorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;
  if (err.name === "CastError" && err.kind === "ObjectId") {
    statusCode = 404;
    message = "Resource not found";
  }
  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
export { NotFound, ErrorHandler };
