import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

import threeMore from '../3more.svg';
import twoMore from '../2more.svg';
import oneMore from '../1more.svg';
import free from '../free.svg';

function RewardCards(props) {
	return (
		<div>
			{!props.loading &&
			props.displayuser &&
			props.firsttimer && (
				<Form>
					<Form.Row>
						<Form.Group style={{ width: '100%' }}>
							<Form.Label />
							This is your reward card. For every 3 snow clearings, you get one for <strong>
								FREE
							</strong>{' '}
							.
							<hr />
							<div className="text-center">
								<img src={threeMore} alt="3 more to go" className="rewardCard" />
							</div>
							<hr />
						</Form.Group>
					</Form.Row>

					<Button disabled={props.validphone} variant="primary" onClick={() => props.onPhoneNext()}>
						Next
					</Button>
				</Form>
			)}

			{!props.loading &&
			props.displayuser &&
			props.numberOfOrders === 1 && (
				<Form>
					<Form.Row>
						<Form.Group style={{ width: '100%' }}>
							<Form.Label />
							This is your reward card. For every 3 snow clearings, you get one for <strong>
								FREE
							</strong>{' '}
							.
							<hr />
							<div className="text-center">
								<img src={twoMore} alt="3 more to go" className="rewardCard" />
							</div>
							<hr />
						</Form.Group>
					</Form.Row>

					<Button disabled={props.validphone} variant="primary" onClick={() => props.onPhoneNext()}>
						Next
					</Button>
				</Form>
			)}

			{!props.loading &&
			props.displayuser &&
			props.numberOfOrders === 2 && (
				<Form>
					<Form.Row>
						<Form.Group style={{ width: '100%' }}>
							<Form.Label />
							This is your reward card. For every 3 snow clearings, you get one for <strong>
								FREE
							</strong>{' '}
							.
							<hr />
							<div className="text-center">
								<img src={oneMore} alt="3 more to go" className="rewardCard" />
							</div>
							<hr />
						</Form.Group>
					</Form.Row>

					<Button disabled={props.validphone} variant="primary" onClick={() => props.onPhoneNext()}>
						Next
					</Button>
				</Form>
			)}

			{!props.loading &&
			props.displayuser &&
			props.numberOfOrders === 3 && (
				<Form>
					<Form.Row>
						<Form.Group style={{ width: '100%' }}>
							<Form.Label />
							This is your reward card. For every 3 snow clearings, you get one for <strong>
								FREE
							</strong>{' '}
							.
							<hr />
							<div className="text-center">
								<img src={free} alt="free" className="rewardCard" />
							</div>
							<hr />
						</Form.Group>
					</Form.Row>

					<Button disabled={props.validphone} variant="primary" onClick={() => props.onPhoneNext()}>
						Next
					</Button>
				</Form>
			)}
		</div>
	);
}

export default RewardCards;
