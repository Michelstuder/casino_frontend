import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { GoogleLoginComponent } from './googleLogin';

const App = () => {
  const handleLoginSuccess = (data: any) => {
    // Handle successful login (e.g., redirect or store user data)
    console.log('Login success:', data);
  };

  const handleLoginFailure = () => {
    // Handle login failure (e.g., show a message)
    console.error('Login failed! Please try again later');
  };

  return (
    <Router>
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
        </Routes>
      </div>
    </Router>
  );
};

export default App;
