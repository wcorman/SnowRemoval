import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

function ContactModal(props) {
	return (
		<Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">How can we help?</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Row>
						<Form.Group as={Col}>
							<Form.Label>First Name</Form.Label>
							<Form.Control required placeholder="First name" id="firstName" />
						</Form.Group>

						<Form.Group as={Col}>
							<Form.Label>Last Name</Form.Label>
							<Form.Control placeholder="Last name" id="lastName" />
						</Form.Group>
					</Form.Row>

					<Form.Row>
						<Form.Group as={Col}>
							<Form.Label>Email</Form.Label>
							<Form.Control required type="email" placeholder="Enter email" id="email" />
						</Form.Group>
					</Form.Row>

					<Form.Row>
						<Form.Group as={Col}>
							<Form.Label>Message</Form.Label>
							<Form.Control
								required
								as="textarea"
								type="text"
								placeholder="Your message..."
								id="message"
							/>
						</Form.Group>
					</Form.Row>

					<Button href="mailto:me@me.com" disabled={props.validform} variant="primary">
						Send
					</Button>
				</Form>
			</Modal.Body>
		</Modal>
	);
}

export default ContactModal;
