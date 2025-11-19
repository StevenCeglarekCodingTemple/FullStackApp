import React from 'react'
import { NavLink } from 'react-router-dom'
import './NavBar.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAuth } from '../../contexts/AuthContext';

const NavBar = () => {
    const { isAuthenticated } = useAuth();
  return (
    <header className='site-header'>
        <NavLink to='/' className='site-logo'>Fastracker</NavLink>
        {isAuthenticated ? 
        <nav className='navbar'>
            <ul>
                <li>
                    <NavLink to='/dashboard' className='nav-links'>Dashboard</NavLink>
                </li>
                <li>
                    <NavLink to='/profile' className='nav-links'><AccountCircleIcon/></NavLink>
                </li>
                <li>
                    <NavLink to='/logout' className='nav-links'>Logout</NavLink>
                </li>
            </ul>
        </nav>
        :

        <nav className='navbar'>
            <ul>
                <li>
                    <NavLink to='/' className='nav-links'>Home</NavLink>
                </li>
                <li>
                    <NavLink to='/login' className='nav-links'>Log In</NavLink>
                </li>
            </ul>
        </nav>
    }
    </header>
  )
}

export default NavBar;