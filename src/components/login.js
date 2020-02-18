import React, { Component } from 'react';

import Card from 'react-bootstrap/Card';
import '../App.css';

class Login extends Component {
	constructor() {
		super();
		this.state = {
			name: '',
		};
	}

	render() {
		return (
			<div className="container-fluid contactContainer">
				<div className="row no-gutter">
					<Card className="col-md-8 col-lg-6 contactForm">
						<Card.Header as="h3">Any questions?</Card.Header>
						<Card.Body className="contactSectionBody">
							<Card.Text>
								LOGIN TEST.
							</Card.Text>
						</Card.Body>
					</Card>
				</div>
			</div>
		);
	}
}

export default Login;
