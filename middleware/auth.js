const authHelpers = require('../helpers/auth-helpers')
const { caughtErr } = require('../helpers/err-helpers')

const authenticatedAdmin = (req, res, next) => {
  if (authHelpers.getUser(req)?.role === 'admin') {
    return next()
  } else {
    throw caughtErr('無法使用後台', 403, null)
  }
}

const authenticatedUser = (req, res, next) => {
  if (authHelpers.getUser(req)?.role === 'user') {
    return next()
  } else {
    throw caughtErr('無法使用前台', 403, null)
  }
}

module.exports = {
  authenticatedAdmin,
  authenticatedUser
}
