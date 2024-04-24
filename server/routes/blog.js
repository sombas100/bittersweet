const express = require('express')
const router = express.Router()

const { getAllBlogs, addBlog } = require('../controllers/blogController')

router.get('/', getAllBlogs)

router.post('/', addBlog)

module.exports = router