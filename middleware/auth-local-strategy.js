const passport = require('passport')
const LocalStrategy = require('passport-local')
const bcrypt = require('bcryptjs')
const { User } = require('../models')
const { caughtErr } = require('../helpers/err-helpers')

const strategy = new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  async (email, password, cb) => {
    try {
      const user = await User.findOne({ where: { email } })
      if (!user) throw caughtErr('帳號或密碼錯誤', 401, null)

      const isPasswordCorrect = await bcrypt.compare(password, user.password)
      if (!isPasswordCorrect) throw caughtErr('帳號或密碼錯誤', 401, null)
      cb(null, user.toJSON())
    } catch (err) {
      cb(err)
    }
  }
)

passport.use(strategy)
const authLocal = passport.authenticate('local', { session: false })

module.exports = authLocal
