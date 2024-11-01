import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

interface GoogleLoginProps {
  onLoginSuccess: (data: any) => void;
  onLoginFailure: () => void;
}

export const GoogleLoginComponent = ({
  onLoginSuccess,
  onLoginFailure,
}: GoogleLoginProps) => {
  const handleSuccess = async (response: any) => {
    const token = response.credential;
    console.log('Google Login Token:', token);

    try {
      onLoginSuccess(token);
    } catch (error) {
      console.error('Login failed:', error);
      onLoginFailure();
    }
  };

  const handleFailure = () => {
    onLoginFailure();
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Login with Google</h1>
      <GoogleLogin onSuccess={handleSuccess} onError={handleFailure} />
    </div>
  );
};
