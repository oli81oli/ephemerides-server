const mongoose = require('mongoose')
require('dotenv').config({ path: 'var.env' })

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })
        console.log('DB Connected')
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}


module.exports = connectDB