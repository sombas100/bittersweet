import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
import LogoutButton from './LogoutButton'
import { Button } from '@mui/material'

const Navbar = ({ authenticated, handleLogout, isAdmin }) => {
  return (
    <nav className='nav-wrapper'>
        <div className='nav-content'>
        <ul>
            <li>
                <Link className='menu-item' to='/'>Home</Link>
            </li> 
                {!authenticated && (
                <>
                <li><Link className='menu-item' to='/login'>Login</Link></li>
                <li><Link className='menu-item' to='/register'>Register</Link></li>
                </>
            )}
            {authenticated || isAdmin && (
                <>
                    <li>
                        <LogoutButton handleLogout={handleLogout}/>
                    </li>
             <li>
                <Link className='menu-item' to='/dashboard'>Dashboard</Link>
            </li>
                </>
            )}
            </ul>
        </div>
        <div className='create-post-btn'>
            <Link to='/uploads/new'>
            <Button variant='outlined'>Create Post</Button>
            </Link>
        </div>
    </nav>
  )
}

export default Navbar