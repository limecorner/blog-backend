const express = require('express')
const router = express.Router()

const followshipController = require('../../controllers/followship-controller')

router.post('/:idolId', followshipController.postIdol)
router.delete('/:idolId', followshipController.deleteIdol)

module.exports = router
