import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';

import RewardCards from '../components/rewardCards';
import PhoneCheck from '../components/phoneCheck';
import Checkout from '../components/checkout';
import Success from '../components/success';
import InfoForm from '../components/infoForm';

function InfoModal(props) {
	const modalScreen = () => {
		if (props.showform === 0) {
			return (
				<div>
					{!props.testCustomer.phone_number && (
						<PhoneCheck
							phoneNumber={props.testCustomer.phone_number}
							loading={props.loading}
							onUpdateField={props.onUpdateField}
							validation={props.validation}
							nextStage={props.nextStage}
						/>
					)}
					{props.testCustomer.phone_number && (
						<RewardCards
							phoneNumber={props.testCustomer.phone_number}
							testCustomer={props.testCustomer}
							loading={props.loading}
							firstTimer={props.firstTimer}
							nextStage={props.nextStage}
						/>
					)}

					{props.loading && <Spinner id="spinner" animation="border" variant="primary" />}
				</div>
			);
		} else if (props.showform === 1) {
			return (
				<InfoForm
					label={props.label}
					chosendate={props.chosendate}
					onUpdateField={props.onUpdateField}
					nextStage={props.nextStage}
					customer={props.testCustomer}
					validation={props.validation}
				/>
			);
		} else if (props.showform === 2) {
			return (
				<Checkout
					orderType={props.orderType}
					options={props.options}
					onPayment={props.onPayment}
					customer={props.testCustomer}
					chosendate={props.chosendate}
					loading={props.loading}
					nextStage={props.nextStage}
				/>
			);
		} else if (props.showform === 3) {
			return (
				<Success
					orderType={props.orderType}
					options={props.options}
					onPayment={props.onPayment}
					chosendate={props.chosendate}
				/>
			);
		}
	};

	return (
		<Modal
			{...props}
			size="lg"
			aria-labelledby="contained-modal-title-vcenter"
			centered
			style={{
				maxHeight: '100%',
				overflowY: 'auto'
			}}
		>
			{modalScreen()}
		</Modal>
	);
}

export default InfoModal;
