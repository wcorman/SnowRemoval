import React, { Component } from 'react';

import { Auth } from 'aws-amplify';

import EntryPage from './entryPage';

import '../App.css';

class Entry extends Component {
	constructor() {
		super();

		this.state = {
			signInScreen: true,
			name: '',
			email: '',
			password: '',
			passwordConfirm: '',
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

		return (
			<div>
				{isLoggedOut ? (
					<EntryPage
						facebookLogin={this.facebookLogin}
						errorMessage={this.state.errorMessage}
						signIn={this.signIn}
						signUp={this.signUp}
						updateField={this.updateField}
						validation={this.state.validation}
						loading={this.state.loading}
						toggleScreen={this.toggleScreen}
						signInScreen= {this.state.signInScreen}
					/>
				) : (
					<div />
				)}
			</div>
		);
	}
}

export default Entry;
