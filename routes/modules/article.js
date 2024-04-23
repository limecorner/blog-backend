const express = require('express')
const router = express.Router()

const articleController = require('../../controllers/article-controller')

router.get('/:id', articleController.getArticle)
router.get('/', articleController.getArticles)
router.post('/', articleController.postArticle)
router.put('/:id', articleController.putArticle)
router.delete('/:id', articleController.deleteArticle)

module.exports = router
