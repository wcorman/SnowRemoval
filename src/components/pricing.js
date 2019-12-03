import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

import InfoModal from '../components/modal';

const DOMAIN = 'localhost:4000';
const API_PREFIX = '/orders';
const BASE_URL = `http://${DOMAIN}${API_PREFIX}`;

class Pricing extends React.Component {
	constructor() {
		super();

		this.onPayment = this.onPayment.bind(this);

		const today = new Date();

		var displayDate = new Date(parseInt(today.setDate(today.getDate() + 1), 10));

		this.state = {
			schedule: { price: 25, driveways: 0 },
			sameDay: { price: 35, driveways: 0 },
			priority: { price: 45, driveways: 0 },
			startDate: today.setDate(today.getDate() + 0.5),
			displayDate: displayDate,
			today: today,
			dateError: false,
			modalShow: false,
			scheduleModal: false,
			sameDayModal: false,
			priorityModal: false,
			price: null,
			phoneCheck: 0,
			displayUser: false,
			isLoaded: false,
			error: null,
			validPhone: 1,
			validForm: 1,
			orderType: null,
			firstTimer: false,
			isLoading: false,
			customer: {
				firstName: '',
				lastName: '',
				email: '',
				phoneNumber: '',
				city: 'Saskatoon',
				province: 'Saskatchewan',
				address: '',
				numberOfOrders: null,
				totalSpent: null
			}
		};
	}

	componentDidMount() {

	}

	findCustomerByPhone = () => {
		fetch(`${BASE_URL}/phone/${this.state.customer.phoneNumber}`)
			.then((res) => res.json())
			.then((data) => {
				console.log(data[0]);
				this.setState({
					isLoading: true
				});
				if (data.length > 0) {
					this.setState({
						firstTimer: false,
						customer: {
							...this.state.customer,
							firstName: data[0].firstName,
							lastName: data[0].lastName,
							email: data[0].email,
							address: data[0].address
						}
					});
					setTimeout(() => {
						this.setState({
							isLoading: false,
							displayUser: true
						});
					}, 1000);
				} else {
					setTimeout(() => {
						this.setState({
							isLoading: false,
							firstTimer: true,
							displayUser: true
						});
					}, 1000);
				}
			})
			.catch(console.log);
	};

	updateField = (input) => {
		console.log(input.id);

		const field = input.id;

		if (field === 'phoneNumber') {
			this.phoneValidation(input.value);
		} else {
			this.fieldValidation(input.id);
		}

		this.setState({
			customer: {
				...this.state.customer,
				[field]: input.value
			}
		});
	};

	fieldValidation = () => {
		const { firstName, lastName, address, email } = this.state.customer;

		var pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gim;

		if (firstName === '' || lastName === '' || address === '' || !pattern.test(email)) {
			this.setState({
				validForm: 1
			});
		} else {
			this.setState({
				validForm: 0
			});
		}
	};

	emailValidation = (email) => {
		var pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/g;

		if (pattern.test(email)) {
			this.setState({
				validForm: 0
			});
		} else {
			this.setState({
				validForm: 1
			});
		}
	};

	phoneValidation = (phoneNumber) => {
		var pattern = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/g;

		if (pattern.test(phoneNumber)) {
			this.setState({
				validPhone: 0
			});
		} else {
			this.setState({
				validPhone: 1
			});
		}
	};

	checkPhone = () => {
		console.log('TESTING');

		this.findCustomerByPhone();
	};

	onPayment = (amount) => {
		console.log(this.state.customer.firstName + ' paid $' + amount + ' to Powder Hounds');

		const {
			firstName,
			lastName,
			address,
			email,
			phoneNumber,
			city,
			province,
			numberOfOrders,
			totalSpent
		} = this.state.customer;
		const { orderType, startDate } = this.state;

		const newOrder = {
			firstName: firstName,
			lastName: lastName,
			email: email,
			city: city,
			province: province,
			address: address,
			phoneNumber: phoneNumber,
			numberOfOrders: numberOfOrders,
			totalSpent: totalSpent,
			orderType: orderType,
			selectedDate: startDate,
			createdDate: startDate
		};

		axios.post(`${BASE_URL}`, newOrder).then((res) => console.log(res.data));

		this.setState({
			customer: {
				firstName: '',
				lastName: '',
				email: '',
				phoneNumber: '',
				city: 'Saskatoon',
				province: 'Saskatchewan',
				address: '',
				numberOfOrders: null,
				totalSpent: null
			}
		});
		this.setModalShow(this.state.orderType, false);
	};

