import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../App.css';

const NavBar = () => {
  return (
    <Navbar data-test="navbar" id="navbar-container" expand="lg">
      <Navbar.Brand className="navbar-brand" as={Link} to="/home">My Crochet Corner</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link className="navbar-links" as={Link} to="/home">Home</Nav.Link>
            <Nav.Link className="navbar-links" as={Link} to="/favorites">Favorites</Nav.Link>
            <Nav.Link className="navbar-links" as={Link} to="/profile">Profile</Nav.Link>
          </Nav>
        </Navbar.Collapse>
    </Navbar>
  )
}

export default NavBar;