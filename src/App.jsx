import React from 'react';
import { Outlet } from 'react-router-dom';
import ProfileHeader from './Component/ProfileHeader';
import Navbar from './Component/Navbar';
// import ProfileInfo from './Component/ProfileInfo'

export default function App() {
  return (
    <>
      <Navbar />
      <ProfileHeader />
      {/* yaha child routes render honge */}
      <Outlet />
      {/* <ProfileInfo /> */}
    </>
  );
}
