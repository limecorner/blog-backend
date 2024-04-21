const passport = require('passport')
const LocalStrategy = require('passport-local')
const bcrypt = require('bcryptjs')
const { User } = require('../models')

const strategy = new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  async (email, password, cb) => {
    try {
      const user = await User.findOne({ where: { email } })
      const error = new Error('帳號或密碼錯誤')
      error.statusCode = 401
      if (!user) throw error

      const isPasswordCorrect = await bcrypt.compare(password, user.password)
      if (!isPasswordCorrect) throw error
      cb(null, user.toJSON())
    } catch (err) {
      cb(err)
    }
  }
)

passport.use(strategy)
const authLocal = passport.authenticate('local', { session: false })

module.exports = authLocal
