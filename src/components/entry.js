import React, { Component } from 'react';

import { Auth } from 'aws-amplify';

import EntryPage from './entryPage';

import '../App.css';

class Entry extends Component {
	constructor() {
		super();

		function checkUser() {
			const checkStatus = (user) => {
				console.log('THIS IS THE USER: ', user);

				return true;
			};
			const noUser = (error) => {
				console.log('ERROR: ', error);
				return false;
			};
			Auth.currentAuthenticatedUser({ bypassCache: true }).then((user) => checkStatus(user)).catch((err) => noUser(err));
			// Auth.currentAuthenticatedUser().then((user) => checkStatus(user)).catch((err) => console.log(err));
		}

		this.state = {
			signInScreen: true,
			name: '',
			email: '',
			password: '',
			passwordConfirm: '',
			errorMessage: '',
			authenticated: checkUser(),
			loading: false,
			validation: {
				name: false,
				email: false,
				password: false
			}
		};

		// async function checkUser() {
		// 	console.log('Will/Did Mount...');

		// 	const checkStatus = (user) => {
		// 		console.log('THIS IS THE USER: ', user);

		// 		if (user) {
		// 			this.setState({
		// 				authenticated: true
		// 			});
		// 		} else {
		// 			this.setState({
		// 				authenticated: false
		// 			});
		// 		}
		// 	};
		// 	Auth.currentAuthenticatedUser().then((user) => checkStatus(user)).catch((err) => console.log(err));
		// 	// Auth.currentAuthenticatedUser().then((user) => checkStatus(user)).catch((err) => console.log(err));
		// }
	}

	// componentWillMount() {
	// this.checkUser();
	// }

	// componentDidMount() {
	// 	this.checkUser();
	// }

	signIn = async () => {
		try {
			this.setState({
				...this.state,
				loading: true
			});
			await Auth.signIn(this.state.email, this.state.password);
			console.log('sign in success!');
			this.setState({
				...this.state,
				errorMessage: '',
				authenticated: true,
				loading: false
			});
			window.location.reload();
		} catch (err) {
			console.log('error signing in...', err.message);
			this.setState({
				...this.state,
				errorMessage: err.message,
				loading: false
			});
		}
	};

	signUp = async () => {
		let fullName = this.state.name;
		const regex = /(\w.+\s).+/i;
		const test = regex.test(fullName);
		let firstName;
		let lastName;
		if (test) {
			let nameArray = fullName.split(/(\s+)/).filter(function(e) {
				return e.trim().length > 0;
			});
			console.log(nameArray);
			firstName = nameArray[0];
			lastName = nameArray.slice(-1)[0];
		}

		await Auth.signUp({
			username: this.state.email,
			password: this.state.password,
			attributes: {
				name: this.state.name,
				'custom:firstName':  firstName,
				'custom:lastName':  lastName,
				'custom:rewardStatus':  '0',
				'custom:totalSpent':  '0',
				'custom:numberOfOrders':  '0',
			}
		})
			.then((data) => {
				console.log(data);
			})
			.catch((err) => console.log(err));
	};

	toggleScreen = () => {
		this.setState({
			signInScreen: !this.state.signInScreen,
			errorMessage: ''
		});
	};

	updateField = (input) => {
		console.log(input.value);

		const field = input.id;

		this.setState({
			...this.state,
			[field]: input.value
		});

		if (field === 'name') {
			if (input.value.length > 1) {
				this.setState({
					validation: {
						...this.state,
						name: true
					}
				});
			} else if (input.value.length < 2) {
				this.setState({
					...this.state,
					validation: {
						...this.state,
						name: false
					}
				});
			}
		} else {
			if (field === 'message' && input.value.length > 10) {
				this.setState({
					validation: {
						...this.state,
						message: true
					}
				});
			} else if (field === 'message' && input.value.length < 11) {
				this.setState({
					...this.state,
					validation: {
						...this.state,
						message: false
					}
				});
			}
		}
	};

	render() {
		const isLoggedOut = !this.state.authenticated;
		const checkUser = () => {
			Auth.currentAuthenticatedUser({ bypassCache: true }).then((user) => console.log({ user })).catch((err) => console.log(err));
		};

		const signOut = () => {
			Auth.signOut().then((data) => console.log(data)).catch((err) => console.log(err));
			window.location.reload();
		};
		return (
			<div>
				<button onClick={() => Auth.federatedSignIn()}>Sign In</button>
				<button onClick={checkUser}>Check User</button>
				<button onClick={signOut}>Sign Out</button>

				<EntryPage
					facebookLogin={this.facebookLogin}
					errorMessage={this.state.errorMessage}
					signIn={this.signIn}
					signUp={this.signUp}
					updateField={this.updateField}
					validation={this.state.validation}
					loading={this.state.loading}
					toggleScreen={this.toggleScreen}
					signInScreen={this.state.signInScreen}
				/>
			</div>
		);
	}
}

export default Entry;
