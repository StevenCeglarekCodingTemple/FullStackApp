import React from 'react'
import { NavLink } from 'react-router-dom'
import LoginForm from '../../components/LoginForm/LoginForm'
import './LoginPage.css'

const LoginPage = () => {
  return (
    <div className='container-fluid d-flex justify-content-center'>
        <div className='login-page'>
            <LoginForm />
            <div className='row'>
                <div className='col-3'></div>
                <div className='col-6 form-group d-flex flex-column align-items-center mb-2'>
                    <p>Don't have an account. Sign up Now!</p>
                    <NavLink to='/register' className='sign-up-link'>Sign Up</NavLink>
                </div>
            </div>
        </div>
    </div>
  )
}

export default LoginPage