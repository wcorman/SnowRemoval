import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Image from 'react-bootstrap/Image';
import Logo from '../media/navLogo.svg';
import huskyLogo from '../media/huskyLogo.svg';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		height: '100vh'
	},
	image: {
		backgroundImage: 'url(https://source.unsplash.com/random)',
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
		margin: theme.spacing(3, 0, 2),
		height: '46px'
	}
}));

export default function SignUp(props) {
	const classes = useStyles();

	return (
		<Grid item xs={12} sm={8} md={5} component="signUp" elevation={6} square>
			<div style={{ marginTop: '16px', marginBottom: '16px' }} className={classes.paper}>
				{/* <Avatar className={classes.avatar} /> */}
				<Image src={Logo} className="signInLogo" />
				<Image src={huskyLogo} className="signInHuskyLogo" />
				<hr className="signInHuskyLogo" />

				<Typography component="h1" variant="h5">
					Sign Up
				</Typography>
				<form className={classes.form} noValidate>
					<TextField
						error={!props.validation.email}
						value={props.values.email}
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						helperText={!props.validation.email ? 'Not a valid email format' : ''}
						name="email"
						type="email"
						autoFocus
						onChange={(value) => props.updateField(value.currentTarget)}
					/>
					<TextField
						error={!props.validation.name}
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="name"
						label="Full Name"
						helperText={!props.validation.name ? 'Requires both first and last name' : ''}
						name="name"
						onChange={(value) => props.updateField(value.currentTarget)}
					/>
					<TextField
						error={!props.validation.password}
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						helperText={
							!props.validation.password ? 'Upper and lowercase letters with a 8 character minimum' : ''
						}
						type="password"
						id="password"
						onChange={(value) => props.updateField(value.currentTarget)}
					/>
					<TextField
						error={!props.validation.passwordConfirm}
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password-confirm"
						label="Confirm Password"
						helperText={!props.validation.confirmPassword ? 'Does not match password' : ''}
						type="password"
						id="passwordConfirm"
						onChange={(value) => props.updateField(value.currentTarget)}
					/>
					<p style={{ color: 'red' }}>{props.errorMessage}</p>
					<Button
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={() => props.signUpSubmit()}
					>
						Sign Up
					</Button>
					<Grid container>
						<Grid item xs />
						<Grid item>
							<Link href="#" variant="body2" onClick={() => props.toggle()}>
								{'Already have an account? Sign In'}
							</Link>
						</Grid>
					</Grid>
					<Box mt={5}>{props.copyright()}</Box>
				</form>
			</div>
		</Grid>
	);
}
