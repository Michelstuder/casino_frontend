import React from 'react';
import { createRoot } from 'react-dom/client';
import './app/global.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './app/app';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

if (!clientId) {
  throw new Error(
    'Missing Google Client ID! Please check your environment variables.'
  );
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);
