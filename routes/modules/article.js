const express = require('express')
const router = express.Router()

const articleController = require('../../controllers/article-controller')

router.post('/', articleController.postArticle)

module.exports = router
