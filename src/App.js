import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react';
import { Auth } from 'aws-amplify';

import Jumbotron from './components/hero';
import Entry from './components/entry';
import Pricing from './components/pricing';
import ContactSection from './components/contactSection';
import Footer from './components/footer';

Amplify.configure(aws_exports);

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
			<Entry />
			<Jumbotron />
			<Pricing />
			<hr />
			<ContactSection />
			<Footer />
		</div>
	);
}

export default App;
