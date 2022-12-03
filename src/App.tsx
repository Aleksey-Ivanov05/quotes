import React from 'react';
import {Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Quotes from "./containers/Quotes/Quotes";



function App() {
  return (
    <>
      <Navbar/>
      <div className="container">
        <Routes>
          <Route path="/" element={(
            <Quotes/>
          )}/>
          <Route path="/quotes/:category" element={(
            <Quotes/>
          )}/>
        </Routes>
      </div>
    </>

  );
}

export default App;
