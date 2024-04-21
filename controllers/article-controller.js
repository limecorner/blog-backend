const { Article } = require('../models')

const articleController = {
  postArticle: async (req, res, next) => {
    try {
      const { userId, categoryId, title, content, clapCount } = req.body
      if (!categoryId || !title.trim() || !content.trim()) {
        const error = new Error('文章類別、標題、內容皆為必填欄位')
        error.status = 400
        error.businessLogicErrorCode = 31
        throw error
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
