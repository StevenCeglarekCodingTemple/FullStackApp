import React from 'react'

const RegisterForm = () => {
  return (
    <div>
        <form action="" onSubmit={null}>
            <div className='row'>
                <div className='col-2'></div>
                <div className='col-8'>
                    <div className='row'>
                        <div className='col-12 form-group inputs mt-2'>
                            <input name='firstName' onChange={null} type="text" className='form-control' placeholder='First Name' />
                        </div>
                        <div className='col-12 form-group inputs mt-2'>
                            <input name='lastName' onChange={null} type="text" className='form-control' placeholder='Last Name' />
                        </div>
                        <div className='col-12 form-group inputs mt-2'>
                            <input name='email' onChange={null} type="text" className='form-control' placeholder='Email' />
                        </div>
                        <div className='col-12 form-group inputs mt-2'>
                            <input name='password' onChange={null} type="password" className='form-control' placeholder='Password' />
                        </div>
                        <div className='col-12 form-group inputs mt-2'>
                            <input name='DOB' onChange={null} type="date" className='form-control' />
                        </div>
                        <div className='col-12 form-group inputs mt-2'>
                            <input name='weight' onChange={null} type="number" className='form-control' placeholder='Weight in pounds' />
                        </div>
                        <div className='col-12 form-group inputs mt-2'>
                            <input name='height' onChange={null} type="number" className='form-control' placeholder='Height in inches' />
                        </div>
                        <div className='col-12 form-group inputs mt-2'>
                            <input name='goalWeight' onChange={null} type="number" className='form-control' placeholder='Weight in pounds' />
                        </div>
                        <div className='col-12 form-group inputs mt-2'>
                            <input name='sex' onChange={null} type="text" className='form-control' placeholder='Male or Female' />
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