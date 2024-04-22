const { Article, Response } = require('../models')
const authHelpers = require('../helpers/auth-helpers')
const { caughtErr } = require('../helpers/err-helpers')

const responseController = {
  postResponse: async (req, res, next) => {
    try {
      const articleId = req.params.articleId
      const { id: userId } = authHelpers.getUser(req)
      const { content } = req.body
      if (!content.trim()) {
        throw caughtErr('回覆的內容為必填欄位', 400, 31)
      }

      const article = await Article.findByPk(articleId)
      if (!article) {
        throw caughtErr('無法回覆不存在的文章', 400, 31)
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
  }

}
module.exports = responseController
