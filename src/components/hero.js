import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

import Logo from '../media/mainLogo.svg'


function Hero() {
	return (
		<div>
			<img src={Logo} alt="" className="husky"/>
		</div>
	);
}

export default Hero;
