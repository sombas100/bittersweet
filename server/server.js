require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const dotenv = require('dotenv')



const app = express()
const PORT = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())

mongoose.connect('mongodb://127.0.0.1:27017/bittersweet')
.then(() => {
    console.log('MongoDB connected')
})
.catch((error) => {
    console.log(error)
})



const authRouter = require('./routes/auth')
const blogRouter = require('./routes/blog')

app.use('/api/blog', blogRouter)
app.use('/api/auth', authRouter)


app.listen(PORT,() => {console.log(`Server is listening on port ${PORT}`)})