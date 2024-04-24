import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  return (
    <nav className='nav-wrapper'>
        <div className='nav-content'>
        <ul>
            <li>
                <Link className='menu-item' to='/'>Home</Link>
            </li>
            <li>
                <Link className='menu-item' to='/login'>Login</Link>
            </li>
            <li>
                <Link className='menu-item' to='/register'>Register</Link>
            </li>
            <li>
                <Link className='menu-item' to='/dashboard'>Dashboard</Link>
            </li>
        </ul>
        </div>
    </nav>
  )
}

export default Navbar