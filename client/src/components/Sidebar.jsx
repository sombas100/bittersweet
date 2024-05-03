import React from 'react'
import './Sidebar.css'
import '../App.css'
import { FaLongArrowAltRight } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";


const Sidebar = ({ handleLogout, authenticated }) => {
    const handleClick = async () => {
        handleLogout();
    };
  return (
    <div className='sidebar'>
        <div className='sidebar-header'>
        <h1 className='sidebar-logo'>Bitter<span className='sweet'>sweet</span></h1>
        <p className='sidebar-motto'>A place to share</p>
        </div>
        <div className='sidebar-menu'>
            <ul>
                <div className='icon-wrapper'><li><IoIosSettings /><a>Settings</a></li></div>
                <div onClick={handleClick} className='icon-wrapper'><li><FaLongArrowAltRight /><a>Logout</a></li></div>
            </ul>
        </div>
    </div>
  )
}

export default Sidebar