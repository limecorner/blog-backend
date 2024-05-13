const express = require('express')
const router = express.Router()

const userController = require('../../controllers/user-controller')

router.get('/current-user', userController.getCurrentUser)

module.exports = router
