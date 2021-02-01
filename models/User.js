const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({

    nickName: {
        type: String,
        require: true,
        trim: true
    },
    password: {
        type: String,
        require: true,
        trim: true
    },
    role: {
        type: String,
        default: 'user',
        require: true
    }
})

module.exports = mongoose.model('User', UserSchema)