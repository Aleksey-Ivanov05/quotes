import React from 'react';
import {Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Quotes from "./containers/Quotes/Quotes";
import NewQuote from "./containers/NewQuote/NewQuote";
import EditQuote from "./containers/EditQuote/EditQuote";

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
          <Route path="/add-quote" element={(
            <NewQuote/>
          )}/>
          <Route path="/quotes/:id/edit" element={(
            <EditQuote/>
          )}/>
        </Routes>
      </div>
    </>

  );
}

export default App;
