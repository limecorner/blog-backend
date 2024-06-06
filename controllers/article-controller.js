const { Op } = require('sequelize')
const { Article, Category, Response, User } = require('../models')
const authHelpers = require('../helpers/auth-helpers')
const { caughtErr } = require('../helpers/err-helpers')
const { userPermissionsEnum, articlePermissionsEnum } = require('../constants')

const articleController = {
  getArticles: async (req, res, next) => {
    try {
      const loggedPermission = authHelpers.getUser(req).permission
      let permissions = []
      if (loggedPermission === userPermissionsEnum.login) {
        permissions = [
          articlePermissionsEnum.guest,
          articlePermissionsEnum.login]
      } else if (loggedPermission === userPermissionsEnum.member) {
        permissions = [
          articlePermissionsEnum.guest,
          articlePermissionsEnum.login,
          articlePermissionsEnum.member]
      }
      const { limit, offset } = req.query
      // 引入 limit, offset 調整 where 限制
      const whereQuery = {}
      Object.keys(req.query).forEach(key => {
        if (key !== 'limit' && key !== 'offset') {
          whereQuery[key] = req.query[key]
        }
      })
      console.log('whereQuery', whereQuery)

      const articles = await Article.findAll({
        include: [
          { model: Category },
          { model: User, attributes: ['id', 'name'] }],
        where: {
          permission: {
            [Op.or]: permissions
          },
          ...whereQuery
          // userId: req.query.userId
        },
        order: [['createdAt', 'DESC'], ['id', 'DESC']],
        nest: true,
        raw: true,
        limit: limit ? Number(limit) : null,
        offset: offset ? Number(offset) : null
      })
      if (!articles.length) {
        throw caughtErr(`在你的使用者權限 ${loggedPermission} 底下，目前沒有可以看的文章`, 404, 11)
      }

      return res.json({
        success: true,
        articles
      })
    } catch (err) {
      next(err)
    }
  },
  getArticle: async (req, res, next) => {
    try {
      const id = Number(req.params.id)
      const article = await Article.findByPk(id, {
        include: [
          {
            model: Category, attributes: ['id', 'name']
          },
          {
            model: Response,
            include: [{ model: User, attributes: ['id', 'name'] }]
          }, {
            model: User, attributes: ['id', 'name']
          }],
        order: [[{ model: Response }, 'createdAt', 'DESC']]
      })

      return res.json({
        success: true,
        article: article.toJSON()
      })
    } catch (err) {
      next(err)
    }
  },
  postArticle: async (req, res, next) => {
    try {
      const { id: userId } = authHelpers.getUser(req)
      const { categoryId, title, permission, content } = req.body
      if (!categoryId || !title.trim() || !content.trim()) {
        throw caughtErr('文章類別、標題、內容皆為必填欄位', 400, 31)
      }

      const newArticle = await Article.create(
        { userId, categoryId, title, permission, content }
      )
      return res.json({
        success: true,
        article: newArticle
      })
    } catch (err) {
      next(err)
    }
  },
  putArticle: async (req, res, next) => {
    try {
      const id = Number(req.params.id)
      const { categoryId, title, permission, content } = req.body
      if (!categoryId || !title.trim() || !content.trim()) {
        throw caughtErr('文章類別、標題、內容皆為必填欄位', 400, 31)
      }

      const article = await Article.findByPk(id)
      if (!article) {
        throw caughtErr('無法編輯不存在的文章', 404, 11)
      }

      const putArticle = await article.update(
        { categoryId, title, permission, content }
      )
      return res.json({
        success: true,
        article: putArticle
      })
    } catch (err) {
      next(err)
    }
  },
  patchArticle: async (req, res, next) => {
    try {
      const id = Number(req.params.id)
      const { categoryId } = req.body
      if (!categoryId) {
        throw caughtErr('文章類別必填欄位', 400, 31)
      }

      const article = await Article.findByPk(id)
      if (!article) {
        throw caughtErr('無法編輯不存在的文章權限', 404, 11)
      }

      const patchArticle = await article.update(
        { categoryId }
      )
      return res.json({
        success: true,
        article: patchArticle
      })
    } catch (err) {
      next(err)
    }
  },
  deleteArticle: async (req, res, next) => {
    try {
      const id = Number(req.params.id)
      const article = await Article.findByPk(id)
      if (!article) {
        throw caughtErr('無法刪除不存在的文章', 404, 11)
      }

      const deletedArticle = await article.destroy()
      return res.json({
        success: true,
        article: deletedArticle
      })
    } catch (err) {
      next(err)
    }
  }
}
module.exports = articleController
