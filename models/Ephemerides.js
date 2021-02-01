const mongoose = require('mongoose')

const EphemeridesSchema = mongoose.Schema({

    artist: {
        type: String,
        require: true,
        trim: true
    },
    description: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        // require: true,
        default: Date.now()
    }
})

module.exports = mongoose.model('Ephemeride', EphemeridesSchema)