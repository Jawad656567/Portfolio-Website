import './index.css';
import App from './App.jsx';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Component/Home.jsx';
import About from './Component/About.jsx';
import Contact from './Component/Contact.jsx';
import Skill from './Component/Skill.jsx';
import Project from './Component/Project.jsx';
import Admin from './admin/MainAdmin.jsx'; // new parent route
import Banner from './admin/Banner.jsx';

const router = createBrowserRouter([
  {
    path: '/', 
    element: <App />, // App ke andar <Outlet /> hona chahiye      
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'skills',
        element: <Skill />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'projects',
        element: <Project />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
    ],
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
