import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

import Logo from '../media/mainLogo.svg';

// import Hub
import { Auth } from 'aws-amplify';

function checkUser() {
	Auth.currentAuthenticatedUser().then((user) => console.log({ user })).catch((err) => console.log(err));
}

function signOut() {
	Auth.signOut().then((data) => console.log(data)).catch((err) => console.log(err));
	window.location.reload();
}

function makeOrder() {
	Auth.currentSession().then((data) => console.log('DATA: ', data)).catch((err) => console.log(err));

	Auth.currentAuthenticatedUser({ bypassCache: true })
		.then((user) => {
			console.log('USER: ', user);
			let rewardStatus = parseInt(user.attributes['custom:rewardStatus'], 10);
			let numberOfOrders = parseInt(user.attributes['custom:numberOfOrders'], 10);
			console.log('rewardStatus: ', rewardStatus);
			console.log('Number of Orders: ', numberOfOrders);

			if (rewardStatus < 3) {
				return Auth.updateUserAttributes(user, {
					'custom:rewardStatus': (rewardStatus + 1).toString(),
					'custom:numberOfOrders': (numberOfOrders + 1).toString()
				});
			} else {
				return Auth.updateUserAttributes(user, {
					'custom:rewardStatus': '0',
					'custom:numberOfOrders': (numberOfOrders + 1).toString()
				});
			}
		})
		.then((data) => console.log(data))
		.catch((err) => console.log(err));
}

function Hero() {
	return (
		<div>
			<button onClick={() => Auth.federatedSignIn()}>Sign In</button>
			<button onClick={checkUser}>Check User</button>
			<button onClick={signOut}>Sign Out</button>
			<button onClick={makeOrder}>Make Order</button>

			<img src={Logo} alt="" className="husky" />
		</div>
	);
}

export default Hero;
