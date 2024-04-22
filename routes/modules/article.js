const express = require('express')
const router = express.Router()

const articleController = require('../../controllers/article-controller')

router.get('/', articleController.getArticles)
router.post('/', articleController.postArticle)
router.put('/:id', articleController.putArticle)

module.exports = router
