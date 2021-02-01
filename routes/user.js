const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')
const { check } = require('express-validator')


router.post('/',

    [
        check('nickName', 'Credenciales incorrectas').not().isEmpty(),
        check('password', 'Credenciales incorrectas').isLength({ min: 6 })
    ],
    userController.createUser
)

module.exports = router

