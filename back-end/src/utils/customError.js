class CustomError extends Error {
  constructor(message, statusCode) {
    super(message); // call parent class (Error)
    this.statusCode = statusCode;
    this.isOperational = true; // Indicates if this error is operational (non-programming error):like invalid input, resource not found, etc.

    // Capture stack trace for debugging (optional)
    Error.captureStackTrace(this, this.constructor);
  }
}

export default CustomError;
