import React from 'react'
import './SideBarMenu.css'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

const SideBarMenu = () => {
    const { user } = useAuth();
  return (
    <div className='sideBarMenu d-flex flex-column'>
        <div className='m-3 welcome text-center'>
            <h3 style={{color: '#33658A'}}>Welcome {user.first_name}</h3>
        </div>
        <div className='m-3'>
            <NavLink className='sidebar-nav-links' to='/logWorkout'>Log Workout</NavLink>
        </div>
        <div className='m-3'>
            <NavLink className='sidebar-nav-links' to='/logMeals'>Log Meals</NavLink>
        </div>
        <div className='m-3'>
            <NavLink className='sidebar-nav-links' to='/profile'>Profile</NavLink>
        </div>
    </div>
  )
}

export default SideBarMenu