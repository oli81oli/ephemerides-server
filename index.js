const express = require('express')
const connectDB = require('./config/db')
const cors=require('cors')


const app = express()

connectDB()

app.use(cors())


app.use(express.json({ extends: true }))

const port = process.env.PORT || 4000

app.use('/api/user', require('./routes/user'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/ephemerides', require('./routes/ephemerides'))


app.listen(port, '0.0.0.0', () => {
    console.log(`El servidor esta en el puerto ${port}`)

})