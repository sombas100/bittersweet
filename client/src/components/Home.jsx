import { useState, useEffect } from 'react'
import axios from 'axios'
import BlogPostForm from './BlogPostForm'


const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [showNewPostForm, setNewPostForm] = useState(false)

  const fetchBlogs = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/blog');
      setBlogs(res.data)
    } catch (error) {
      console.error('There was an error fetching the blogs:', error)
    }
  }

  useEffect(() => {
    fetchBlogs()
  },[])

  const handleCreatePost = () => {
    setNewPostForm(true);
  }
  
  const handleCloseForm = () => {
    setNewPostForm(false);
  }

  
  return (
    <div>
      <h2>Blog Posts</h2>
      <button onClick={handleCreatePost}>Create Post</button>
      {showNewPostForm && (
        <BlogPostForm onClose={handleCloseForm} /> 
      )}
      <ul>
  {blogs.map(blog => (
    <li key={blog._id}>
      <h3>{blog.title}</h3>
      <p>{blog.content}</p>
      <p>Author: {blog.author.username}</p>
    </li>
  ))}
</ul>
    </div>
  )
}

export default Home