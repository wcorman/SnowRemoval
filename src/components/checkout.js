import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import { PayPalButton } from 'react-paypal-button-v2';

function Checkout(props) {
	return (
		<div>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">Review your order</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<div className="payPalButtonContainer">
						<PayPalButton
							amount={props.options.price.toString()}
							shippingPreference="NO_SHIPPING"
							options={{
								clientId:
									'AWbvQ193KQ7EUUtVpG8Fvse4r5du26yzy6tH_rIf55vkNPbp-obKDCdfHOHZIsNv4EM_8Q5rEyf4mCKd',
								currency: 'CAD'
							}}
							onSuccess={(details) => props.onPayment(props.options.price)}
						/>
					</div>
					<Button disabled={props.validform} variant="primary" onClick={() => props.onPayment(props.options.price)}>
						Pay {props.options.price}
					</Button>
				</Form>
			</Modal.Body>
		</div>
	);
}

export default Checkout;
