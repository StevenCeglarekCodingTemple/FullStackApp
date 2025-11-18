import React from 'react'
import { NavLink } from 'react-router-dom'
import './NavBar.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const NavBar = () => {
  return (
    <header className='site-header'>
        <NavLink to='/' className='site-logo'>Fastracker</NavLink>
        <nav className='navbar'>
            <ul>
                <li>
                    <NavLink to='/' className='nav-links'>Home</NavLink>
                </li>
                <li>
                    <NavLink to='/log-in' className='nav-links'>Log In</NavLink>
                </li>
            </ul>
        </nav>
    </header>
  )
}

export default NavBar;