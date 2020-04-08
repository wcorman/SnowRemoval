import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import Avatar from '@material-ui/core/Avatar';
import { lightBlue } from '@material-ui/core/colors';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import Paper from '@material-ui/core/Paper';

import { Auth } from 'aws-amplify';

const useStyles = makeStyles((theme) => ({
	root: {
		height: '100vh'
	},
	image: {
		backgroundRepeat: 'no-repeat',
		backgroundColor: '#33aeff',
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

class Settings extends React.Component {
	constructor() {
		super();

		this.state = {
			user: {
				id: null,
				email: null,
				address: '',
				city: 'Saskatoon',
				province: 'Saskatchewan',
				name: null,
				phone_number: null,
				phoneOptIn: null,
				firstName: null,
				firstInitial: '',
				lastName: null,
				lastInitial: '',
				numberOfOrders: null,
				rewardStatus: null,
				totalSpent: null
			}
		};

		Auth.currentAuthenticatedUser({ bypassCache: true }).then((user) => {
			console.log('Settings user: ', user.attributes);
			this.setState({
				user: {
					id: user.attributes.sub,
					email: user.attributes.email,
					address: '',
					city: 'Saskatoon',
					province: 'Saskatchewan',
					name: user.attributes.name,
					phone_number: user.attributes.phone_number,
					phoneOptIn: user.attributes['custom:phoneOpt'],
					firstName: user.attributes['custom:firstName'],
					firstInitial: user.attributes['custom:firstName'].charAt(0),
					lastName: user.attributes['custom:lastName'],
					lastInitial: user.attributes['custom:lastName'].charAt(0),
					numberOfOrders: parseInt(user.attributes['custom:numberOfOrders'], 10),
					rewardStatus: parseInt(user.attributes['custom:rewardStatus'], 10),
					totalSpent: parseInt(user.attributes['custom:totalSpent'], 10)
				}
			});
		});
		console.log(this.state);
	}

	render() {
		return (
			<Grid item sm={12} md={12} className={this.props.classes.image}>
				<Paper elevation={18} className="policy">
					<div className="settingsAvatar">
						<Avatar className={this.props.classes.avatar}>
							{this.state.user.firstInitial + this.state.user.lastInitial}
						</Avatar>
					</div>
					<div style={{ marginTop: '16px', marginBottom: '16px' }} className={this.props.classes.paper}>
						<hr className="signInHuskyLogo" />

						<Typography component="h1" variant="h5">
							Account Settings
						</Typography>

						<form className={this.props.classes.form} noValidate>
							{/* <TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
							autoFocus
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
						/> */}
							{/* <p style={{ color: 'red', margin: '0' }}>errorMessage prop</p> */}
							<div>
								<LinearProgress hidden={true} />
							</div>
							<Button fullWidth variant="contained" color="primary" className={this.props.classes.submit}>
								Save
							</Button>
							<hr style={{ marginTop: '24px' }} />
						</form>
					</div>
				</Paper>
			</Grid>
		);
	}
}
export default Settings;
