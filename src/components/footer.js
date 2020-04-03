import React from 'react';

import { Link } from 'react-router-dom';
import '../footerStyle.css';
import IconButton from '@material-ui/core/IconButton';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			margin: theme.spacing(1)
		},
		colorPrimary: 'white'
	},
	icon: {
		colorPrimary: 'white'
	}
}));

const useStyles2 = makeStyles((theme) => ({
	customHoverFocus: {
		'&:hover, &.Mui-focusVisible': { backgroundColor: 'rgba(255,255,255, 0.1)' }
	}
}));

function Footer() {
	const classes = useStyles2();

	return (
		<footer className="site-footer">
			<div className="container">
				<div className="container">
					<div className="row">
						<div className="col-sm-12 col-md-6">
							<h6>About</h6>
							<p className="text-justify">
								Powder Hounds is Saskatoon's first hassle-free solution for clearing your snow.
							</p>
						</div>

						<div className="col-xs-6 col-md-3" />

						<div className="col-xs-6 col-md-3">
							<h6>Quick Links</h6>
							<ul className="footer-links">
								<li>
									<Link to="/">Home</Link>
								</li>
								<li>
									<Link to="/policy">Privacy Policy</Link>
								</li>
							</ul>
						</div>
					</div>
					<hr />
				</div>
				<div className="container">
					<div className="row">
						<div className="col-md-8 col-sm-6 col-xs-12">
							<p className="copyright-text">
								Copyright &copy; {new Date().getFullYear()} All Rights Reserved by{' '}
								<Link to="/" classNameName="footer">
									Powder Hounds Canada
								</Link>{' '}
							</p>
						</div>

						<div className="col-md-4 col-sm-6 col-xs-12">
							<ul className="social-icons">
								<li>
									<IconButton
										color="primary"
										className={classes.customHoverFocus}
										aria-label="facebook"
										onClick={() => {
											window.open('https://www.facebook.com/PowderHoundsSnowClearing/', '_blank');
										}}
									>
										<FacebookIcon fontSize="large" style={{ color: '#008ad3' }} />
									</IconButton>
								</li>
								<li>
									<IconButton
										color="primary"
										className={classes.customHoverFocus}
										aria-label="instagram"
									>
										<InstagramIcon fontSize="large" style={{ color: '#C13584' }} />
									</IconButton>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
