import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';

import { PayPalButton } from 'react-paypal-button-v2';

import RewardCards from '../components/rewardCards';
import PhoneCheck from '../components/phoneCheck';

function InfoModal(props) {
	const modalScreen = () => {
		if (props.showform === 0) {
			return (
				<div>
					<Modal.Header closeButton>
						{!props.displayrewardcard && (
							<Modal.Title id="contained-modal-title-vcenter">
								What number can we text you at?
							</Modal.Title>
						)}
						{props.displayrewardcard &&
						props.firsttimer && (
							<Modal.Title id="contained-modal-title-vcenter">Welcome to Powder Hounds!</Modal.Title>
						)}

						{props.displayrewardcard &&
						!props.firsttimer && (
							<Modal.Title id="contained-modal-title-vcenter">
								Welcome back, {props.customer.firstName}!
							</Modal.Title>
						)}
					</Modal.Header>
					<Modal.Body>
						<PhoneCheck
							loading={props.loading}
							displayrewardcard={props.displayrewardcard}
							onUpdateField={props.onUpdateField}
							validphone={props.validphone}
							nextStage={props.nextStage}
						/>
						<RewardCards
							loading={props.loading}
							displayrewardcard={props.displayrewardcard}
							firsttimer={props.firsttimer}
							rewardStatus={props.rewardStatus}
							numberOfOrders={props.numberOfOrders}
							nextStage={props.nextStage}
						/>

						{props.loading && <Spinner id="spinner" animation="border" variant="primary" />}
					</Modal.Body>
				</div>
			);
		} else if (props.showform === 1) {
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
							<Button
								disabled={props.validform}
								variant="primary"
								onClick={() => props.nextStage('information')}
							>
								Next
							</Button>
						</Form>
					</Modal.Body>
				</div>
			);
		} else if (props.showform === 2) {
			return (
				<div>
					<Modal.Header closeButton>
						<Modal.Title id="contained-modal-title-vcenter">Order Details</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form>
							

							<div className="payPalButtonContainer">
								<PayPalButton
									className="payPalButton"
									amount={props.options.price.toString()}
									shippingPreference="NO_SHIPPING"
									options={{
										clientId:
											'AWbvQ193KQ7EUUtVpG8Fvse4r5du26yzy6tH_rIf55vkNPbp-obKDCdfHOHZIsNv4EM_8Q5rEyf4mCKd',
										currency: 'CAD'
									}}
									onSuccess={(details) => {
										alert('Transaction completed by ' + details.payer.name.given_name);
									}}
								/>
							</div>
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
