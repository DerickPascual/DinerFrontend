import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Home from './pages/Home/Home';
import StartSessionPage from './pages/StartSessionPage/StartSessionPage';
import SwipeSessionPage from './pages/SwipeSessionPage/SwipeSessionPage';
import PrivacyPolicyTOS from './pages/PrivacyPolicyTOS/PrivacyPolicyTOS';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'home',
        element: <Home />
      },
      {
        path: 'start-session',
        element: <StartSessionPage />
      },
      {
        path: 'swipe-session',
        element: <SwipeSessionPage />
      },
      {
        path: 'privacy-policy-and-tos',
        element: <PrivacyPolicyTOS />
      }
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
