import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Image from 'react-bootstrap/Image';
import Logo from '../navLogo.svg';

function NavBar() {
  return (
  <Navbar bg="light" variant="light" style={{backgroundColor: '#e3f2fd'}}>
    <Image src={Logo} className="huskyNav"/>
    <Nav className="mr-auto">
      <Nav.Link href="#pricing">Pricing</Nav.Link>
      <Nav.Link href="#contact">Contact</Nav.Link>
    </Nav>

  </Navbar>
  );
}

export default NavBar;
