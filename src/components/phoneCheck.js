import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import InputMask from 'react-input-mask';

function PhoneCheck(props) {
	return (
		<div>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">Please enter your phone number</Modal.Title>
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
					{/* <FormControlLabel
						className="checkbox"
						control={
							<Switch
								checked={props.optIn}
								onChange={(value) => props.onUpdateField(value.currentTarget)}
								name="checkedA"
								color="primary"
								id="phoneOptIn"
							/>
						}
						label="Opt in for text confirmations"
					/>{' '} */}
				</Form>
			</Modal.Body>
		</div>
	);
}

export default PhoneCheck;
