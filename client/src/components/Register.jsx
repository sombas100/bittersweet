import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button';

const Register = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    email: '', 
    password: '',
  });

const { username, email, password } = formData;

const handleChange = e => {
  setFormData({ ...formData, [e.target.name]: e.target.value })
}

const handleSubmit = async e => {
  e.preventDefault();
  try {
    const res = await axios.post('http://localhost:3000/api/auth/register', {
      username,
      email,
      password
    });
    if (res.data.token) {
      navigate('/');
    }
    console.log(res)
  } catch (error) {
    console.error('Error during registration', error.response.data)
  }}
  return (
    <div className="login-container">
      <h1 className='login-logo'>Bitter<span className='sweet'>sweet</span></h1>
      <p className='motto'>A place to share</p>
      <div className="login-header">
        <h2>Create Account</h2>
        <p>Already have an account?<Link style={{ textDecoration: 'none'}} 
        to='/login'><span className="shortcut">Sign in here.</span>
        </Link></p>
      </div>
      <div className="login-actions">
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-input">
            <input
              type="username"
              placeholder="Username"
              name="username"
              value={username}
              onChange={handleChange}
              required
            />
          </div>
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
          <Button type='submit' size='small' variant="contained">Register</Button>
          <footer><span className='copyright'>© bittersweet 2024</span></footer>
        </form>
      </div>
    </div>
  )
}
export default Register