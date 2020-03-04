import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

import Logo from '../media/mainLogo.svg';
import Button from '@material-ui/core/Button';

import { Auth } from 'aws-amplify';

// function checkUser() {
// 	Auth.currentAuthenticatedUser().then((user) => console.log({ user })).catch((err) => console.log(err));
// }

function signOut() {
	Auth.signOut().then((data) => console.log(data)).catch((err) => console.log(err));
	window.location.reload();
}

function Hero() {
	return (
		<div>
			{/* <button onClick={() => Auth.federatedSignIn()}>Sign In</button>
			<button onClick={checkUser}>Check User</button>
			<button onClick={makeOrder}>Make Order</button> */}
			<div className="container">
				<Button className="signOutBbutton" variant="contained" color="secondary" onClick={signOut}>
					Sign Out
				</Button>
			</div>
			<img src={Logo} alt="" className="husky" />
		</div>
	);
}

export default Hero;