	handleChange = (date) => {
		var moment = require('moment');
		var now = moment();
		console.log(date);

		if (date < now) {
			const button = document.getElementById('scheduleButton');
			button.setAttribute('disabled', true);
			button.classList.add('disabled');
			button.style.pointerEvents = 'none';
			this.setState({
				dateError: true
			});
		} else {
			const button = document.getElementById('scheduleButton');
			button.removeAttribute('disabled');
			button.classList.remove('disabled');
			button.style.pointerEvents = '';
			this.setState({
				dateError: false,
				displayDate: date
			});
		}

		this.setState({
			startDate: date
		});
	};

	drivewaySelect = (e) => {
		const plan = e.currentTarget.id;
		const driveways = e.currentTarget.value;

		if (plan === 'schedule') {
			if (driveways === '1') {
				this.setState({ [plan]: { price: 30, driveways: 1 } });
			} else if (driveways === '2') {
				this.setState({ [plan]: { price: 35, driveways: 2 } });
			} else {
				this.setState({ [plan]: { price: 25, driveways: 0 } });
			}
		}

		if (plan === 'sameDay') {
			if (driveways === '1') {
				this.setState({ [plan]: { price: 40, driveways: 1 } });
			} else if (driveways === '2') {
				this.setState({ [plan]: { price: 45, driveways: 2 } });
			} else {
				this.setState({ [plan]: { price: 35, driveways: 0 } });
			}
		}

		if (plan === 'priority') {
			if (driveways === '1') {
				this.setState({ [plan]: { price: 50, driveways: 1 } });
			} else if (driveways === '2') {
				this.setState({ [plan]: { price: 55, driveways: 2 } });
			} else {
				this.setState({ [plan]: { price: 45, driveways: 0 } });
			}
		}
	};

	setModalShow = (selection, showModal) => {
		if (selection === 'schedule') {
			this.setState({
				scheduleModal: showModal,
				orderType: 'schedule'
			});
		} else if (selection === 'sameDay') {
			this.setState({
				sameDayModal: showModal,
				orderType: 'sameDay'
			});
		} else if (selection === 'priority') {
			this.setState({
				priorityModal: showModal,
				orderType: 'priority'
			});
		}
	};

