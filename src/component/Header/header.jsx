import React, { useState, useEffect } from 'react'
import { NavLink } from "react-router-dom";
import "./header.css";

const Header = () => {

  const [search, setSearch] = useState("");
  const [time, setTime] = useState(new Date());

  // Real Time Clock
  useEffect(() => {

    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);

  }, []);

  return (
    <nav className="navbar">

      {/* Logo */}
      <div className="logo">
        <NavLink to="/">MyWebsite</NavLink>
      </div>


      {/* Navigation Links */}
      <div className="nav-links">

        <NavLink to="/">
          Home
        </NavLink>

        {/* <NavLink to="/register">
          Register
        </NavLink>

        <NavLink to="/about">
          About
        </NavLink>

        <NavLink to="/contact">
          Contact
        </NavLink> */}
       <NavLink to="/tools">
           Tools
       </NavLink>
      </div>


      {/* Search Box */}
      {/* <div className="search-box">

        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div> */}


      {/* Real Time Clock */}
      {/* <div className="clock">

        🕐 {time.toLocaleTimeString()}

      </div> */}


      {/* Login Button */}
      <div className="nav-button">
        <NavLink to="/login">
          Login
        </NavLink>
      </div>

    </nav>
  );
};

export default Header;