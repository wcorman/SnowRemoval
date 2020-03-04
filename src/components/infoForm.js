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
				<Form autoComplete="off">
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
							autoComplete="off"
							placeholder="Enter Address"
							id="address"
							value={props.customer.address}
							isValid={props.validation.address}
							onChange={(value) => props.onUpdateField(value.currentTarget)}
						/>
					</Form.Group>
					<Button
						disabled={
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
