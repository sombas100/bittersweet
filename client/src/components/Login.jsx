import React from 'react'
import axios from 'axios'
import { useState } from 'react'

const Login = ({ history}) => {
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
  const res = await axios.post('/aoi/auth/login', {
    email,
    password,
  });
  if (res.data.token) {
    history.push('/dashboard');
  }
} catch (error) {
  console.error(error.res.data)
}

  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input 
          type='text'
          placeholder='Email'
          name='email'
          value={email}
          onChange={handleChange}
          required
          />
        </div>
        <div>
          <input 
          type='password'
          placeholder='Password'
          name='password'
          value={password}
          onChange={handleChange}
          required
          />
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default Login