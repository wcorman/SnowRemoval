import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Logo from '../media/entryImage.png';

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

import { Auth } from 'aws-amplify';

import SignIn from './signIn';
import SignUp from './signUp';

const useStyles = makeStyles((theme) => ({
	root: {
		height: '100vh'
	},
	image: {
		backgroundImage: 'url(https://source.unsplash.com/r53rNKb_7s8/1600x900)',
		backgroundRepeat: 'no-repeat',
		backgroundColor: theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		position: 'relative'
	},
	paper: {
		margin: theme.spacing(8, 4),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	avatar: {
		margin: theme.spacing(1),
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

const popover = (
	<Popover id="popover-basic">
		<Popover.Title as="h3">Available for work 🚀</Popover.Title>
		<Popover.Content>If you need a hand with your project, I would love to discuss it further.</Popover.Content>
	</Popover>
);

const copyright = () => {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{/* {'Copyright © '} */}
			{'Developed by '}
			<OverlayTrigger key="top" placement="bottom" overlay={popover}>
				<Link style={{textDecoration: 'underline'}} color="inherit" href="https://www.linkedin.com/in/wes-corman/" target="_blank">
					Wes Corman
				</Link>
			</OverlayTrigger>

			{''}
			{/* {new Date().getFullYear()}
			{'.'} */}
		</Typography>
	);
};

const facebookLogin = () => {
	Auth.federatedSignIn({ provider: 'Facebook' });
};

export default function EntryPage(props) {
	const classes = useStyles();

	return (
		<Grid container component="main" className={classes.root}>
			<CssBaseline />

			<Grid item xs={false} sm={4} md={7} className={classes.image}>
				<img src={Logo} alt="" className="husky entryImage" />

				{/* <div className="entryImageText">
					Powder Hounds <br />
					Residential Snow Clearing
				</div> */}
			</Grid>
			{props.signInScreen ? (
				<SignIn
					updateField={props.updateField}
					toggle={props.toggleScreen}
					copyright={copyright}
					signIn={props.signIn}
					errorMessage={props.errorMessage}
					loading={props.loading}
					facebookSignIn={facebookLogin}
				/>
			) : (
				<SignUp
					values={props.values}
					signUp={props.signUp}
					signUpSubmit={props.signUpSubmit}
					updateField={props.updateField}
					toggle={props.toggleScreen}
					copyright={copyright}
					validation={props.validation}
				/>
			)}
		</Grid>
	);
}
