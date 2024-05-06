import React from 'react'
import axios from 'axios'
import { useState, } from 'react'
import { useNavigate } from 'react-router-dom'
import '../App.css'
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom'

const Login = ({ setAuthenticated }) => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault();
try {
  const res = await axios.post('http://localhost:3000/api/auth/login', {
    email,
    password,
  });
  if (res.data.token) {
    sessionStorage.setItem('token', res.data.token)
    axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
    setAuthenticated(true)
    navigate('/');
  }
} catch (error) {
  console.error('Login failed:', error.message)
}
}


  return (
    <div className="login-container">
      <h1 className='login-logo'>Bitter<span className='sweet'>sweet</span></h1>
      <p className='motto'>A place to share</p>
      <div className="login-header">
        <h2>Sign in</h2>
        <p>New to Bittersweet?<Link style={{ textDecoration: 'none'}} 
        to='/register'><span className="shortcut">Create an account here.</span>
        </Link></p>
      </div>
      <div className="login-actions">
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-input">
            
            <input
              type="text"
              placeholder="Email"
              name="email"
              value={email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-input">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={handleChange}
              required
            />
          </div>
          <Button type='submit' size='small' variant="contained">Log In</Button>
          <footer><span className='copyright'>© bittersweet 2024</span></footer>
        </form>
      </div>
    </div>
  );
};

export default Login;