import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import InputMask from 'react-input-mask';
import MaterialInput from '@material-ui/core/Input';

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
							<InputMask
								mask="(999) 999-9999"
								value={props.value}
								onChange={(value) => props.onUpdateField(value.currentTarget)}
							>
								{(inputProps) => (
									<Form.Control
										{...inputProps}
										required
										placeholder="Phone #"
										id="phoneNumber"
										inputMode="numeric"
										isValid={props.validation.phone}
										type="tel"
										size="lg"
									/>
								)}
							</InputMask>
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
