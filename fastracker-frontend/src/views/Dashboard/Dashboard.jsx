import React from 'react'
import SideBarMenu from '../../components/SidebarMenu/SideBarMenu'
import { useAuth } from '../../contexts/AuthContext'
import LogWorkoutForm from '../../components/LogWorkoutForm/LogWorkoutForm';

const Dashboard = () => {
    const { isAuthenticated } = useAuth();
  return (
    <div>
        {isAuthenticated ?
                <div>
                    <div>
                        <h1>Stats of Food</h1>

                    </div>

                    <div>
                        <h1>Stats of Workouts</h1>

                    </div>

                    <div>
                        <h1>Food Items</h1>

                    </div>
                </div>
            :
         <h1 className='text-danger'>Please login to view this page</h1>   
        }
        
    </div>
  )
}

export default Dashboard    