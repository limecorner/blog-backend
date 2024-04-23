const { Article, Response } = require('../models')
const authHelpers = require('../helpers/auth-helpers')
const { caughtErr } = require('../helpers/err-helpers')

const responseController = {
  postResponse: async (req, res, next) => {
    try {
      const articleId = Number(req.params.articleId)
      const { id: userId } = authHelpers.getUser(req)
      const { content } = req.body
      if (!content.trim()) {
        throw caughtErr('回覆的內容為必填欄位', 400, 31)
      }

      const article = await Article.findByPk(articleId)
      if (!article) {
        throw caughtErr('無法回覆不存在的文章', 404, 11)
      }

      const newResponse = await Response.create(
        { articleId, userId, content }
      )
      return res.json({
        success: true,
        data: {
          response: newResponse
        }
      })
    } catch (err) {
      next(err)
    }
  },
  putResponse: async (req, res, next) => {
    try {
      const id = Number(req.params.id)
      const { content } = req.body
      if (!content.trim()) {
        throw caughtErr('回覆的內容為必填欄位', 400, 31)
      }

      const response = await Response.findByPk(id)
      if (!response) {
        throw caughtErr('無法修改不存在的回覆', 404, 11)
      }

      const putResponse = await response.update(
        { content }
      )
      return res.json({
        success: true,
        data: {
          response: putResponse
        }
      })
    } catch (err) {
      next(err)
    }
  },
  deleteResponse: async (req, res, next) => {
    try {
      const id = Number(req.params.id)
      const response = await Response.findByPk(id)
      if (!response) {
        throw caughtErr('無法刪除不存在的文章', 404, 11)
      }

      const deletedResponse = await response.destroy()
      return res.json({
        success: true,
        data: {
          response: deletedResponse
        }
      })
    } catch (err) {
      next(err)
    }
  }

}
module.exports = responseController
