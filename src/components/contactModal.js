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
						<Form.Group as={Col} controlId="validationCustom01">
							<Form.Label>Name</Form.Label>
							<Form.Control
								required
								placeholder="Your name..."
								id="name"
								isValid={props.validation.name}
                defaultValue={props.name}
								onChange={(value) => props.updateField(value.currentTarget)}
							/>
						</Form.Group>
					</Form.Row>

					<Form.Row>
						<Form.Group as={Col} controlId="validationCustom02">
							<Form.Label>Message</Form.Label>
							<Form.Control
								required
								as="textarea"
								type="text"
								placeholder="Your message..."
								id="message"
								isValid={props.validation.message}
                defaultValue={props.message}
								onChange={(value) => props.updateField(value.currentTarget)}
							/>
							<Form.Control.Feedback type="invalid">Please enter a message.</Form.Control.Feedback>
						</Form.Group>
					</Form.Row>

					<Button onClick={props.onSend} disabled={!props.validation.name || !props.validation.message} variant="primary">
						Send
					</Button>
				</Form>
			</Modal.Body>
		</Modal>
	);
}

export default ContactModal;
