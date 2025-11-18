import React from 'react'
import { NavLink } from 'react-router-dom'

const LoginForm = () => {
  return (
    <div>
        <form action="" onSubmit={null}>
            <div className='row'>
                <div className='col-3'></div>
                <div className='col-6 form-group mt-4'>
                    <input type="text" name='email' placeholder='Email...' className='form-control' />
                </div>
            </div>
            <div className='row'>
            <div className='col-3'></div>
                <div className='col-6 form-group mt-4'>
                    <input type="password" name='password' placeholder='Password...' className='form-control' />
                </div>
            </div>
            <div className='row'>
            <div className='col-3'></div>
                <div className='col-6 form-group mt-4 d-flex justify-content-center mb-4'>
                    <button className='btn btn-primary login-button'>Login</button>
                </div>
            </div>
        </form>
    </div>
  )
}

export default LoginForm