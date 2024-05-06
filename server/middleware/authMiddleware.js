const jwt = require('jsonwebtoken');
require('dotenv').config()

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No access' });
    }

    // Extract the token part
    const token = authHeader.split(' ')[1];

    try {
       const decoded = jwt.verify(token, process.env.JWT_SECRET);
       if (!decoded || !decoded.user || !decoded.user.id) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
       req.user = decoded.user;
       next();
    } catch (error) {
        console.error('Error in authMiddleware:', error);
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

module.exports = authMiddleware;