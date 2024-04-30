const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware')
const { getAllBlogs, addBlog } = require('../controllers/blogController')

router.get('/', getAllBlogs)

router.post('/',authMiddleware, addBlog)

module.exports = router