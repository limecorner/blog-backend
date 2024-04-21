const express = require('express')
const router = express.Router()

const adminController = require('../../controllers/admin-controller')

router.patch('/users/:id', adminController.patchUser)

router.get('/categories', adminController.getCategories)
router.post('/categories', adminController.postCategory)
router.put('/categories/:id', adminController.putCategory)

module.exports = router
