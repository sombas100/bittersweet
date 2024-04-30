import React, { useState } from 'react'

const Register = ({ history }) => {
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
    const res = await axios.post('/api/auth/register', {
      username,
      email,
      password
    });
    if (res.data.token) {
      history.push('/dashboard');
    }
  } catch (error) {
    console.error(error.res.data)
  }}
  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input 
          type='text'
          placeholder='Username'
          name='username'
          value={username}
          onChange={handleChange}
          required
          />
        </div>
        <div>
          <input 
          type='email'
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
          name='Password'
          value={password}
          onChange={handleChange}
          required
          />
        </div>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )

}
export default Register