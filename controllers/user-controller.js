const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { User } = require('../models')
const { saltRounds } = require('../helpers/auth-helpers')

const userController = {
  signUp: async (req, res, next) => {
    try {
      const { name, email, password, passwordCheck } = req.body
      if (!name.trim() ||
        !email.trim() ||
        !password.trim() ||
        !passwordCheck.trim()
      ) {
        const error = new Error('所有欄位必填')
        error.statusCode = 400
        error.businessLogicErrorCode = 31
        throw error
      }
      if (password !== passwordCheck) {
        const error = new Error('兩次輸入的密碼不同')
        error.statusCode = 400
        error.businessLogicErrorCode = 32
        throw error
      }

      const user = await User.findOne({ where: { email } })
      if (user) {
        const error = new Error('Email 已經存在')
        error.statusCode = 400
        error.businessLogicErrorCode = 21
        throw error
      }

      const hash = await bcrypt.hash(password, saltRounds)
      const newUser = await User.create({
        name,
        email,
        password: hash
      })
      res.json({
        success: true,
        data: {
          user: newUser
        }
      })
    } catch (err) {
      next(err)
    }
  },
  signIn: (req, res, next) => {
    try {
      const userData = req.user
      delete userData.password
      const token = jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: '30d' })
      res.json({
        success: true,
        data: {
          token,
          user: userData
        }
      })
    } catch (err) {
      next(err)
    }
  }
}
module.exports = userController
