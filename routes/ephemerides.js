const express = require('express')
const router = express.Router()
const ephemeridesController = require('../controller/ephemeridesController')
const { check } = require('express-validator')


const auth = require('../middleware/auth')


router.post('/',
    auth,
    [
        check('artist', 'El nombre del artista es obligatorio').not().isEmpty(),
        check('description', 'La descripcion es obligatoria').not().isEmpty(),
        check('date', 'La fecha es obligatoria').not().isEmpty()
    ],
    ephemeridesController.createEphemeride
)


router.get('/',
    ephemeridesController.getAllEphemerides
)

router.get('/:id',
    auth,
    ephemeridesController.getOneEphemeride
)

router.put('/:id',
    auth,
    [
        check('artist', 'El nombre del artista es obligatorio').not().isEmpty(),
        check('description', 'La descripcion es obligatoria').not().isEmpty(),
        check('date', 'La fecha es obligatoria').not().isEmpty()
    ],
    ephemeridesController.editEphemeride
)

router.delete('/:id',
    auth,
    ephemeridesController.deleteEphemeride
)

module.exports = router