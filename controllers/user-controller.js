const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { User } = require('../models')
const { saltRounds } = require('../helpers/auth-helpers')
const { caughtErr } = require('../helpers/err-helpers')

const userController = {
  signUp: async (req, res, next) => {
    try {
      const { name, email, password, passwordCheck } = req.body
      if (!name.trim() ||
        !email.trim() ||
        !password.trim() ||
        !passwordCheck.trim()
      ) {
        throw caughtErr('所有欄位必填', 400, 31)
      }
      if (password !== passwordCheck) {
        throw caughtErr('兩次輸入的密碼不同', 400, 32)
      }

      const user = await User.findOne({ where: { email } })
      if (user) {
        throw caughtErr('Email 已經存在', 400, 21)
      }

      const hash = await bcrypt.hash(password, saltRounds)
      await User.create({
        name,
        email,
        password: hash
      })
      res.json({
        success: true,
        message: '註冊成功'
      })
    } catch (err) {
      next(err)
    }
  },
  signIn: (req, res, next) => {
    try {
      const user = req.user
      delete user.password
      const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '30d' })
      res.json({
        success: true,
        token,
        user
      })
    } catch (err) {
      next(err)
    }
  }
}
module.exports = userController
