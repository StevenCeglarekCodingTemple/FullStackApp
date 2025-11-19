import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext' 

const LoginForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const { login } = useAuth();
    const [errors, setErrors] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({...prevData, [name]: value}));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await login(formData);
        if (response) {
            setErrors(response);
            setFormData({
                email: '',
                password: ''
            })
        } else {
            navigate('/dashboard')
        }
        
    }

  return (
    <div>
        <form action="" onSubmit={handleSubmit}>
            <div className='row'>
                <div className='col-3'></div>
                <div className='col-6 form-group mt-4'>
                    {errors && <span className='text-danger'>{errors}</span>}
                    <input type="text" onChange={handleChange} name='email' placeholder='Email...' className='form-control' value={formData.email} />
                </div>
            </div>
            <div className='row'>
            <div className='col-3'></div>
                <div className='col-6 form-group mt-4'>
                    <input type="password" onChange={handleChange} name='password' placeholder='Password...' className='form-control' value={formData.password} />
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