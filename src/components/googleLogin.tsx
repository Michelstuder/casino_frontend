import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

interface GoogleLoginProps {
  onLoginSuccess: (data: any) => void;
  onLoginFailure: () => void;
}

export const GoogleLoginComponent = ({ onLoginSuccess, onLoginFailure }: GoogleLoginProps) => {
  // Handle successful login by calling the parent callback with the token
  const handleSuccess = (response: any) => {
    const token = response.credential;
    if (token) {
      onLoginSuccess(token);
    } else {
      handleFailure();
    }
  };

  // Notify parent component on login failure
  const handleFailure = () => onLoginFailure();

  return (
    <div className="flex flex-col items-center justify-center h-full p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Login with Google</h1>
      <GoogleLogin onSuccess={handleSuccess} onError={handleFailure} />
    </div>
  );
};
