import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';

import RewardCards from '../components/rewardCards';

import threeMore from '../3more.svg';
import twoMore from '../2more.svg';
import oneMore from '../1more.svg';
import free from '../free.svg';

function InfoModal(props) {
	const modalScreen = () => {
		if (props.phonecheck === 0) {
			console.log(props);
			return (
				<div>
					<Modal.Header closeButton>
						{!props.displayuser && (
							<Modal.Title id="contained-modal-title-vcenter">
								What number can we text you at?
							</Modal.Title>
						)}
						{props.displayuser &&
						props.firsttimer && (
							<Modal.Title id="contained-modal-title-vcenter">
								Looks like your first time here, welcome!
							</Modal.Title>
						)}

						{props.displayuser &&
						!props.firsttimer && (
							<Modal.Title id="contained-modal-title-vcenter">
								Welcome back, {props.customer.firstName}!
							</Modal.Title>
						)}
					</Modal.Header>
					<Modal.Body>
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

						<RewardCards
							loading={props.loading}
							displayuser={props.displayuser}
							firsttimer={props.firsttimer}
							numberOfOrders={props.numberOfOrders}
							onPhoneNext={props.onPhoneNext}
						/>

						{props.loading && <Spinner id="spinner" animation="border" variant="primary" />}
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
									<Form.Control
										required
										placeholder="First name"
										id="firstName"
										value={props.customer.firstName}
										onChange={(value) => props.onUpdateField(value.currentTarget)}
									/>
								</Form.Group>

								<Form.Group as={Col}>
									<Form.Label>Last Name</Form.Label>
									<Form.Control
										placeholder="Last name"
										id="lastName"
										value={props.customer.lastName}
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
										value={props.customer.email}
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
									value={props.customer.address}
									onChange={(value) => props.onUpdateField(value.currentTarget)}
								/>
							</Form.Group>
							<Form.Group controlId="formBasicCheckbox">
								<Form.Check type="checkbox" label="Save information for faster" />
							</Form.Group>

							<Button
								disabled={props.validform}
								variant="primary"
								onClick={() => props.onPayment(props.price)}
							>
								Pay {props.options.price}
							</Button>
						</Form>
					</Modal.Body>
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
