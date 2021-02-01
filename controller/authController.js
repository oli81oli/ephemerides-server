const User = require('../models/User')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config({ path: 'var.env' })
const { validationResult } = require('express-validator')




exports.authenticate = (req, res) => {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { nickName, password } = req.body

    User.findOne({ nickName }, (err, findUser) => {

        if (err) {
            res.status(500).json({ msg: "Username check error" });
            return
        }

        if (!findUser) {
            res.status(400).json({ msg: 'usuario no existe' })
            return
        }

        bcryptjs.compare(password, findUser.password)
            .then(response => {
                if (response) {

                    const payload = {
                        user: {
                            id: findUser._id
                        }
                    }

                    jwt.sign(payload, process.env.SECRET, {
                        expiresIn: "1h"
                    }, (error, token) => {
                        if (error) throw error
                        res.json({ token })
                    })
                } else {

                    res.status(400).json({ msg: 'Credenciales incorrectas' })
                }
            })
            .catch(error => console.log(error))
    })
}


exports.authenticatedUser = (req, res) => {



    User.findById(req.user.id).select('-password')

        .then(response => res.json(response))
        .catch(err => res.status(500).json({ msg: 'Hubo un error, token' }))

}
