const authHelpers = require('../helpers/auth-helpers')
const { caughtErr } = require('../helpers/err-helpers')

const authenticatedAdmin = (req, res, next) => {
  if (authHelpers.getUser(req)?.permission === 'admin') {
    return next()
  } else {
    throw caughtErr('無法使用後台', 403, null)
  }
}

const authenticatedUser = (req, res, next) => {
  const permission = authHelpers.getUser(req)?.permission
  if (permission === 'login' || permission === 'member') {
    return next()
  } else {
    throw caughtErr('無法使用前台', 403, null)
  }
}

module.exports = {
  authenticatedAdmin,
  authenticatedUser
}
