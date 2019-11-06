import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

function NavBar() {
  return (
  <Navbar bg="light" variant="light">
    <Navbar.Brand href="#home">Powder Hounds</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="#services">Services</Nav.Link>
      <Nav.Link href="#pricing">Pricing</Nav.Link>
    </Nav>

  </Navbar>
  );
}

export default NavBar;
