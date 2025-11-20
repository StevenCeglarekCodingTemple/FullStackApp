import React, { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext';
import './LogMealsForm.css'

const LogMealsForm = () => {
    const [mealCategory, setMealCategory] = useState('');
    const [isMealCatSelected, setIsMealCatSelected] = useState(false);
    const [foodItems, setFoodItems] = useState([])
    const { token } = useAuth();

    const handleMealCategory = (e) => {
        setMealCategory(e.target.value);
        setIsMealCatSelected(true);
    }

    useEffect(() => {
        const logMeal = async () => {
            const response = await fetch('http://localhost:5002/meals', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({
                    meal_category: mealCategory
                })
            })

            const mealData = await response.json();
            console.log(mealData);
        }

        if (isMealCatSelected) {
            logMeal();
        }
    }, [isMealCatSelected])

    useEffect(() => {
        const getAllFoodItems = async () => {
            const response = await fetch('http://localhost:5002/food_items', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            })

            const foodItems = await response.json();
            setFoodItems(foodItems)
            // setFoodItems(foodItems)
        }

        if (isMealCatSelected) {
            getAllFoodItems();
        }
    }, [isMealCatSelected])

    return (
        <div className='mealsForm'>
            <div className='row'>
                <div className='col-3'></div>
                <div className='col-4'>
                    
                    <select onChange={handleMealCategory} disabled={isMealCatSelected} className='form-control' name="selectMealCategory" id="">
                        <option value="">Select Meal Category</option>
                        <option value="breakfast">Breakfast</option>
                        <option value="lunch">Lunch</option>
                        <option value="dinner">Dinner</option>
                        <option value="snack">Snack</option>
                    </select>

                </div>
            </div>

            <form action="" onSubmit={null}>
                <div className='row'>
                    <div className='col-3'></div>
                    <div className='col-6 form-group mt-4'>
                        {/* {errors && <span className='text-danger'>{errors}</span>} */}
                        <select  disabled={!isMealCatSelected} className='form-control' name="selectFoodItem" id="">
                            <option value="">Select Food Item</option>
                            {foodItems.map((foodItem, idx) => (
                                <option key={idx} value='{foodItem.id}'>{foodItem.name} - Calories: {foodItem.calories}</option>
                            ))}
                           
                        </select>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-3'></div>
                    <div className='col-6 form-group mt-4'>
                        <p>Total Calories: 0</p>
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

export default LogMealsForm