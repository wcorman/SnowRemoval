import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

function InfoModal(props) {
	const modalScreen = () => {
		if (props.phonecheck === 0) {
			return (
				<div>
					<Modal.Header closeButton>
						<Modal.Title id="contained-modal-title-vcenter">What number can we text you at?</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form>
							<Form.Row>
								<Form.Group style={{width: '100%'}}>
									<Form.Label />
									<Form.Control
										placeholder="ex: 306-555-5555"
										id="phoneNumber"
										onChange={(value) => props.onUpdateField(value.currentTarget)}
									/>
								</Form.Group>
							</Form.Row>
							<Button disabled={props.validphone} variant="primary" onClick={() => props.onPhoneNext()}>
								Next
							</Button>
						</Form>
					</Modal.Body>

				</div>
			);
		} else {
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
									<Form.Control placeholder="First name" id="firstName" onChange={(value) => props.onUpdateField(value.currentTarget)} />
								</Form.Group>

								<Form.Group as={Col}>
									<Form.Label>Last Name</Form.Label>
									<Form.Control placeholder="Last name" id="lastName" onChange={(value) => props.onUpdateField(value.currentTarget)} />
								</Form.Group>
							</Form.Row>

							<Form.Row>
								<Form.Group as={Col}>
									<Form.Label>Email</Form.Label>
									<Form.Control type="email" placeholder="Enter email" id="email" onChange={(value) => props.onUpdateField(value.currentTarget)} />
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
								<Form.Control placeholder="Enter Address" id="address" onChange={(value) => props.onUpdateField(value.currentTarget)} />
							</Form.Group>

							<Button variant="primary" onClick={() => props.onPayment(props.price)}>
								Pay {props.price}
							</Button>
						</Form>
					</Modal.Body>
					<Modal.Footer>
						<Button onClick={props.onHide}>Close</Button>
					</Modal.Footer>
				</div>
			);
		}
	};

	return (
		<Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
			{modalScreen()}
		</Modal>
	);
}

export default InfoModal;
