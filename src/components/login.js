import React, { Component } from 'react';

import { Auth, Hub } from 'aws-amplify';

import SignIn from '../components/signIn';
import SignUp from '../components/signUp';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import '../App.css';

// async function signIn(event) {
// 	console.log(event);
// 	event.preventDefault();
//   try {
//     await Auth.signIn(this.state.email, this.state.password)
//     console.log('sign in success!')
//   } catch (err) {
//     console.log('error signing in...', err)
//   }
// }

class Login extends Component {
	constructor() {
		super();

		this.state = {
			toggleScreen: true,
			name: '',
			email: '',
			password: '',
			errorMessage: '',
			authenticated: null,
			loading: false,
			validation: {
				name: false,
				email: false,
				password: false
			}
		};
	}

	componentWillMount() {
		this.checkUser();
	}

	componentDidMount() {
		this.checkUser();
	}

	checkUser = () => {
		const checkStatus = (user) => {
			console.log('THIS IS THE USER: ', user);

			if (user) {
				this.setState({
					authenticated: true
				});
			} else {
				this.setState({
					authenticated: false
				});
			}
		};

		Auth.currentAuthenticatedUser().then((user) => checkStatus(user)).catch((err) => console.log(err));
	};

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
		} catch (err) {
			console.log('error signing in...', err);
			this.setState({
				...this.state,
				errorMessage: 'Please make sure email and password are correct.',
				loading: false
			});
		}
	};

	signUp = async () => {
		await Auth.signUp({
			username: this.state.email,
			password: this.state.password,
			attributes: {
				name: this.state.name // optional
			}
		})
			.then((data) => console.log(data))
			.catch((err) => console.log(err));
	};

	// facebookLogin = () => {
	// 	Auth.federatedSignIn({ provider: 'Facebook' });
	// };

	// googleLogin = () => {
	// 	Auth.federatedSignIn({ provider: 'Google' });
	// };

	toggleScreen = () => {
		this.setState({
			toggleScreen: !this.state.toggleScreen
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
		const signInScreen = this.state.toggleScreen;
		return (
			<div>
				{isLoggedOut ? (
					<div>
						{signInScreen ? (
							<SignIn
								facebookLogin={this.facebookLogin}
								errorMessage={this.state.errorMessage}
								signIn={this.signIn}
								updateField={this.updateField}
								validation={this.state.validation}
								loading={this.state.loading}
								toggleScreen={this.toggleScreen}
							/>
						) : (
							<SignUp
								errorMessage={this.state.errorMessage}
								signUp={this.signUp}
								updateField={this.updateField}
								validation={this.state.validation}
								loading={this.state.loading}
								toggleScreen={this.toggleScreen}
							/>
						)}
					</div>
				) : (
					<div />
				)}
			</div>
		);
	}
}

export default Login;
