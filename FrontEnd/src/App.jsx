import React from 'react';
import Navbar from './Component/Navbar';
import Imports from './Component/Imports';
import Loader from './Component/Loader'; 

export default function App() {
  return (
    <Loader duration={2000}>
      <>
        <Navbar />
        <Imports />
      </>
    </Loader>
  );
}