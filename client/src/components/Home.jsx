import { useState, useEffect } from 'react'
import axios from 'axios'

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/blogs');
      setBlogs(res.data)
    } catch (error) {
      console.error('There was an error fetching the blogs:', error)
    }
  }

  useEffect(() => {
    fetchBlogs
  },[])

  
  return (
    <div>
      <h2>Blog Posts</h2>
      <ul>
        {blogs.map(blog => {
          <li key={blog._id}>
            <h3>{blog.title}</h3>
            <p>{blog.content}</p>
            <p>Author: {blog.author.username}</p>
          </li>
        })}
      </ul>
    </div>
  )
}

export default Home