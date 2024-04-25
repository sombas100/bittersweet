const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const registerUser = async (req, res) => {
    const { username, email, password } = req.body

    try {
        let user = await User.findOne({ username, email, });

        if(user) {
            return res.status(400).json({ message: 'User already exists' })
        }

        user = new User({
            username,
            email,
            password,
        })

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt)

        await user.save()


    } catch (error) {
        console.error(error.message)
        res.status(500).json({ message: 'Internal Server Error'})
    }
}

const loginUser = async (req, res) => {
    const { username, email, password} = req.body

    try {
        let user = await User.findOne({ email })
        if(!user) {
            return res.status(400).json({ message: 'Invalid Credentials '})
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid Credentials'})
        }
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ message: 'Internal Server Error'})
    }
}


const logoutUser = async (req, res) => {

}

module.exports = {
    registerUser, loginUser, logoutUser
}

