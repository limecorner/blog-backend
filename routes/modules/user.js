const express = require('express')
const router = express.Router()

const userController = require('../../controllers/user-controller')
const upload = require('../../middleware/multer')

router.get('/current-user', userController.getCurrentUser)
router.get('/:id', userController.getUser)
router.put('/:id', upload.single('photo'), userController.putUser)

module.exports = router
