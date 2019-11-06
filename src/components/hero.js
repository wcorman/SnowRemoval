import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import Image from 'react-bootstrap/Image';
import Logo2 from '../huskyLogo.png';

function Hero() {
	return (
      <Image src={Logo2} className="husky"/>
	);
}

export default Hero;
