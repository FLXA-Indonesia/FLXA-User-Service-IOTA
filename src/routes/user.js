const express = require('express')
const router = express.Router()

const { isAuthenticated } = require('../middlewares/auth')
const { editUser, changeSecretString, forgotSecretString } = require('../controllers/user')

router.put('/edit', isAuthenticated, editUser)
router.put('/edit/secret-string', isAuthenticated, changeSecretString)
router.put('/edit/forgot-secret-string', forgotSecretString)

module.exports = router
