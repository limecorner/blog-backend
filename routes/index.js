const express = require('express')
const { errorHandler } = require('../middleware/error-handler')
const passport = require('../config/passport')
const router = express.Router()
const userController = require('../controllers/user-controller')
router.post('/signin', passport.authenticate('local', { session: false }), userController.signIn)
router.post('/signup', userController.signUp)
router.use('/', errorHandler)
module.exports = router
