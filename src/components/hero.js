import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

import Logo from '../media/mainLogo.svg';
import Button from '@material-ui/core/Button';

import { withStyles } from '@material-ui/core/styles';
import { lightBlue } from '@material-ui/core/colors';

import { Auth, API } from 'aws-amplify';

const SettingsButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(lightBlue[600]),
    backgroundColor: lightBlue[500],
    '&:hover': {
      backgroundColor: lightBlue[700],
    },
  },
}))(Button);

function signOut() {
	Auth.signOut().then((data) => console.log(data)).catch((err) => console.log(err));
	window.location.reload();
}

function Hero() {
	return (
		<div>
			{/* <button onClick={() => Auth.federatedSignIn()}>Sign In</button> */}
			{/* <Button onClick={getOrder}>Send SMS</Button> */}
			{/* <button onClick={sendSms}>Send SMS</button> */}
			<div className="container">
				<Button className="signOutBbutton" variant="contained" color="secondary" onClick={signOut}>
					Sign Out
				</Button>
				<SettingsButton className="settingsBbutton" variant="contained" color="secondary">
					Settings
				</SettingsButton>
			</div>
			<img src={Logo} alt="" className="husky" />
		</div>
	);
}

export default Hero;
