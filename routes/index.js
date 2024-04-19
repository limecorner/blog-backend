const express = require('express')
const passport = require('../config/passport')
const router = express.Router()
const userController = require('../controllers/user-controller')
router.post('/signin', passport.authenticate('local', { session: false }), userController.signIn)
router.post('/signup', userController.signUp)

module.exports = router
