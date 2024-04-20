const express = require('express')
const { errorHandler } = require('../middleware/error-handler')
const passport = require('../config/passport')
const router = express.Router()

const admin = require('./modules/admin')
const userController = require('../controllers/user-controller')
router.post('/signin', passport.authenticate('local', { session: false }), userController.signIn)
router.post('/signup', userController.signUp)

router.use('/admin', admin)

router.use('/', errorHandler)
module.exports = router
