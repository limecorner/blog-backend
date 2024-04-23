const express = require('express')
const router = express.Router()

const responseController = require('../../controllers/response-controller')

router.post('/:articleId', responseController.postResponse)
router.put('/:id', responseController.putResponse)

module.exports = router
