import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import { NameProvider } from './contexts/NameContext.jsx'; // Import the NameProvider

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <NameProvider>
        <App />
      </NameProvider>
    </BrowserRouter>
  </React.StrictMode>
);
