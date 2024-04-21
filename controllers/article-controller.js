const { Article } = require('../models')
const { caughtErr } = require('../helpers/err-helpers')

const articleController = {
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
