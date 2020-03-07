import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import threeMore from '../media/loyaltyCards/3more.svg';
import twoMore from '../media/loyaltyCards/2more.svg';
import oneMore from '../media/loyaltyCards/1more.svg';
import free from '../media/loyaltyCards/free.svg';

function RewardCards(props) {
	const firstName = props.testCustomer['custom:firstName'];
	const rewardStatus = props.testCustomer['custom:rewardStatus'];
	const phoneCheck = props.testCustomer.phone_number;
	return (
		<div>
			<Modal.Header closeButton>
				{props.firstTimer && (
					<Modal.Title id="contained-modal-title-vcenter">Welcome to Powder Hounds!</Modal.Title>
				)}
				{!props.firstTimer && (
					<Modal.Title id="contained-modal-title-vcenter">
						Welcome back, {firstName}!
					</Modal.Title>
				)}{' '}
			</Modal.Header>

			<Modal.Body>
				{!props.loading &&
				phoneCheck &&
				rewardStatus === 0 && (
					<Form>
						<Form.Row>
							<Form.Group style={{ width: '100%' }}>
								<Form.Label />
								Hey, {firstName}! This is your reward card. For every 3 snow clearings, you get one clearing for{' '}
								<strong>FREE</strong>
								.
								<hr />
								<div className="text-center">
									<img src={threeMore} alt="3 more to go" className="rewardCard" />
								</div>
								<hr />
							</Form.Group>
						</Form.Row>

						<Button
							disabled={props.validphone}
							variant="primary"
							onClick={() => props.nextStage('rewardCard')}
						>
							Next
						</Button>
					</Form>
				)}

				{!props.loading &&
				phoneCheck &&
				rewardStatus === 1 && (
					<Form>
						<Form.Row>
							<Form.Group style={{ width: '100%' }}>
								<Form.Label />
								Hey, {firstName}! This is your reward card. For every 3 snow clearings, you get one clearing for{' '}
								<strong>FREE</strong>
								.
								<hr />
								<div className="text-center">
									<img src={twoMore} alt="3 more to go" className="rewardCard" />
								</div>
								<hr />
							</Form.Group>
						</Form.Row>

						<Button
							disabled={props.validphone}
							variant="primary"
							onClick={() => props.nextStage('rewardCard')}
						>
							Next
						</Button>
					</Form>
				)}

				{!props.loading &&
				phoneCheck &&
				rewardStatus === 2 && (
					<Form>
						<Form.Row>
							<Form.Group style={{ width: '100%' }}>
								<Form.Label />
								Hey, {firstName}! This is your reward card. For every 3 snow clearings, you get one clearing for{' '}
								<strong>FREE</strong>
								.
								<hr />
								<div className="text-center">
									<img src={oneMore} alt="3 more to go" className="rewardCard" />
								</div>
								<hr />
							</Form.Group>
						</Form.Row>

						<Button
							disabled={props.validphone}
							variant="primary"
							onClick={() => props.nextStage('rewardCard')}
						>
							Next
						</Button>
					</Form>
				)}

				{!props.loading &&
				phoneCheck &&
				rewardStatus === 3 && (
					<Form>
						<Form.Row>
							<Form.Group style={{ width: '100%' }}>
								<Form.Label />
								Hey, {firstName}! This is your reward card. For every 3 snow clearings, you get one for{' '}
								<strong>FREE</strong>
								.
								<hr />
								<div className="text-center">
									<img src={free} alt="free" className="rewardCard" />
								</div>
								<hr />
							</Form.Group>
						</Form.Row>

						<Button
							disabled={props.validphone}
							variant="primary"
							onClick={() => props.nextStage('rewardCard')}
						>
							Next
						</Button>
					</Form>
				)}
			</Modal.Body>
		</div>
	);
}

export default RewardCards;
