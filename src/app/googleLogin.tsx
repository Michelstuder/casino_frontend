import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

interface GoogleLoginProps {
  onLoginSuccess: (data: any) => void;
  onLoginFailure: () => void;
}

export const GoogleLoginComponent = ({
  onLoginSuccess,
  onLoginFailure
}: GoogleLoginProps) => {
  const handleSuccess = async (response: any) => {
    const token = response.credential;
    try {
      // Send the token to your backend
      const res = await axios.post('/api/auth/google', { token });
      console.log('Logged in:', res.data);
      onLoginSuccess(res.data); // Call the success handler with the response data
    } catch (error) {
      console.error('Login failed:', error);
      onLoginFailure();
    }
  };

  const handleFailure = () => {
    console.error('Login failed! Please try again later');
    onLoginFailure();
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Login with Google
      </h1>
      <GoogleLogin onSuccess={handleSuccess} onError={handleFailure} />
    </div>
  );
};
