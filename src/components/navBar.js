import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import Button from '@material-ui/core/Button';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import { lightBlue } from '@material-ui/core/colors';
import { Auth } from 'aws-amplify';

function signOut() {
	Auth.signOut().then((data) => console.log(data)).catch((err) => console.log(err));
	window.location.reload();
}

const SettingsButton = withStyles((theme) => ({
	root: {
		color: theme.palette.getContrastText(lightBlue[600]),
		backgroundColor: lightBlue[400],
		'&:hover': {
			backgroundColor: lightBlue[700]
		}
	}
}))(Button);

function NavBar() {
	return (
		<div className="container">
			<Button className="signOutBbutton" variant="contained" color="secondary" onClick={signOut}>
				Sign Out
			</Button>

			{/* <Switch>
				<Route path="/profile">
					<Link to="/" style={{ color: 'white' }}>
						<SettingsButton className="settingsBbutton" variant="contained" color="secondary">
							Home
						</SettingsButton>
					</Link>{' '}
				</Route>

				<Route path="*">
					<Link to="/profile" style={{ color: 'white' }}>
						<SettingsButton className="settingsBbutton" variant="contained" color="secondary">
							Settings
						</SettingsButton>
					</Link>
				</Route>
			</Switch> */}
		</div>
	);
}

export default NavBar;
