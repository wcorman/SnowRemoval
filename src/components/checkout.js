import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';

import Logo from '../media/huskyLogo.svg';

import { PayPalButton } from 'react-paypal-button-v2';

function Checkout(props) {
	const chooseType = (type) => {
		if (type === 'Scheduled') {
			return 'Scheduled Snow Clearing';
		} else if (type === 'Same Day') {
			return 'Same Day Snow Clearing';
		} else {
			return 'Priority Snow Clearing';
		}
	};

	let displayToday = props.orderType !== 'Scheduled' ? '(today)' : '';
	let displayType = chooseType(props.orderType);

	return (
		<div>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">Review your order</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className="container-fluid contactContainer">
					<div className="row no-gutter">
						<div className="d-none d-lg-flex  col-md-0 col-lg-5" id="contactForm">
							<img src={Logo} alt="" className="husky" />
						</div>
						<div className="col-sm-12 col-md-12 col-lg-7">
							<div>
								<p className="checkoutTitle">
									<strong>{displayType}</strong>
								</p>
								<p className="checkoutText">
									<i> City/Province:</i>{' '}
									<strong>
										{props.customer.city}, {props.customer.province}
									</strong>
								</p>
								<p className="checkoutText">
									<i> Address:</i> <strong>{props.customer.address}</strong>
								</p>
								<p className="checkoutText">
									<i>Scheduled for:</i>{' '}
									<strong>
										{props.chosendate} {displayToday}
									</strong>
								</p>
								<p className="checkoutText">
									<i>Grand total:</i> <strong className="grandTotal">
										{' '}
										${props.options.price}
									</strong>{' '}
								</p>
							</div>
							<hr />
							<div>
								{!props.isFree && (
									<PayPalButton
										id="payPalButton"
										amount={props.options.price.toString()}
										createOrder={(data, actions) => {
											console.log(data);
											props.nextStage('checkout');
											return actions.order.create({
												purchase_units: [
													{
														amount: {
															currency_code: 'CAD',
															value: `${props.options.price.toString()}`
														}
													}
												]
											});
										}}
										shippingPreference="NO_SHIPPING"
										options={{
											clientId:
												'AWbvQ193KQ7EUUtVpG8Fvse4r5du26yzy6tH_rIf55vkNPbp-obKDCdfHOHZIsNv4EM_8Q5rEyf4mCKd',
											currency: 'CAD',
											buyerCountry: 'CA'
										}}
										onSuccess={(details) => props.onPayment(props.options.price)}
										catchError={(err) => console.log(err)}
									/>
								)}
								{props.isFree && (
									<Button
										onClick={() => {
											props.onPayment(0);
										}}
									>
										FREE SNOW CLEARING
									</Button>
								)}
							</div>

							{props.loading && (
								<div>
									{/* <Spinner id="spinner" animation="border" variant="primary" /> */}
								</div>
							)}
						</div>
					</div>
				</div>
			</Modal.Body>
		</div>
	);
}

export default Checkout;
