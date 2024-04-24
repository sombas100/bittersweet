const Blog = require('../models/Blog')

const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().populate('author', 'username -_id')
        res.json(blogs)
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const addBlog = async (req, res) => {
    const { title, content } = req.body;
    const author = req.user.id;

    try {
        const newBlog = new Blog({
            title,
            content,
            author,
        });

        await newBlog.save()

        res.json(newBlog);
    } catch (error) {
        console.error(error.message)
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = {
    getAllBlogs,
    addBlog
}