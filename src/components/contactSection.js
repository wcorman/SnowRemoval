import React, { Component } from 'react';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ContactModal from '../components/contactModal';

import Col from 'react-bootstrap/Col';
import MailLogo from '../contactLogo.svg';
import Tilt from 'react-tilt';

import '../App.css';

class ContactSection extends Component {
	constructor() {
		super();
		this.state = {
			name: '',
			message: '',
			showModal: false,
			validate: {
				emailState: ''
			}
		};
		this.handleChange = this.handleChange.bind(this);
	}

	validateEmail(e) {
		const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		const { validate } = this.state;
		if (emailRex.test(e.target.value)) {
			validate.emailState = 'has-success';
		} else {
			validate.emailState = 'has-danger';
		}
		this.setState({ validate });
	}

	handleChange = async (event) => {
		const { target } = event;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const { name } = target;
		await this.setState({
			[name]: value
		});
	};

	submitForm(e) {
		e.preventDefault();
		console.log(`Email: ${this.state.email}`);
	}

	render() {
		const { email, password } = this.state;
		return (
			<div className="container-fluid contactContainer">
				<div className="row no-gutter">
					<div className="d-none d-md-flex col-md-4 col-lg-6">
						<Tilt className="husky Tilt" options={{ max: 25 }} style={{ height: 350, width: 350 }}>
							<img
								src={MailLogo}
								alt="mail logo"
								className="Tilt-inner"
								onClick={() =>
									this.setState({
										showModal: true
									})}
							/>
						</Tilt>
					</div>

					<Card className="col-md-8 col-lg-6 contactForm">
						<Card.Header as="h3">Any questions?</Card.Header>
						<Card.Body className="contactSectionBody">
							<Card.Title>
								Not finding what you're looking for? Send us a message and we'd be happy to accomodate
							</Card.Title>
							<Card.Text>
								With supporting text below as a natural lead-in to additional content.
							</Card.Text>
							<Button
								variant="primary"
								onClick={() =>
									this.setState({
										showModal: true
									})}
							>
								Send message...
							</Button>
						</Card.Body>
					</Card>
				</div>
				<ContactModal
					show={this.state.showModal}
					onHide={() =>
						this.setState({
							showModal: false
						})}
				/>
			</div>
		);
	}
}

export default ContactSection;
