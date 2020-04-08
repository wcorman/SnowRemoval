import React from 'react';

import { Link } from 'react-router-dom';
import '../footerStyle.css';
import IconButton from '@material-ui/core/IconButton';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import { makeStyles } from '@material-ui/core/styles';

import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

const useStyles = makeStyles((theme) => ({
	customHoverFocus: {
		'&:hover, &.Mui-focusVisible': { backgroundColor: 'rgba(255,255,255, 0.1)' }
	}
}));

function Footer() {
	const classes = useStyles();

	const popover = (
		<Popover id="popover-basic">
			<Popover.Title as="h3">Available for work 🚀</Popover.Title>
			<Popover.Content>If you need a hand with your project, I would love to discuss it further.</Popover.Content>
		</Popover>
	);

	return (
		<footer className="site-footer">
			<div className="container footerSection">
				<div className="container footerSection">
					<div className="row">
						<div className="col-sm-12 col-md-6 footerSection">
							<h6>About</h6>
							<p className="text-justify footerSection">
								Winter in the prairies can be cold and long. Powder Hounds is Saskatoon's first
								hassle-free solution for clearing your snow. No quotes, just service.
							</p>
						</div>

						<div className="col-xs-6 col-md-3" />

						<div className="col-xs-6 col-md-3 footerSection">
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
				<div className="container footerSection">
					<div className="row">
						<div className="col-md-8 col-sm-6 col-xs-12">
							<p className="copyright-text">
								Copyright &copy; {new Date().getFullYear()} All Rights Reserved by{' '}
								<Link to="/" className="">
									Powder Hounds Canada
								</Link>
								.
							</p>
							<p>
								Developed by {' '}
								<OverlayTrigger key="top" placement="top" overlay={popover}>
									<a
										style={{ textDecoration: 'underline' }}
										href="https://www.linkedin.com/in/wes-corman/"
										target="_blank"
									>
										Wes Corman
									</a>
								</OverlayTrigger>.
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
									<OverlayTrigger
										key="top"
										placement="top"
										overlay={<Tooltip id={`tooltip-top`}>Coming soon</Tooltip>}
									>
										<IconButton
											color="primary"
											className={classes.customHoverFocus}
											aria-label="instagram"
										>
											<InstagramIcon fontSize="large" style={{ color: '#C13584' }} />
										</IconButton>
									</OverlayTrigger>{' '}
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
