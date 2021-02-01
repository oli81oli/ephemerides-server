const User = require('../models/User')
const { validationResult } = require('express-validator')
const bcryptjs = require('bcryptjs')


exports.createUser = (req, res) => {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { nickName, password } = req.body

    User.findOne({ nickName }, (err, foundUser) => {

        if (err) {
            res.status(500).json({ message: "Username check error" });
            return
        }

        if (foundUser) {
            res.status(400).json({ msg: 'usuario ya existe' })
            return
        }

        const salt = bcryptjs.genSaltSync(10)
        const hasPass = bcryptjs.hashSync(password, salt)

        let user = new User(req.body)
        user.password = hasPass

        if (nickName === 'Oliver' || nickName === 'Miguel' || nickName === 'Rodrigo') {
            user.role = 'admin'
        }

        user.save(err => {
            if (err) {
                res.status(500).json({ msg: 'Hubo un error al guardar el ususario' })
                return
            }
            res.status(200).json({ msg: 'Usuario creado correctamente' })

        })
    })
}