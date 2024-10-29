import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { GoogleLoginComponent } from './googleLogin';
import Navbar from './navbar';
import ToastNotification, {
  showErrorToast,
  showSuccessToast,
} from '../components/toastNotification';
import Games from './games';
import Roulette from './roulette';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) setIsLoggedIn(true);
  }, []);

  const handleLoginSuccess = (token: string) => {
    localStorage.setItem('authToken', token);
    setIsLoggedIn(true);
    showSuccessToast({ message: 'Logged in successfully!' });
  };

  const handleLoginFailure = () => {
    console.error('Login failed! Please try again later');
    showErrorToast({ message: 'Log in failed! Please try again later' });
  };

  const handleLogout = async () => {
    try {
      localStorage.removeItem('authToken');
      setIsLoggedIn(false);
      showSuccessToast({ message: 'Logged out successfully!' });
    } catch (error) {
      console.error('Failed to logout:', error);
      showErrorToast({ message: 'Log out failed! Please try again later.' });
    }
  };

  return (
    <Router>
      <ToastNotification />
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <div className='min-h-screen bg-gray-100 flex items-center justify-center'>
        <Routes>
          <Route
            path='/login'
            element={
              isLoggedIn ? (
                <Navigate to='/' />
              ) : (
                <GoogleLoginComponent
                  onLoginSuccess={handleLoginSuccess}
                  onLoginFailure={handleLoginFailure}
                />
              )
            }
          />
          <Route
            path='/'
            element={<h1 className='text-3xl'>Welcome to Home</h1>}
          />
          <Route
            path='/games'
            element={
              isLoggedIn ? (
                <Games />
              ) : (
                <Navigate to='/login' />
              )
            }
          />
          <Route
            path='/roulette'
            element={<Roulette />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
