const { User, Category } = require('../models')

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
  },
  postCategory: async (req, res, next) => {
    try {
      const { name } = req.body
      if (!name) {
        const error = new Error('文章類別為必填')
        error.statusCode = 400
        error.businessLogicErrorCode = 31
        throw error
      }

      const categories = await Category.findAll({ raw: true }) || []
      if (categories.length &&
        categories.some(category => category.name === name)) {
        const error = new Error('此文章類別已存在')
        error.statusCode = 400
        error.businessLogicErrorCode = 21
        throw error
      }

      const newCategory = await Category.create({ name })
      res.status(201).json({
        success: true,
        data: {
          category: newCategory
        }
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = adminController
