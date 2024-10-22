import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { GoogleLoginComponent } from './googleLogin';
import Navbar from './navbar';
import axios from 'axios';
import ToastNotification, { showErrorToast, showSuccessToast } from '../components/toastNotification';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = (data: any) => {
    console.log('Login success:', data);
    setIsLoggedIn(true);

    const token = data.token;
    console.log(token)
    localStorage.setItem('authToken', token);
    showSuccessToast({ message: "Logged in successfully!" })
  };

  const handleLoginFailure = () => {
    console.error('Login failed! Please try again later');
    showErrorToast({ message: "Log in failed! Please try again later" })
  };

  const handleLogout = async () => {
    try {
      await axios.post(`https://oauth2.googleapis.com/revoke?token=${localStorage.getItem('authToken')}`);
      localStorage.removeItem('authToken');
      setIsLoggedIn(false);
      showSuccessToast({ message: "Logged out successfully!" });
    } catch (error) {
      console.error('Failed to logout: ', error)
      showErrorToast({ message: "Log out failed! Please try again later." });
    }
  };

  return (
    <Router>
      <ToastNotification />
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Routes>
          <Route
            path="/login"
            element={
              <GoogleLoginComponent
                onLoginSuccess={handleLoginSuccess}
                onLoginFailure={handleLoginFailure}
              />
            }
          />
          <Route path="/" element={<h1 className="text-3xl">Welcome to Home</h1>} />
          <Route path="/games" element={<h1 className="text-3xl">Games Page</h1>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
