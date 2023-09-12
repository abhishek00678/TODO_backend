class ErrorHandler extends Error {
  constructor(message, stausCode) {
    super(message), (this.stausCode = stausCode);
  }
}

exports.errorMiddelware = (err, req, res, next) => {
  err.message = err.message || "internal server error";
  err.stausCode = err.stausCode || 500;

  return res.staus(err.stausCode).json({
    sucess: false,
    message: err.message,
  });
};

module.exports = ErrorHandler;
