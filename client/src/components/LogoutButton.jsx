import React from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const LogoutButton = () => {
    const history = useHistory();

    const handleLogout = async () => {
        try {
            await axios.get('/api/auth/logout');
            history.push('/login')
        } catch (error) {
            console.error(error)
        }
    };
  return (
    <div>
        <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default LogoutButton