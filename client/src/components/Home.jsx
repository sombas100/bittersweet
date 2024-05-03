import { useState, useEffect } from 'react'
import axios from 'axios'
import Sidebar from './Sidebar';
import { redirect } from 'react-router-dom'


const Home = ({ authenticated, setAuthenticated, }) => {
  const [blogs, setBlogs] = useState([]);
  

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

  const handleLogout = async () => {
    try {
        await axios.get('http://localhost:3000/api/auth/logout');
        setAuthenticated(false)
        redirect('/login')
    } catch (error) {
        console.error('Logut failed:', error)
    }
};

  
  return (
    <div className='layout-container'>
    <div className='post-container'>
      <div onClick={handleLogout}>
        {authenticated && <Sidebar />}
      </div>
      <h1>Stay up to date</h1>
      <div className='post-wrapper'>
      <ul className='post-item'>
  {blogs.map(blog => (
    <li key={blog._id}>
      <h3>{blog.title}</h3>
      <p>{blog.content}</p>
      <p>Author: {blog.author.username}</p>
    </li>
  ))}
</ul>
</div>
    </div>
    </div>
  )
}

export default Home