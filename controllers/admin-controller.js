const { User } = require('../models')

const adminController = {
  patchUser: async (req, res, next) => {
    try {
      const { id } = req.params
      const user = await User.findByPk(id)
      if (!user) {
        const error = new Error('該使用者不存在')
        error.statusCode = 404
        error.businessLogicErrorCode = 11
        throw error
      }

      const permissions = Object.values(User.rawAttributes.permission.values)
      const { permission } = req.body
      if (!permissions.includes(permission)) {
        const error = new Error('該使用者權限不存在')
        error.statusCode = 404
        error.businessLogicErrorCode = 11
        throw error
      }

      const patchedUser = await user.update({ permission })

      res.json({
        success: true,
        data: {
          user: patchedUser
        }
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = adminController
