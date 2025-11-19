import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        DOB: '',
        is_paid: 'Y',
        weight: 0,
        height: 0,
        goal_weight: 0,
        sex: ''
    })
    const [errors, setErrors] = useState({})
    const navigate = useNavigate();
    const { registerUser } = useAuth();

    const validateField = (name, value) => {
        const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        // const today = new Date();
        // today.setHours(0, 0, 0, 0); // Reset time for accurate date comparison
        const minDate = new Date('1900-01-01');
        const maxDate = new Date('2025-12-31');

        let parsedDate = null;
        let newValue = '';
        let result = false;

        switch (name) {
            case 'email':
                return emailPattern.test(value) ? '' : 'Invalid Email Format';
            case 'first_name':
                return value.length > 0 ? '': 'Must include first name';
            case 'last_name':
                return value.length > 0 ? '': 'Must include last name';
            case 'password':
                return value.length >= 8 ? '' : 'Password must be at least 8 characters long';
            case 'DOB':
                parsedDate = new Date(value);
                if (parsedDate < minDate || parsedDate > maxDate) {
                    return "Date is outside the allowed range.";
                }
                return;
            case 'weight':
                return value > 0 ? '' : 'Weight must be greater than 0'
            case 'height':
                return value > 0 ? '' : 'Height must be greater than 0'
            case 'sex':
                newValue = value.toLowerCase();
                result = (newValue === 'male' || newValue === 'female')
                return result ? '' : 'Must be either Male or Female'
            default:
                return '';
        }
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prevData => ({...prevData, [name]: value}))

        const error = validateField(name, value);
        setErrors(prevData => ({...prevData, [name]: error}))

    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        await registerUser(formData);
        setFormData({
            first_name: '',
            last_name: '',
            email: '',
            DOB: '',
            is_paid: 'Y',
            weight: 0,
            height: 0,
            goal_weight: 0,
            sex: ''
        })
        navigate('/login');
    }

  return (
    <div>
        <form action="" onSubmit={handleSubmit}>
            <div className='row'>
                <div className='col-2'></div>
                <div className='col-8'>
                    <div className='row'>
                        <div className='col-12 form-group inputs mt-2'>
                            <input name='first_name' onChange={handleChange} type="text" className='form-control' placeholder='First Name' value={formData.first_name} />
                            {errors.first_name && <span className='text-danger'>{errors.first_name}</span>}
                        </div>
                        <div className='col-12 form-group inputs mt-2'>
                            <input name='last_name' onChange={handleChange} type="text" className='form-control' placeholder='Last Name' value={formData.last_name} />
                            {errors.last_name && <span className='text-danger'>{errors.last_name}</span>}
                        </div>
                        <div className='col-12 form-group inputs mt-2'>
                            <input name='email' onChange={handleChange} type="text" className='form-control' placeholder='Email' value={formData.email} />
                            {errors.email && <span className='text-danger'>{errors.email}</span>}
                        </div>
                        <div className='col-12 form-group inputs mt-2'>
                            <input name='password' onChange={handleChange} type="password" className='form-control' placeholder='Password' value={formData.password} />
                            {errors.password && <span className='text-danger'>{errors.password}</span>}
                        </div>
                        <div className='col-12 form-group inputs mt-2'>
                            <input name='DOB' onChange={handleChange} type="date" className='form-control' value={formData.DOB}/>
                            {errors.DOB && <span className='text-danger'>{errors.DOB}</span>}
                        </div>
                        <div className='col-12 form-group inputs mt-2'>
                            <input name='weight' onChange={handleChange} type="number" className='form-control' placeholder='Weight in pounds' value={formData.weight} />
                            {errors.weight && <span className='text-danger'>{errors.weight}</span>}
                        </div>
                        <div className='col-12 form-group inputs mt-2'>
                            <input name='height' onChange={handleChange} type="number" className='form-control' placeholder='Height in inches' value={formData.height} />
                            {errors.height && <span className='text-danger'>{errors.height}</span>}
                        </div>
                        <div className='col-12 form-group inputs mt-2'>
                            <input name='goal_weight' onChange={handleChange} type="number" className='form-control' placeholder='Weight in pounds (Optional)' value={formData.goal_weight}/>
                        </div>
                        <div className='col-12 form-group inputs mt-2'>
                            <input name='sex' onChange={handleChange} type="text" className='form-control' placeholder='Male or Female' value={formData.sex}/>
                            {errors.sex && <span className='text-danger'>{errors.sex}</span>}
                        </div>
                        <div className='col-12 form-group inputs mt-2'>
                            <button type='submit' className='btn btn-danger'>Register</button>
                        </div>
                    </div>

                </div>
            </div>
        </form>
    </div>
  )
}

export default RegisterForm