const passport = require('../config/passport')
const authHelpers = require('../helpers/auth-helpers')

const authLocal = passport.authenticate('local', { session: false })

const authenticatedAdmin = (req, res, next) => {
  if (authHelpers.getUser(req)?.role === 'admin') {
    return next()
  } else {
    const error = new Error('無法使用後台')
    error.statusCode = 403
    throw error
  }
}

const authenticatedUser = (req, res, next) => {
  if (authHelpers.getUser(req)?.role === 'user') {
    return next()
  } else {
    const error = new Error('無法使用前台')
    error.statusCode = 403
    throw error
  }
}

module.exports = {
  authLocal,
  authenticatedAdmin,
  authenticatedUser
}
