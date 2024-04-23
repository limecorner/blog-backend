const express = require('express')
const router = express.Router()

const followshipController = require('../../controllers/followship-controller')

router.post('/:id', followshipController.postIdol)

module.exports = router
