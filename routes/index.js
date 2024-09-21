const express = require('express')
const { errorHandler } = require('../middleware/error-handler')
const authLocal = require('../middleware/auth-local-strategy')

const router = express.Router()

const { authJWT, authenticatedAdmin, authenticatedUser } = require('../middleware/auth')
const admin = require('./modules/admin')
const userController = require('../controllers/user-controller')
const adminController = require('../controllers/admin-controller')
const user = require('./modules/user')
const article = require('./modules/article')
const response = require('./modules/response')
const followship = require('./modules/followship')

router.post('/admin/signin', authLocal, authenticatedAdmin, userController.signIn)
router.post('/signin', authLocal, authenticatedUser, userController.signIn)
router.post('/signup', userController.signUp)

router.get('/categories', authJWT, authenticatedUser, adminController.getCategories)
router.use('/admin', authJWT, authenticatedAdmin, admin)
router.use('/articles', authJWT, authenticatedUser, article)
router.use('/users', authJWT, authenticatedUser, user)
router.use('/responses', authJWT, authenticatedUser, response)
router.use('/followships', authJWT, authenticatedUser, followship)

router.use('/', errorHandler)
module.exports = router
