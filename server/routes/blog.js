const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware')
const { getAllBlogs, addBlog } = require('../controllers/blogController')

router.get('/', getAllBlogs)

router.post('/uploads/new',authMiddleware, addBlog)

module.exports = router