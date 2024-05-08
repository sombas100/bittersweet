const express = require('express')
const router = express.Router()
const { registerUser, loginUser, logoutUser, google } = require('../controllers/authController')

router.post('/register', registerUser)

router.post('/login', loginUser)

router.get('/logout', logoutUser)

router.post('/google', google)


module.exports = router