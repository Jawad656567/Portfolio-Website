import './index.css';
import App from './App.jsx';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Admin from './admin/MainAdmin.jsx'; // new parent route
import Banner from './admin/Banner.jsx';

const router = createBrowserRouter([
  {
    path: '/', 
    element: <App />, // App ke andar <Outlet /> hona chahiye      
  },
  // Admin as new parent route
  {
    path: '/admin',
    element: <Admin />, // Admin me <Outlet /> lagao agar nested child routes chahiye
    children: [
      // example child routes for admin
      { path: 'banner', element: <Banner /> },
      // { path: 'users', element: <Users /> },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
