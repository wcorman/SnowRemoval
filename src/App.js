import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';
import { withAuthenticator, Authenticator } from 'aws-amplify-react';
import { Auth } from 'aws-amplify';
import awsconfig from './aws-exports'; // if you are using Amplify CLI

import Jumbotron from './components/hero';
import Entry from './components/entry';
import Pricing from './components/pricing';
import ContactSection from './components/contactSection';
import Footer from './components/footer';

Amplify.configure(awsconfig);

const signUpConfig = {
	header: 'My Customized Sign Up',
	hideAllDefaults: true,
	defaultCountryCode: '1',
	signUpFields: [
		{
			label: 'My custom email label',
			key: 'phone',
			required: true,
			displayOrder: 1,
			type: 'phone'
		}
	]
};

function App(props) {
	return (
		<div className="App">
			<Jumbotron />
			<Pricing />
			<hr />
			<ContactSection />
			<Footer />
		</div>
	);
}

export default withAuthenticator(App, false, [ <Entry /> ]);
