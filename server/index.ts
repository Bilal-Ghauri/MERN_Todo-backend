import express , {Application } from 'express'
require('dotenv').config()

const app : Application = express()
const loginRoute = require('./routes/Login')
const todoRoute = require('./routes/TodoRoute')
const cors = require('cors')

require('./db/db')

app.use(cors())
app.use(express.json())

app.use('/user' , loginRoute)
app.use('/todo' , todoRoute)


app.listen(5000, ()=> {
    console.log(`app is connected on ${5000}`)
})


