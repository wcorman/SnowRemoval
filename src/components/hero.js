import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

import Logo from '../media/mainLogo.svg';
import Button from '@material-ui/core/Button';

import { Auth, API } from 'aws-amplify';

// function sendSms() {
// 	const order = {
// 		type: 'Priority',
// 		name: 'Wes Corman',
// 		firstName: 'Wes',
// 		price: 52,
// 		driveways: 1,
// 		date: 'March 28th, 2020',
// 		address: '1013 McPHerson Ave',
// 		phoneNumber: '+13062621013',
// 		email: 'wcorman@gmail.com'
// 	};

// 	API.post('powderHoundsAPI', '/messages', {
// 		body: order
// 	})
// }

// const getOrder = async () => {
// 	API.post('powderHoundsAPI', '/items', {
// 		body: {
// 			customerId: '123456',
// 			firstName: 'Phillip',
// 			lastName: 'Dick',
// 			orders: []
// 		}
// 	});
// };

function signOut() {
	Auth.signOut().then((data) => console.log(data)).catch((err) => console.log(err));
	window.location.reload();
}

function Hero() {
	return (
		<div>
			{/* <button onClick={() => Auth.federatedSignIn()}>Sign In</button> */}
			{/* <Button onClick={getOrder}>Send SMS</Button> */}
			{/* <button onClick={sendSms}>Send SMS</button> */}
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
