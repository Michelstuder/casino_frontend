import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { GoogleLoginComponent } from '../components/googleLogin';
import Navbar from '../components/navbar';
import { feedbackToast } from '../components/toastNotification';
import Games from './games';
import Roulette from '../components/roulette';
import Home from './home';
import axios from 'axios';
import getJwtTokenPayload from '../utils/decodeToken';
import { Toaster } from 'react-hot-toast';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
      fetchBalance();
    }
  }, []);

  const handleLoginSuccess = async (token: string) => {
    localStorage.setItem('authToken', token);
    const jwtToken = getJwtTokenPayload();

    if (!jwtToken) {
      console.error('Failed to decode JWT token');
      feedbackToast({ message: 'Failed to log in. Try again later.', variant: 'error' });
      return;
    }

    const userProperties = {
      moneyAmount: 0,
      email: jwtToken.email || '',
      name: jwtToken.name || '',
    };

    try {
      await axios.post('http://localhost:8081/api/users', userProperties, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsLoggedIn(true);
      feedbackToast({ message: 'Logged in successfully!', variant: 'success' });
      fetchBalance();
    } catch (error) {
      console.error('Error during user creation:', error);
      feedbackToast({ message: 'Failed to create user. Try again later.', variant: 'error' });
    }
  };

  const handleLoginFailure = () => {
    feedbackToast({ message: 'Log in failed! Please try again later', variant: 'error' });
  };

  const handleLogout = async () => {
    try {
      localStorage.removeItem('authToken');
      setIsLoggedIn(false);
      setBalance(0);
      feedbackToast({ message: 'Logged out successfully!', variant: 'success' });
    } catch (error) {
      console.error('Failed to logout:', error);
      feedbackToast({ message: 'Log out failed! Please try again later.', variant: 'error' });
    }
  };

  const fetchBalance = async () => {
    const token = localStorage.getItem('authToken');
    const jwtToken = getJwtTokenPayload();

    if (!token || !jwtToken?.email) {
      console.error('Unable to fetch balance without valid token or email');
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:8081/api/users/${jwtToken.email}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBalance(response.data.moneyAmount);
    } catch (error) {
      console.error('Failed to fetch balance:', error);
    }
  };

  const updateBalance = (newBalance: number) => setBalance(newBalance);

  return (
    <Router>
      <Toaster />
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} balance={balance} />
      <div className='min-h-screen bg-gray-100 flex items-center justify-center'>
        <Routes>
          <Route
            path='/login'
            element={
              isLoggedIn ? (
                <Navigate to='/' />
              ) : (
                <GoogleLoginComponent onLoginSuccess={handleLoginSuccess} onLoginFailure={handleLoginFailure} />
              )
            }
          />
          <Route
            path='/'
            element={
              isLoggedIn ? (
                <Home updateBalance={updateBalance} />
              ) : (
                <Navigate to='/login' />
              )
            }
          />
          <Route
            path='/games'
            element={isLoggedIn ? <Games /> : <Navigate to='/login' />}
          />
          <Route path='/roulette' element={<Roulette updateBalance={updateBalance} currentBalance={balance} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
