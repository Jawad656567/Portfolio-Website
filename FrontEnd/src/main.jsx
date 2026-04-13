import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { ThemeProvider } from "./context/themeContext"; // ✅ ADD THIS

import App from './App.jsx';
import AllActivity from './Pages/AllActivity.jsx';
import Contact from './Pages/Contact.jsx';
import Login from './Component/Login.jsx';

import ProtectedRoute from './admin/ProtectedRoute.jsx';
import Admin from './admin/MainAdmin.jsx';
import Banner from './admin/Banner.jsx';
import About from './admin/about.jsx';
import ProfileInfo from './admin/ProfileInfo.jsx';
import Featured from './admin/Featured.jsx';
import Projects from './admin/Projects.jsx';
import Experience from './admin/Experience.jsx';
import Skill from './admin/Skill.jsx';
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

  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        <Admin />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Banner /> }, // ✅ fixed dashboard issue
      { path: 'banner', element: <Banner /> },
      { path: 'about', element: <About /> },
      { path: 'profile', element: <ProfileInfo /> },
      { path: 'featured', element: <Featured /> },
      { path: 'projects', element: <Projects /> },
      { path: 'education', element: <Education /> },
      { path: 'experience', element: <Experience /> },
      { path: 'skill', element: <Skill /> },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>   {/* ✅ GLOBAL WRAPPER */}
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);