import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

function PhoneCheck(props) {
	return (
		<div>
						{!props.loading &&
						!props.displayuser && (
							<Form>
								<Form.Row>
									<Form.Group style={{ width: '100%' }}>
										<Form.Label />
										<Form.Control
											required
											size="lg"
											placeholder="ex: 306-555-5555"
											id="phoneNumber"
											onChange={(value) => props.onUpdateField(value.currentTarget)}
										/>
									</Form.Group>
								</Form.Row>

								<Button
									disabled={props.validphone}
									variant="primary"
									onClick={() => props.onPhoneNext()}
								>
									Next
								</Button>
							</Form>
						)}
		</div>
	);
}

export default PhoneCheck;
