import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { withAuthenticator } from 'aws-amplify-react';
import awsconfig from './aws-exports'; // if you are using Amplify CLI

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import NavBar from './components/navBar';
import Entry from './components/entry';
import Main from './components/main';
import ContactSection from './components/contactSection';
import Footer from './components/footer';
import Logo from './media/mainLogo.svg';

// Amplify.configure(awsconfig);

function App() {
	return (
		<Router>
			<div className="App">
				<NavBar />
				<Switch>
					<Route path="/">
						<img src={Logo} alt="Powder Hounds Canada" className="husky" />
						<Main />
						<hr />
						<ContactSection />
					</Route>
				</Switch>
				<Footer />
			</div>
		</Router>
	);
}

export default withAuthenticator(App, false, [ <Entry /> ]);
