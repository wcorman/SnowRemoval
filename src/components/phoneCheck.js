import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function PhoneCheck(props) {
	return (
		<div>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">What number can we text you at?</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Row>
						<Form.Group style={{ width: '100%' }}>
							<Form.Label />
							<Form.Control
								required
								size="lg"
								inputMode="numeric"
								type="phone"
								placeholder="ex: 306-555-5555"
								isValid={props.validation.phone}
								id="phoneNumber"
								onChange={(value) => props.onUpdateField(value.currentTarget)}
							/>
						</Form.Group>
					</Form.Row>

					<Button
						disabled={!props.validation.phone}
						variant="primary"
						onClick={() => props.nextStage('phoneCheck')}
					>
						Next
					</Button>
				</Form>
			</Modal.Body>
		</div>
	);
}

export default PhoneCheck;