	render() {
		const dateError = this.state.dateError;

		return (
			<section className="pricing py-5">
				<div className="container">
					<div className="row">
						<div className="col-lg-4">
							<div id="pricing" className="card mb-5 mb-lg-0">
								<div className="card-body card-container">
									<h5 className="card-title text-muted text-uppercase text-center">Schedule Ahead</h5>
									<h6 className="card-price text-center">${this.state.schedule.price}</h6>
									<div className="d-flex justify-content-center">
										<form>
											<select
												defaultValue="0"
												className="custom-select my-1 mr-sm-2"
												id="schedule"
												onChange={this.drivewaySelect}
											>
												<option>No Driveway</option>
												<option value="1">Single Driveway</option>
												<option value="2">Double Driveway</option>
											</select>
										</form>
									</div>
									<div className="d-flex justify-content-center">
										<DatePicker
											selected={this.state.startDate}
											onChange={this.handleChange}
											className="datePicker d-flex justify-content-center"
										/>
									</div>
									<p className="dateError">
										<b>{dateError ? 'Please choose a future date' : ''}</b>
									</p>
									<hr className="--small" />
									<ul className="fa-ul">
										<li>
											<span className="fa-li">
												<i className="fas fa-check" />
											</span>
											<strong>Plan ahead when you want to have your snow cleared</strong>
										</li>

										<li>
											<span className="fa-li">
												<i className="fas fa-check" />
											</span>Most cost effective
										</li>
									</ul>
									<div className="button-container">
										<Button
											className="btn btn-block btn-primary text-uppercase button"
											id="scheduleButton"
											onClick={() => this.setModalShow('schedule', true)}
										>
											Clear that snow!
										</Button>
									</div>
								</div>
							</div>
						</div>

						<div className="col-lg-4">
							<div className="card mb-5 mb-lg-0">
								<div className="card-body card-container">
									<h5 className="card-title text-muted text-uppercase text-center">
										Same Day Clearing
									</h5>
									<h6 className="card-price text-center">${this.state.sameDay.price}</h6>

									<div className="d-flex justify-content-center">
										<form className="">
											<select
												defaultValue="0"
												className="custom-select my-1 mr-sm-2"
												id="sameDay"
												onChange={this.drivewaySelect}
											>
												<option>No Driveway</option>
												<option value="1">Single Driveway</option>
												<option value="2">Double Driveway</option>
											</select>
										</form>
									</div>

									<hr />
									<ul className="fa-ul">
										<li>
											<span className="fa-li">
												<i className="fas fa-check" />
											</span>
											<strong>Snow will be cleared before the end of the day</strong>
										</li>
										<li>
											<span className="fa-li">
												<i className="fas fa-check" />
											</span>
											<strong>4pm</strong> deadline for payment
										</li>
									</ul>
									<div className="button-container">
										<Button
											className="btn btn-block btn-primary text-uppercase button"
											id="scheduleButton"
											onClick={() => this.setModalShow('sameDay', true)}
										>
											Clear that snow!
										</Button>
									</div>
								</div>
							</div>
						</div>

						<div className="col-lg-4">
							<div className="card">
								<div className="card-body card-container">
									<h5 className="card-title text-muted text-uppercase text-center">
										Priority Clearing
									</h5>
									<h6 className="card-price text-center">${this.state.priority.price}</h6>

									<div className="d-flex justify-content-center">
										<form className="">
											<select
												defaultValue="0"
												className="custom-select my-1 mr-sm-2"
												id="priority"
												onChange={this.drivewaySelect}
											>
												<option>No Driveway</option>
												<option value="1">Single Driveway</option>
												<option value="2">Double Driveway</option>
											</select>
										</form>
									</div>

									<hr />
									<ul className="fa-ul">
										<li>
											<span className="fa-li">
												<i className="fas fa-check" />
											</span>
											<strong>
												Given priority over other same day clients, snow cleared ASAP
											</strong>
										</li>
										<li>
											<span className="fa-li">
												<i className="fas fa-check" />
											</span>
											<strong>7pm</strong> deadline for payment
										</li>
									</ul>
									<div className="button-container">
										<Button
											className="btn btn-block btn-primary text-uppercase button"
											id="scheduleButton"
											onClick={() => this.setModalShow('priority', true)}
										>
											Clear that snow!
										</Button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<InfoModal
					customer={this.state.customer}
					onUpdateField={this.updateField}
					onPhoneNext={this.checkPhone}
					phonecheck={this.state.phoneCheck}
					orderType={this.state.orderType}
					displayuser={this.state.displayUser}
					validphone={this.state.validPhone}
					firsttimer={this.state.firstTimer}
					validform={this.state.validForm}
					onPayment={this.onPayment}
					options={this.state.schedule}
					label="Scheduled snow clearing"
					chosendate={this.state.displayDate.toDateString()}
					show={this.state.scheduleModal}
					loading={this.state.isLoading}
					onHide={() => this.setModalShow('schedule', false)}
				/>
				<InfoModal
					customer={this.state.customer}
					onUpdateField={this.updateField}
					onPhoneNext={this.checkPhone}
					displayuser={this.state.displayUser}
					phonecheck={this.state.phoneCheck}
					orderType={this.state.orderType}
					validphone={this.state.validPhone}
					firsttimer={this.state.firstTimer}
					validform={this.state.validForm}
					onPayment={this.onPayment}
					options={this.state.sameDay}
					label="Same day clearing"
					chosendate={this.state.today.toDateString()}
					show={this.state.sameDayModal}
					loading={this.state.isLoading}
					onHide={() => this.setModalShow('sameDay', false)}
				/>
				<InfoModal
					customer={this.state.customer}
					onUpdateField={this.updateField}
					onPhoneNext={this.checkPhone}
					phonecheck={this.state.phoneCheck}
					orderType={this.state.orderType}
					displayuser={this.state.displayUser}
					validphone={this.state.validPhone}
					firsttimer={this.state.firstTimer}
					validform={this.state.validForm}
					onPayment={this.onPayment}
					options={this.state.priority}
					label="Priority clearing"
					chosendate={this.state.today.toDateString()}
					show={this.state.priorityModal}
					loading={this.state.isLoading}
					onHide={() => this.setModalShow('priority', false)}
				/>
			</section>
		);
	}
}

export default Pricing;
