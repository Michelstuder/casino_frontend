import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { GoogleLoginComponent } from './googleLogin';
import Navbar from './navbar';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = (data: any) => {
    console.log('Login success:', data);
    setIsLoggedIn(true); // Update state to logged in
  };

  const handleLoginFailure = () => {
    console.error('Login failed! Please try again later');
  };

  const handleLogout = () => {
    setIsLoggedIn(false); // Update state to logged out
  };

  return (
    <Router>
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
          <Route
            path="/"
            element={<h1 className="text-3xl">Welcome to Home</h1>}
          />
          <Route
            path="/games"
            element={<h1 className="text-3xl">Games Page</h1>}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
