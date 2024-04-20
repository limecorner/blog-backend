module.exports = {
  errorHandler (err, req, res, next) {
    if (err instanceof Error) {
      const { name, message, businessLogicErrorCode } = err
      res.status(err.statusCode || 500).json({
        success: false,
        message: `${name} ${message}`,
        business_logic_error_code: businessLogicErrorCode
      })
    } else {
      res.status(500).json({
        success: false,
        message: `${err}`
      })
    }
    next(err)
  }
}
