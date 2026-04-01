import './index.css';
import App from './App.jsx';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import ProtectedRoute from './admin/ProtectedRoute.jsx';
import AllActivity from './Component/AllActivity.jsx';
import Contact from './Component/Contact.jsx';
import Login from './Component/Login.jsx';

import Admin from './admin/MainAdmin.jsx'; // new parent route
import Banner from './admin/Banner.jsx';
import About from './admin/about.jsx';
import ProfileInfo from './admin/ProfileInfo.jsx';
import Featured from './admin/Featured.jsx';
import Dashboard from "./admin/Banner.jsx";
import Projects from './admin/Projects.jsx';
import Experience from './admin/Experience.jsx';
import Skill from './admin/Skill.jsx';
import Contacts from './admin/Contacts.jsx';
import Education from './admin/Education.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },

  {
    path: '/activity',
    element: <AllActivity />,
  },
  {
    path: '/contact',
    element: <Contact />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  // Admin as new parent route
  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        <Admin />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'banner', element: <Banner /> },
      { path: 'about', element: <About /> },
      { path: 'profile', element: <ProfileInfo /> },
      { path: 'featured', element: <Featured /> },
      { path: 'projects', element: <Projects /> },
       { path: 'education', element: <Education /> },
      { path: 'experience', element: <Experience /> },
      { path: 'skill', element: <Skill /> },
      { path: 'contact', element: <Contacts /> },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
