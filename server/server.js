const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')


const app = express()
const PORT = 3000

app.use(express.json())
app.use(cors())

mongoose.connect('mongodb://127.0.0.1:27017/bittersweet')
.then(() => {
    console.log('MongoDB connected')
})
.catch((error) => {
    console.log(error)
})

app.listen(PORT,() => {console.log(`Server is listening on port ${PORT}`)})