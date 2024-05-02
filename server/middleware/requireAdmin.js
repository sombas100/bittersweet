const jwt = require('jsonwebtoken');
require('dotenv').config()

const requireAdmin = (req, res, next) => {
    const token = req.header('Authorization')

    if (!token) {
        return res.status(401).json({ message: 'Authorization token is missing' })
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        if (!decodedToken.isAdmin) {
            return res.status(403).json({ message: 'Admin access is required' })
        }

        next()
    } catch (error) {
        console.error(error)
        res.status(401).json({ message: 'Invalid authorization token' })
    }
}

module.exports = {
    requireAdmin
}