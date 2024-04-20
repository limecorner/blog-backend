const express = require('express')
const router = express.Router()

const adminController = require('../../controllers/admin-controller')

router.patch('/users/:id', adminController.patchUser)

module.exports = router
