import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './views/HomePage/HomePage';
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import LoginPage from './views/LoginPage/LoginPage';
import RegisterPage from './views/RegisterPage/RegisterPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './views/Dashboard/Dashboard';

function App() {

  return (
    <div className='new-container'>
      
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  )
}

export default App
