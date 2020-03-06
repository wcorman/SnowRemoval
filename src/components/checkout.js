import React from 'react';
import Modal from 'react-bootstrap/Modal';
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

	const isFree = props.customer['custom:rewardStatus'] === 3;
	let displayToday = props.orderType !== 'Scheduled' ? `${props.chosendate} (today)` : '';
	let displayType = chooseType(props.orderType);
	var moment = require('moment');

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
										{props.orderType === 'Scheduled' &&
											moment(props.chosendate).format('MMMM Do[,] YYYY')}

										{displayToday}
									</strong>
								</p>
								<p className="checkoutText">
									<i>Grand total:</i>{' '}
									<strong className="grandTotal">
										{' '}
										{!isFree && `$${props.options.price}`}
										{isFree && `FREE`}
									</strong>{' '}
								</p>
							</div>
							<hr />
							<div className="text-center">
								{!isFree && (
									<div>
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
											onSuccess={() => props.onPayment(props.options.price)}
											catchError={(err) => console.log(err)}
										/>
										<p className="text-center small">
											*Payments take a moment to process, please be patient*
										</p>
									</div>
								)}
								{isFree && (
									<Button
										style={{ marginBottom: '8px' }}
										onClick={() => {
											props.onPayment(0);
										}}
									>
										FREE SNOW CLEARING
									</Button>
								)}
							</div>
						</div>
					</div>
				</div>
			</Modal.Body>
		</div>
	);
}

export default Checkout;
