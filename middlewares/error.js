class errorHandler extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}
export const errorMiddleware = (err, req, res, next) => {
  err.message = err.message || "This is an internal error";
  err.status = err.status || 500;
  res.status(err.status).json({
    success: false,
    message: err.message,
  });
};
export default errorHandler;
