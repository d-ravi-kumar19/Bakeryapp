import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './components/AuthContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <App/>
  <React.StrictMode>
  <AuthProvider> {/* Wrap your entire app with AuthProvider */}
    <App />
  </AuthProvider>
</React.StrictMode>,
    
);

// reportWebVitals();
