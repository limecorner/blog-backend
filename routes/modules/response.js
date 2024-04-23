const express = require('express')
const router = express.Router()

const responseController = require('../../controllers/response-controller')

router.post('/:articleId', responseController.postResponse)
router.put('/:id', responseController.putResponse)
router.delete('/:id', responseController.deleteResponse)

module.exports = router
