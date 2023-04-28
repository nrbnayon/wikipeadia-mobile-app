import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import SearchProvider from './context/SearchProvider';
import NotificationProvider from './context/NotificationProvider';

const rootElement = document.getElementById('root');
const app = (
  <BrowserRouter>
  <NotificationProvider>
  <SearchProvider>
    <App />
  </SearchProvider>
  </NotificationProvider>
  </BrowserRouter>
);

const root = ReactDOM.createRoot(rootElement);
root.render(app);

reportWebVitals();
