const { User, Category } = require('../models')
const { caughtErr } = require('../helpers/err-helpers')

const adminController = {
  patchUser: async (req, res, next) => {
    try {
      const { id } = req.params
      const user = await User.findByPk(id)
      if (!user) {
        throw caughtErr('該使用者不存在', 404, 11)
      }

      const permissions = Object.values(User.rawAttributes.permission.values)
      const { permission } = req.body
      if (!permissions.includes(permission)) {
        throw caughtErr('該使用者權限不存在', 404, 11)
      }

      const patchedUser = await user.update({ permission })

      res.json({
        success: true,
        user: patchedUser
      })
    } catch (error) {
      next(error)
    }
  },
  postCategory: async (req, res, next) => {
    try {
      const { name } = req.body
      if (!name) {
        throw caughtErr('文章類別為必填', 400, 31)
      }

      const categories = await Category.findAll({ raw: true }) || []
      if (categories.length &&
        categories.some(category => category.name === name)) {
        throw caughtErr('此文章類別已存在', 400, 21)
      }

      const newCategory = await Category.create({ name })
      res.status(201).json({
        success: true,
        category: newCategory
      })
    } catch (error) {
      next(error)
    }
  },
  getCategory: async (req, res, next) => {
    try {
      const id = req.params.id
      const category = await Category.findByPk(id, {
        raw: true
      })
      if (!category) {
        throw caughtErr('無法取得不存在的文章類別', 404, 11)
      }
      res.json({
        success: true,
        category
      })
    } catch (error) {
      next(error)
    }
  },
  getCategories: async (req, res, next) => {
    try {
      const categories = await Category.findAll({ raw: true }) || []
      res.json({
        success: true,
        categories
      })
    } catch (error) {
      next(error)
    }
  },
  putCategory: async (req, res, next) => {
    try {
      const id = Number(req.params.id)
      const { name } = req.body
      if (!name.trim()) {
        throw caughtErr('文章類別為必填', 400, 31)
      }

      const categories = await Category.findAll({ raw: true }) || []
      if (categories.length &&
        categories.some(category => category.name === name)) {
        throw caughtErr('此文章類別已存在', 400, 21)
      }

      const category = await Category.findByPk(id)
      if (!category) {
        throw caughtErr('無法編輯不存在的文章類別', 404, 11)
      }

      const putCategory = await category.update({ name })
      res.status(200).json({
        success: true,
        category: putCategory
      })
    } catch (error) {
      next(error)
    }
  },
  deleteCategory: async (req, res, next) => {
    try {
      const id = Number(req.params.id)
      const category = await Category.findByPk(id)
      if (!category) {
        throw caughtErr('無法刪除不存在的文章類別', 404, 11)
      }

      const deletedCategory = await category.destroy()
      res.status(200).json({
        success: true,
        category: deletedCategory
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = adminController
