import './index.css';
import App from './App.jsx';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Admin from './admin/MainAdmin.jsx'; // new parent route
import Banner from './admin/Banner.jsx';
import AllActivity from './Component/AllActivity.jsx';

const router = createBrowserRouter([
  {
    path: '/', 
    element: <App />,   
  },
  // Admin as new parent route
   {
    path: '/activity',
    element: <AllActivity />,
  },
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
