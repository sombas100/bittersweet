import React from 'react'
import axios from 'axios'
import { redirect } from 'react-router-dom'

const LogoutButton = ({ setAuthenticated, handleLogout }) => {
    

    const handleClick = async () => {
        handleLogout();
    };
  return (
    <div>
        <button onClick={handleClick}>Logout</button>
    </div>
  )
}

export default LogoutButton