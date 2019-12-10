import React from 'react';
import Modal from 'react-bootstrap/Modal';

import Logo from '../huskyLogo.svg';

import { PayPalButton } from 'react-paypal-button-v2';

function Success(props) {
	const chooseType = (type) => {
		if (type === 'schedule') {
			return 'Scheduled Snow Clearing';
		} else if (type === 'sameDay') {
			return 'Same Day Snow Clearing';
		} else {
			return 'Priority Snow Clearing';
		}
	};

	let displayToday = props.orderType !== 'schedule' ? '(today)' : '';
	let displayType = chooseType(props.orderType);

	return (
		<div>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">Order Successful</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className="container-fluid contactContainer">
					<div className="row no-gutter">
						<div className="col-sm-12 col-md-12 col-lg-7">
							<img src={Logo} alt="" className="husky" />

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
							<PayPalButton
								amount={props.options.price.toString()}
								shippingPreference="NO_SHIPPING"
								options={{
									clientId:
										'AWbvQ193KQ7EUUtVpG8Fvse4r5du26yzy6tH_rIf55vkNPbp-obKDCdfHOHZIsNv4EM_8Q5rEyf4mCKd',
									currency: 'CAD',
									buyerCountry: 'CA'
								}}
								onSuccess={(details) => props.onPayment(props.options.price)}
							/>

							{/* <Button
								disabled={props.validform}
								variant="primary"
								onClick={() => props.onPayment(props.options.price)}
							>
								Pay {props.options.price}
							</Button> */}
						</div>
					</div>
				</div>
			</Modal.Body>
		</div>
	);
}

export default Success;
