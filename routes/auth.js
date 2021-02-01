const express = require('express')
const router = express.Router()
const authController = require('../controller/authController')
const { check } = require('express-validator')
const auth = require('../middleware/auth')


router.post('/',

    [
        check('nickName', 'Credenciales incorrectas').not().isEmpty(),
        check('password', 'Credenciales incorrectas').isLength({ min: 6 })
    ],
    authController.authenticate
)

router.get('/',
    auth,
    authController.authenticatedUser
)

module.exports = router