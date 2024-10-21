import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav>
      {/* creates links to the main pages */}
        <h1>NavBar</h1>
        <Link to="/">Home</Link>
        <Link to="/favorites">Favorites</Link>
        <Link to="/profile">Profile</Link>
    </nav>

  )
}

export default NavBar;