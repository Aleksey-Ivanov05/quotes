import React from 'react';
import {NavLink} from "react-router-dom";

const Navbar = () => {
  return (
      <div className="border-bottom border-2 border-dark">
        <div className="d-flex justify-content-between mt-3 mb-4 container">
          <h4>Quotes Central</h4>
          <div className="d-flex">
            <NavLink to="/" className="me-4">Quotes</NavLink>
            <NavLink to="/add-quote">Submit new quote</NavLink>
          </div>
        </div>
      </div>
  );
};

export default Navbar;