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
			numberOfOrders: 0,
			freeClearing: false,
			sameDayModal: false,
			priorityModal: false,
			price: null,
			showForm: 0,
			displayRewardCard: false,
			rewardStatus: 0,
			isLoaded: false,
			error: null,
			validPhone: false,
			validation: {
				validPhone: false
			},
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
				numberOfOrders: 0,
				totalSpent: null,
				id: null
			}
		};
	}

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
				validation: {
					...this.state,
					validPhone: true
				}
			});
		} else {
			this.setState({
				validation: {
					...this.state,
					validPhone: false
				}
			});
		}
	};

	rewardCardNext = () => {
		this.setState({
			showForm: 1
		});
	};

	informationNext = () => {
		this.setState({
			showForm: 2
		});
	};

	findCustomerByPhone = () => {
		fetch(`${BASE_URL}/phone/${this.state.customer.phoneNumber}`)
			.then((res) => res.json())
			.then((data) => {
				console.log('DATA', data[0]);
				this.setState({
					isLoading: true,
					numberOfOrders: data.length
				});
				if (data.length > 0) {
					const customer = data[0];

					this.setState({
						firstTimer: false,
						rewardStatus: customer.rewardStatus,
						numberOfOrders: customer.numberOfOrders,
						customer: {
							...this.state.customer,
							firstName: customer.firstName,
							lastName: customer.lastName,
							email: customer.email,
							address: customer.address,
							id: customer._id
						}
					});
					setTimeout(() => {
						this.setState({
							isLoading: false,
							displayRewardCard: true
						});
					}, 1000);
				} else {
					setTimeout(() => {
						this.setState({
							isLoading: false,
							firstTimer: true,
							displayRewardCard: true
						});
					}, 1000);
				}
				if (data.length === 3) {
					this.setState({
						freeClearing: true
					});
				}
			})
			.catch(console.log);
	};

	nextStage = (stage) => {
		console.log(stage);

		if (stage === 'phoneCheck') {
			this.findCustomerByPhone();
		} else if (stage === 'rewardCard') {
			this.rewardCardNext();
		} else if (stage === 'information') {
			this.informationNext();
		}
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

		const rewardStatus = this.state.rewardStatus === 3 ? 0 : this.state.rewardStatus + 1;

		const newOrder = {
			firstName: firstName,
			lastName: lastName,
			email: email,
			city: city,
			province: province,
			address: address,
			phoneNumber: phoneNumber,
			rewardStatus: rewardStatus,
			numberOfOrders: numberOfOrders,
			totalSpent: totalSpent,
			orderType: orderType,
			selectedDate: startDate,
			createdDate: startDate
		};
		if (this.state.firstTimer) {
			axios.post(`${BASE_URL}`, newOrder).then((res) => console.log(res.data));
		} else {
			axios.put(`${BASE_URL}` + '/' + `${this.state.customer.id}`, newOrder).then((res) => console.log(res.data));
		}

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
											Let's get started!
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
											Let's get started!
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
											Let's get started!
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
					rewardStatus={this.state.rewardStatus}
					numberOfOrders={this.state.numberOfOrders}
					nextStage={this.nextStage}
					showform={this.state.showForm}
					orderType={this.state.orderType}
					displayrewardcard={this.state.displayRewardCard}
					validation={this.state.validation}
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
					rewardStatus={this.state.rewardStatus}
					numberOfOrders={this.state.numberOfOrders}
					nextStage={this.nextStage}
					displayrewardcard={this.state.displayRewardCard}
					showform={this.state.showForm}
					orderType={this.state.orderType}
					validation={this.state.validation}
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
					rewardStatus={this.state.rewardStatus}
					numberOfOrders={this.state.numberOfOrders}
					nextStage={this.nextStage}
					showform={this.state.showForm}
					orderType={this.state.orderType}
					displayrewardcard={this.state.displayRewardCard}
					validation={this.state.validation}
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
