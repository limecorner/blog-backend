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
      ) { throw new Error('所有欄位必填') }
      if (password !== passwordCheck) throw new Error('兩次輸入的密碼不同')

      const user = await User.findOne({ where: { email } })
      if (user) throw new Error('Email 已經存在')

      const hash = await bcrypt.hash(password, saltRounds)
      const newUser = await User.create({
        name,
        email,
        password: hash
      })
      res.json({
        status: 'success',
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
        status: 'success',
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
