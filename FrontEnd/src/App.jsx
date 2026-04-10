import React from "react";
import { ThemeProvider } from "./context/themeContext"; // Step 1
import Navbar from "./Component/Navbar";
import Imports from "./Component/Imports";
import Loader from "./Component/Loader";

export default function App() {
  return (
    <ThemeProvider>
      <Loader duration={2000}>
        <>
          <Navbar />
          <Imports />
        </>
      </Loader>
    </ThemeProvider>
  );
}