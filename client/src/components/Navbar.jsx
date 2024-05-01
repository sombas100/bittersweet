import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
import LogoutButton from './LogoutButton'

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
            {authenticated && isAdmin && (
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
        <div>
            
        </div>
    </nav>
  )
}

export default Navbar