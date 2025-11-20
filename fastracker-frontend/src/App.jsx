import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './views/HomePage/HomePage';
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import LoginPage from './views/LoginPage/LoginPage';
import RegisterPage from './views/RegisterPage/RegisterPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './views/Dashboard/Dashboard';
import { useAuth } from './contexts/AuthContext';
import SideBarMenu from './components/SidebarMenu/SideBarMenu';
import LogWorkoutView from './views/LogWorkoutPage/LogWorkoutView';
import LogMealsView from './views/LogMealsPage/LogMealsView';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <div className='new-container'>
      
      <BrowserRouter>
        <NavBar />
        <div className={isAuthenticated ? 'd-flex flex-row' : ''}>
          <div className='col-3'>
            {isAuthenticated ? 
              <div style={{width: '350px'}}>
                <SideBarMenu /> 
              </div>
            : 
              ''}
          </div>
          <div className='col-9 main-content'>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/register' element={<RegisterPage />} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/logWorkout' element={<LogWorkoutView />} />
              <Route path='/logMeals' element={<LogMealsView />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
      <Footer />
    </div>
  )
}

export default App
