const passport = require('passport')
const LocalStrategy = require('passport-local')
const passportJWT = require('passport-jwt')
const { User } = require('../models')

const JWTStrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt

passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  async (email, password, cb) => {
    try {
      const user = await User.findOne({ where: { email } })
      if (!user || password !== user.password) throw new Error('帳號或密碼錯誤。')
      cb(null, user.toJSON())
    } catch (err) {
      cb(err)
    }
  }
))

const jwtOptions = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
}
passport.use(new JWTStrategy(jwtOptions, async (jwtPayload, cb) => {
  try {
    const user = await User.findByPk(jwtPayload.id)
    cb(null, user)
  } catch (error) {
    cb(error)
  }
}))

module.exports = passport
