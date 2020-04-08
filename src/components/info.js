import React, { Component } from 'react';

import Card from 'react-bootstrap/Card';

import House from '../media/house2.png';
import Tilt from 'react-tilt';

import '../App.css';

function Info() {
	return (
		<div className="container-fluid contactContainer">
			<div className="row no-gutter">
				<Card className="col-md-8 col-lg-6 infoCard">
					<Card.Header as="h3">How does this work?</Card.Header>
					<Card.Body className="contactSectionBody">
						<h5>Powder hounds will clear your snow from the following:</h5>
						<ul>
							<li>Your sidewalk leading to your house</li>
							<li>Your street-side sidewalk</li>
							<li>Your driveway (if applicable)</li>
							<li>Additional snow clearing can happily be arranged as needed</li>
						</ul>
						<h5>Select your preferred option (Scheduled, Same Day, or Priority) and you're on your way!</h5>

						<Card.Text>
							Our goal is to provide a hassle-free experience. No calling in for quotes, just a {' '}
							<b>
								<i>simple service</i>
							</b>{' '}
							for a{' '}
							<b>
								<i>fair price.</i>
							</b>
						</Card.Text>
					</Card.Body>
				</Card>
				<div className="d-none d-md-flex col-md-4 col-lg-6 houseContainer">
					<Tilt className="house Tilt" options={{ max: 25 }} style={{ height: 500, width: 500 }}>
						<img src={House} alt="house" className="Tilt-inner house" />
					</Tilt>
				</div>
			</div>
		</div>
	);
}

export default Info;
