import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Amplify from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';
import awsconfig from './aws-exports'; // if you are using Amplify CLI

import Jumbotron from './components/hero';
import Entry from './components/entry';
import Main from './components/main';
import ContactSection from './components/contactSection';
import Footer from './components/footer';

Amplify.configure(awsconfig);

function App() {
	return (
		<div className="App">
			<Jumbotron />
			<Main />
			<hr />
			<ContactSection />
			<Footer />
		</div>
	);
}

export default withAuthenticator(App, false, [ <Entry /> ]);
