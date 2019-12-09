import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function PhoneCheck(props) {
	return (
		<div>
			{!props.loading &&
			!props.displayrewardcard && (
				<Form>
					<Form.Row>
						<Form.Group style={{ width: '100%' }}>
							<Form.Label />
							<Form.Control
								required
								size="lg"
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
			)}
		</div>
	);
}

export default PhoneCheck;
