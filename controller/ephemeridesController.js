const mongoose = require('mongoose')
const Ephemerides = require('../models/Ephemerides')
const { validationResult, buildCheckFunction } = require('express-validator')
const { format } = require('date-fns')


exports.createEphemeride = (req, res) => {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const data = new Ephemerides(req.body)


    data.save(err => {
        if (err) {
            res.status(500).json({ msg: 'Hubo un error al crear la efemeride' })
        }
        res.status(200).json({ msg: 'Efemeride Enviada' })
    })
}


exports.getAllEphemerides = (req, res) => {

    Ephemerides.find()
        .then(response => {
            const result = response.filter(data => format(new Date(data.date), 'MM') === req.query.date)
            result.sort((a, b) => {
                if (format(new Date(a.date), 'dd') === format(new Date(b.date), 'dd')) {
                    return format(new Date(a.date), 'yyyy') - format(new Date(b.date), 'yyyy')
                }
                return format(new Date(a.date), 'dd') - format(new Date(b.date), 'dd')
            })
            res.json(result)

        }).catch(error => {
            console.log(error)
            res.status(500).json({ msg: 'Hubo un error en el servidor' })
        })
}

exports.getOneEphemeride = (req, res) => {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ msg: 'Valor no valido' })
    }

    Ephemerides.findById(req.params.id)
        .then(response => res.status(200).json(response))
        .catch(error => {
            console.log(error)
            res.status(500).json({ msg: 'Hubo un error en el servidor' })
        })
}


exports.editEphemeride = (req, res) => {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ msg: 'Valor no valido' })
    }

    Ephemerides.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(() => res.json({ msg: 'Efemeride Actualizada' }))
        .catch(error => {
            console.log(error)
            res.status(500).json({ msg: 'Hubo un error en el servidor' })
        })
}


exports.deleteEphemeride = (req, res) => {
    console.log(req.params.id)
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ msg: 'Valor no valido' })
    }

    Ephemerides.findByIdAndDelete(req.params.id)
        .then(() => res.json({ msg: 'Efemeride eliminada' }))
        .catch(error => {
            console.log(error)
            res.status(500).json({ msg: 'Hubo un error en el servidor' })
        })
}
