import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { Auth, Hub } from 'aws-amplify';

import { FacebookLoginButton } from 'react-social-login-buttons';
import { GoogleLoginButton } from 'react-social-login-buttons';

function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{'Copyright © '}
			<Link color="inherit" href="https://www.powderhoundscanada.com/">
				Anicca Development
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

function checkUser() {
	Auth.currentAuthenticatedUser().then((user) => console.log({ user })).catch((err) => console.log(err));
}

function signOut() {
	Auth.signOut().then((data) => console.log(data)).catch((err) => console.log(err));
}

const useStyles = makeStyles((theme) => ({
	root: {
		height: '100vh'
	},
	image: {
		backgroundImage: 'url(https://source.unsplash.com/collection/446755/1600x900)',
		backgroundRepeat: 'no-repeat',
		backgroundColor: theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
		backgroundSize: 'cover',
		backgroundPosition: 'center'
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

export default function SignIn(props) {
	const classes = useStyles();

	return (
		<Grid container component="main" className={classes.root}>
			<CssBaseline />
			<Grid item xs={false} sm={4} md={7} className={classes.image} />
			<Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>{/* <LockOutlinedIcon /> */}</Avatar>
					<Typography component="h1" variant="h5">
						Sign in
					</Typography>
					{/* <button onClick={() => Auth.federatedSignIn()}>Sign In</button>
					<button onClick={checkUser}>Check User</button>
					<button onClick={signOut}>Sign Out</button> */}

					<form className={classes.form} noValidate>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
							autoFocus
							onChange={(value) => props.updateField(value.currentTarget)}
						/>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
							onChange={(value) => props.updateField(value.currentTarget)}
						/>
						<p style={{ color: 'red' }}>{props.errorMessage}</p>
						<FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
						<div>
							<LinearProgress hidden={!props.loading} />
						</div>
						<Button
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
							onClick={() => props.signIn()}
						>
							Sign In
						</Button>
						<Grid container>
							<Grid item xs>
								<Link
									href="https://powderhoundscustomers-test.auth.us-west-2.amazoncognito.com/forgotPassword?redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F&response_type=code&client_id=5f50njakuhd7g95sca83vm365d&identity_provider=COGNITO&scopes=phone%2Cemail%2Copenid%2Cprofile%2Caws.cognito.signin.user.admin&state=kolh8YFhXaCeRA4cBHNtHVk2REqaRxDi&code_challenge=nS7SYi0flCUqBs_5sjO7AZCmituYXYEMsqwsLf2AdOI&code_challenge_method=S256"
									variant="body2"
                  target="_blank"
								>
									Forgot password?
								</Link>
							</Grid>
							<Grid item>
								<Link href="#" variant="body2" onClick={() => props.toggleScreen()}>
									{"Don't have an account? Sign Up"}
								</Link>
							</Grid>
						</Grid>
						<hr style={{ marginTop: '24px' }} />

						<div className="socialButtons">
							<FacebookLoginButton
								style={{ height: '43px', fontSize: '18px' }}
								onClick={() => Auth.federatedSignIn({ provider: 'Facebook' })}
							>
								<span>Continue with Facebook</span>
							</FacebookLoginButton>
							<GoogleLoginButton
								style={{ height: '43px', fontSize: '18px' }}
								onClick={() => Auth.federatedSignIn({ provider: 'Google' })}
							>
								<span>Continue with Google</span>
							</GoogleLoginButton>
						</div>
						<Box mt={5}>
							<Copyright />
						</Box>
					</form>
				</div>
			</Grid>
		</Grid>
	);
}
