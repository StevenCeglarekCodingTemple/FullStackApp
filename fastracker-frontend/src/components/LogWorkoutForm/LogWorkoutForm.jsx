import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';


const LogWorkoutForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        duration: '',
        workout_type: '',
        calories_burned: 0
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const navigate = useNavigate();
    const { token } = useAuth();

    useEffect(() => {
        const logWorkout = async () => {
            const response = await fetch('http://localhost:5002/workout_sessions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(formData)
            })

            const workoutData = await response.json();
            console.log(workoutData)

        }

        logWorkout();
    }, [isSubmitted])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({...prevData, [name]: value}));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        navigate('/dashboard')
    }

  return (
    <div>
        <form action="" onSubmit={handleSubmit}>
            <div className='row'>
                <div className='col-3'></div>
                <div className='col-6 form-group mt-4'>
                    {/* {errors && <span className='text-danger'>{errors}</span>} */}
                    <input type="text" onChange={handleChange} name='name' placeholder='Name of Workout...' className='form-control' value={formData.name} />
                </div>
            </div>
            <div className='row'>
                <div className='col-3'></div>
                    <div className='col-6 form-group mt-4'>
                        <input type="time" onChange={handleChange} step="60" name='duration' placeholder='Duration...' className='form-control' value={formData.duration} />
                    </div>
            </div>
            <div className='row'>
                <div className='col-3'></div>
                    <div className='col-6 form-group mt-4'>
                        <input type="text" onChange={handleChange} name='workout_type' placeholder='Workout Type...' className='form-control' value={formData.workout_type} />
                    </div>
            </div>
            <div className='row'>
                <div className='col-3'></div>
                    <div className='col-6 form-group mt-4'>
                        <input type="number" onChange={handleChange} name='calories_burned' placeholder='Calories Burned...' className='form-control' value={formData.calories_burned} />
                    </div>
            </div>
            <div className='row'>
            <div className='col-3'></div>
                <div className='col-6 form-group mt-4 d-flex justify-content-center mb-4'>
                    <button className='btn btn-primary login-button'>Log Workout</button>
                </div>
            </div>
        </form>
    </div>
  )
}

export default LogWorkoutForm