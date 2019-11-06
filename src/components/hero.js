import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Logo2 from '../huskyPng3.png';

function Hero() {
	return (
<Container>
    <Col xs={6} md={4}>
      <Image src={Logo2} className="husky"/>
    </Col>
</Container>
	);
}

export default Hero;
