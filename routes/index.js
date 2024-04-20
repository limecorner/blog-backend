const express = require('express')
const { errorHandler } = require('../middleware/error-handler')
const passport = require('../config/passport')
const router = express.Router()

const { authLocal, authenticatedAdmin } = require('../middleware/auth')
const admin = require('./modules/admin')
const userController = require('../controllers/user-controller')

router.post('/admin/signin', authLocal, authenticatedAdmin, userController.signIn)
router.post('/signin', passport.authenticate('local', { session: false }), userController.signIn)
router.post('/signup', userController.signUp)

router.use('/admin', admin)

router.use('/', errorHandler)
module.exports = router
