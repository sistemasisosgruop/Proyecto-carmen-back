class CustomError extends Error {
  constructor(message, statusCode, name) {
    super(message)
    this.name = name
    this.status = statusCode

    Error.captureStackTrace(this, this.constructor)
  }
}
module.exports = { CustomError }
