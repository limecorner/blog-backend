const express = require('express')
const { errorHandler } = require('../middleware/error-handler')
const authLocal = require('../middleware/auth-local-strategy')
const authJWT = require('../middleware/auth-jwt-strategy')

const router = express.Router()

const { authenticatedAdmin, authenticatedUser } = require('../middleware/auth')
const admin = require('./modules/admin')
const userController = require('../controllers/user-controller')
const article = require('./modules/article')

router.post('/admin/signin', authLocal, authenticatedAdmin, userController.signIn)
router.post('/signin', authLocal, authenticatedUser, userController.signIn)
router.post('/signup', userController.signUp)

router.use('/admin', authJWT, authenticatedAdmin, admin)
router.use('/articles', authJWT, authenticatedUser, article)

router.use('/', errorHandler)
module.exports = router
