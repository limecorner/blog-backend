const { Op } = require('sequelize')
const { Article, Category } = require('../models')
const authHelpers = require('../helpers/auth-helpers')
const { caughtErr } = require('../helpers/err-helpers')
const { userPermissionsEnum, articlePermissionsEnum } = require('../constants')

const articleController = {
  getArticles: async (req, res, next) => {
    try {
      console.log('authHelpers.getUser(req)', authHelpers.getUser(req))
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

      const articles = await Article.findAll({
        include: [{ model: Category }],
        where: {
          permission: {
            [Op.or]: permissions
          }
        },
        order: [['createdAt', 'DESC'], ['id', 'DESC']]
      })
      console.log({ articles })
      if (!articles.length) {
        throw caughtErr(`在你的使用者權限 ${loggedPermission} 底下，目前沒有可以看的文章`, 404, 11)
      }

      return res.json({
        success: true,
        data: {
          articles
        }
      })
    } catch (err) {
      next(err)
    }
  },
  postArticle: async (req, res, next) => {
    try {
      const { userId, categoryId, title, content, clapCount } = req.body
      if (!categoryId || !title.trim() || !content.trim()) {
        throw caughtErr('文章類別、標題、內容皆為必填欄位', 400, 31)
      }

      const newArticle = await Article.create(
        { userId, categoryId, title, content, clapCount }
      )
      return res.json({
        success: true,
        data: {
          article: newArticle
        }
      })
    } catch (err) {
      next(err)
    }
  }
}
module.exports = articleController
