import React from 'react'
import SideBarMenu from '../../components/SidebarMenu/SideBarMenu'
import { useAuth } from '../../contexts/AuthContext'
import LogWorkoutForm from '../../components/LogWorkoutForm/LogWorkoutForm';

const Dashboard = () => {
    const { isAuthenticated } = useAuth();
  return (
    <div>
        {isAuthenticated ?
            <div className='container-fluid d-flex flex-row'>
                <div>
                    <SideBarMenu />
                </div>
                <div style={{width: '600px'}}>
                    <LogWorkoutForm />
                </div>
            </div> 
        :
        <h1 className='text-danger'>Please login to view this page</h1>   
    }
        
    </div>
  )
}

export default Dashboard    