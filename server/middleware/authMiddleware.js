const jwt = require('jsonwebtoken');
require('dotenv').config()

const authMiddleware = (req, res, next) => {
    const token = req.session.token;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
       const decoded = jwt.verify(token, process.env.JWT_SECRET);
       req.user = decoded.user;
       next();
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

module.exports = authMiddleware;