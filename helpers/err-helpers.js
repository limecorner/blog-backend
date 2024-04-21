const caughtErr = (message, statusCode, businessLogicErrorCode) => {
  const error = new Error(message)
  error.statusCode = statusCode
  error.businessLogicErrorCode = businessLogicErrorCode
  return error
}

module.exports = {
  caughtErr
}
