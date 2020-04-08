import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { withAuthenticator } from 'aws-amplify-react';
import awsconfig from './aws-exports'; // if you are using Amplify CLI

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import NavBar from './components/navBar';
import Entry from './components/entry';
import Main from './components/main';
import ContactSection from './components/contactSection';
import Info from './components/info';
import Footer from './components/footer';
import FAQ from './components/faq';
import PrivacyPolicy from './components/privacyPolicy';
import Settings from './components/settings';
import Logo from './media/mainLogo.svg';
import { makeStyles } from '@material-ui/core/styles';

// Amplify.configure(awsconfig);

const useStyles = makeStyles((theme) => ({
	root: {
		height: '100vh'
	},
	image: {
		backgroundRepeat: 'no-repeat',
		borderRadius: '0 36px 0 0'
		// borderStyle: 'solid'
	},
	paper: {
		margin: theme.spacing(8, 4),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	avatar: {
		borderStyle: 'solid',
		borderColor: 'black',
		margin: '0 auto',
		marginTop: '50px',
		width: theme.spacing(7),
		height: theme.spacing(7),
		backgroundColor: theme.palette.primary.main
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1)
	},
	submit: {
		margin: theme.spacing(3, 0, 2)
	}
}));

function App() {
	const classes = useStyles();

	return (
		<Router>
			<div className="App">
				<NavBar />
				<Switch>
					<Route path="/faq">
						<FAQ />
					</Route>
					<Route path="/policy">
						<PrivacyPolicy />
					</Route>
					{/* <Route path="/profile">
						<Settings classes={classes} />
					</Route> */}

					<Route path="/">
						<img src={Logo} alt="Powder Hounds Canada" className="husky" />
						<Main />
						<hr />
						<Info />

						<ContactSection />
					</Route>
				</Switch>
				<Footer />
			</div>
		</Router>
	);
}

export default withAuthenticator(App, false, [ <Entry /> ]);
