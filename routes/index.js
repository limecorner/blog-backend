const express = require('express')
const { errorHandler } = require('../middleware/error-handler')
const router = express.Router()

const { authLocal, authenticatedAdmin, authenticatedUser } = require('../middleware/auth')
const admin = require('./modules/admin')
const userController = require('../controllers/user-controller')

router.post('/admin/signin', authLocal, authenticatedAdmin, userController.signIn)
router.post('/signin', authLocal, authenticatedUser, userController.signIn)
router.post('/signup', userController.signUp)

router.use('/admin', admin)

router.use('/', errorHandler)
module.exports = router
