import React from 'react';
import Modal from 'react-bootstrap/Modal';

import Logo from '../media/huskyLogo.svg';

function Success(props) {
	return (
		<div>
			<Modal.Header closeButton>
				<Modal.Title id="contained-modal-title-vcenter">Order Successful</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className="container-fluid contactContainer">
					<div className="col no-gutter">
						<div className="text-center">
							<div>
								<p className="checkoutTitle">
									<strong>ORDER COMPLETED</strong>
								</p>
							</div>
							<hr />
							<img src={Logo} alt="" className="husky" />
						</div>
					</div>
				</div>
			</Modal.Body>
		</div>
	);
}

export default Success;
