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
			Auth.currentAuthenticatedUser({ bypassCache: true })
				.then((user) => checkStatus(user))
				.catch((err) => noUser(err));
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
				name: true,
				email: true,
				password: true,
				passwordConfirm: true
			}
		};
	}

	signIn = async (guest) => {
		try {
			this.setState({
				...this.state,
				loading: true
			});
			guest
				? await Auth.signIn('powderhoundscontact@gmail.com', 'Wu9hgQzwWA4anKf1wn58huMZqGdz1bjmWQ6y3QNfoj8')
				: await Auth.signIn(this.state.email, this.state.password);
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
				'custom:firstName': firstName,
				'custom:lastName': lastName,
				'custom:rewardStatus': '0',
				'custom:totalSpent': '0',
				'custom:numberOfOrders': '0'
			}
		})
			.then((data) => {
				console.log('SIGNUP DATA: ', data);

				this.toggleScreen();
			})
			.catch((err) => console.log(err));
	};

	toggleScreen = () => {
		this.setState({
			signInScreen: !this.state.signInScreen,
			errorMessage: ''
		});
	};

	signUpSubmit = () => {
		return this.validation() ? this.signUp() : null;
	};

	validation = () => {
		const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
		const nameRegex = /^[a-zA-Z0-9]+[\s][a-zA-Z0-9]+/;
		const passwordRegex = /^(?=[a-z0-9!@#$%^&*()+=?]*[A-Z])(?=[A-Z0-9!@#$%^&*()+=?]*[a-z])[A-Za-z0-9!@#$%^&*(,8)+=?]{8,}$/;

		let emailTest = emailRegex.test(this.state.email);
		let nameTest = nameRegex.test(this.state.name);
		let passwordTest = passwordRegex.test(this.state.password);
		let passwordConfirmTest = this.state.password === this.state.passwordConfirm;

		this.setState({
			...this.state,
			validation: {
				email: emailTest,
				name: nameTest,
				password: passwordTest,
				passwordConfirm: passwordConfirmTest
			}
		});

		const formValid = emailTest && nameTest && passwordTest && passwordConfirmTest;

		return formValid;
	};

	updateField = (input) => {
		console.log(input);

		const field = input.id;

		this.setState({
			...this.state,
			[field]: input.value
		});
	};

	render() {
		return (
			<EntryPage
				className="vhTest"
				facebookLogin={this.facebookLogin}
				errorMessage={this.state.errorMessage}
				signIn={this.signIn}
				signUp={this.signUp}
				signUpSubmit={this.signUpSubmit}
				values={this.state}
				updateField={this.updateField}
				validation={this.state.validation}
				loading={this.state.loading}
				toggleScreen={this.toggleScreen}
				signInScreen={this.state.signInScreen}
			/>
		);
	}
}

export default Entry;
