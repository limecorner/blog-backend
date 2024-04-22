const express = require('express')
const router = express.Router()

const adminController = require('../../controllers/admin-controller')
const articleController = require('../../controllers/article-controller')

router.patch('/users/:id', adminController.patchUser)

router.get('/categories/:id', adminController.getCategory)
router.get('/categories', adminController.getCategories)
router.post('/categories', adminController.postCategory)
router.put('/categories/:id', adminController.putCategory)
router.delete('/categories/:id', adminController.deleteCategory)

router.delete('/articles/:id', articleController.deleteArticle)

module.exports = router
