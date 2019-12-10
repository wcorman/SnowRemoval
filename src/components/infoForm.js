import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';

function PhoneCheck(props) {
	return (
		<div>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">
					{props.label} - {props.chosendate}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Row>
						<Form.Group as={Col}>
							<Form.Label>First Name</Form.Label>
							<Form.Control
								required
								placeholder="First name"
								id="firstName"
								name="firstName"
								isValid={props.validation.firstName}
								onChange={(value) => props.onUpdateField(value.currentTarget)}
							/>
						</Form.Group>

						<Form.Group as={Col}>
							<Form.Label>Last Name</Form.Label>
							<Form.Control
								required
								placeholder="Last name"
								id="lastName"
								name="lastName"
								isValid={props.validation.lastName}
								onChange={(value) => props.onUpdateField(value.currentTarget)}
							/>
						</Form.Group>
					</Form.Row>

					<Form.Row>
						<Form.Group as={Col}>
							<Form.Label>Email</Form.Label>
							<Form.Control
								required
								type="email"
								placeholder="Enter email"
								id="email"
								isValid={props.validation.email}
								onChange={(value) => props.onUpdateField(value.currentTarget)}
							/>
						</Form.Group>
					</Form.Row>

					<Form.Row>
						<Form.Group as={Col}>
							<Form.Label>City</Form.Label>
							<Form.Control value="Saskatoon" as="select" readOnly>
								<option>Saskatoon</option>
								<option>Regina</option>
								<option>Prince Albert</option>
							</Form.Control>
						</Form.Group>

						<Form.Group as={Col}>
							<Form.Label>Province</Form.Label>
							<Form.Control value="Saskatchewan" as="select" readOnly>
								<option>Alberta</option>
								<option>Saskatchewan</option>
							</Form.Control>
						</Form.Group>
					</Form.Row>

					<Form.Group>
						<Form.Label>Address</Form.Label>
						<Form.Control
							required
							placeholder="Enter Address"
							id="address"
							isValid={props.validation.address}
							onChange={(value) => props.onUpdateField(value.currentTarget)}
						/>
					</Form.Group>
					<Button
						disabled={
							!props.validation.firstName ||
							!props.validation.lastName ||
							!props.validation.email ||
							!props.validation.address
						}
						variant="primary"
						onClick={() => props.nextStage('information')}
					>
						Next
					</Button>
				</Form>
			</Modal.Body>
		</div>
	);
}

export default PhoneCheck;
