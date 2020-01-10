import React, { Component } from 'react';
import PrivacyPolicy from '../components/privacyPolicy';

class Footer extends Component {
	constructor() {
		super();
		this.state = {
			showModal: false
		};
	}
	render() {
		return (
			<div>
				<div className="text-center footer">©{new Date().getFullYear()} Powder Hounds</div>{' '}
				<div
					onClick={() =>
						this.setState({
							showModal: true
						})}
					className="text-center footer policy"
				>
					Privacy Policy
				</div>{' '}
				<div className="text-center subFooter"> *NOT a cocaine delivery service</div>
				<PrivacyPolicy
					show={this.state.showModal}
					onHide={() =>
						this.setState({
							showModal: false
						})}
				/>
			</div>
		);
	}
}

export default Footer;