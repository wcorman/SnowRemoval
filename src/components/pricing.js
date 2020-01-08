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

		var moment = require('moment');
		let todayNew = moment().format('MMMM Do YYYY');

		let currentTime = moment().format('LT');
		let sameDayCutoff = moment().format('5:00 PM');
		let priorityCutoff = moment().format('7:00 PM');
		const sameDayOpen = currentTime > sameDayCutoff;
		const priorityOpen = currentTime > priorityCutoff;

		var displayDate = new Date(parseInt(today.setDate(today.getDate() + 1), 10)).toString().slice(0, -33);
		let tomorrow = moment().add(1, 'days').format('ll');

		this.state = {
			schedule: { price: 25, driveways: 0, disabled: false },
			sameDay: { price: 35, driveways: 0, disabled: sameDayOpen },
			priority: { price: 45, driveways: 0, disabled: priorityOpen },
			driveways: null,
			calendarDate: today.setDate(today.getDate() + 0.5),
			chosenDate: tomorrow,
			displayDate: displayDate.toString(),
			today: todayNew,
			dateError: false,
			modalShow: false,
			scheduleModal: false,
			freeClearing: false,
			sameDayModal: false,
			priorityModal: false,
			price: null,
			showForm: 0,
			displayRewardCard: false,
			validation: {
				phone: false,
				firstName: false,
				lastName: false,
				email: false,
				address: false
			},
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
				orders: [],
				rewardStatus: 0,
				numberOfOrders: 0,
				totalSpent: 0,
				id: null
			}
		};
	}

	componentDidMount() {
		var moment = require('moment');
		const sameDayCutoff = moment().format('5:00 PM');
		const priorityCutoff = moment().format('7:00 PM');

		const checkTime = () => {
			let currentTime = moment().format('LT');
			const sameDayOpen = currentTime > sameDayCutoff;
			const priorityOpen = currentTime > priorityCutoff;

			this.setState({
				...this.state,
				sameDay: { ...this.state.sameDay, disabled: sameDayOpen },
				priority: { ...this.state.priority, disabled: priorityOpen }
			});
		};

		setInterval(checkTime, 10000);
	}

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

	updateField = (input) => {
		const field = input.id;

		if (field === 'phoneNumber') {
			this.phoneValidation(input.value);
		} else {
			this.fieldValidation(input);
		}

		this.setState({
			customer: {
				...this.state.customer,
				[field]: input.value
			}
		});
	};

	fieldValidation = (input) => {
		const field = input.id;

		this.setState({
			...this.state,
			customer: {
				...this.state.customer,
				[field]: input.value
			}
		});

		if (field === 'firstName') {
			if (input.value.length > 1) {
				this.setState({
					...this.state,
					validation: {
						...this.state.validation,
						firstName: true
					}
				});
			} else {
				this.setState({
					...this.state,
					validation: {
						...this.state.validation,
						firstName: false
					}
				});
			}
		} else if (field === 'lastName') {
			if (input.value.length > 1) {
				this.setState({
					...this.state,
					validation: {
						...this.state.validation,
						lastName: true
					}
				});
			} else if (input.value.length < 2) {
				this.setState({
					...this.state,
					validation: {
						...this.state.validation,
						lastName: false
					}
				});
			}
		} else if (field === 'email') {
			var emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

			if (emailPattern.test(input.value)) {
				this.setState({
					...this.state,
					validation: {
						...this.state.validation,
						email: true
					}
				});
			} else {
				this.setState({
					...this.state,
					validation: {
						...this.state.validation,
						email: false
					}
				});
			}
		} else if (field === 'address') {
			if (input.value.length > 5) {
				this.setState({
					...this.state,
					validation: {
						...this.state.validation,
						address: true
					}
				});
			} else {
				this.setState({
					...this.state,
					validation: {
						...this.state.validation,
						address: false
					}
				});
			}
		}
	};

	phoneValidation = (phoneNumber) => {
		var pattern = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/g;

		if (pattern.test(phoneNumber)) {
			this.setState({
				validation: {
					...this.state,
					phone: true
				}
			});
		} else {
			this.setState({
				validation: {
					...this.state,
					phone: false
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

	setLoading = (status) => {
		this.setState({
			...this.state,
			isLoading: status
		});
	};

	checkoutNext = () => {
		this.setLoading(true);
	};

	findCustomerByPhone = () => {
		let typedNumber = this.state.customer.phoneNumber;
		let formattedNumber = typedNumber.replace(/-/g, '').replace(/[()]/g, '');
		this.setState({
			...this.state,
			customer: {
				...this.state.customer,
				phoneNumber: formattedNumber
			}
		});

		fetch(`${BASE_URL}/phone/${formattedNumber}`)
			.then((res) => res.json())
			.then((data) => {
				this.setLoading(true);
				const customer = data[0];

				if (data.length > 0) {
					this.setState({
						...this.state,
						firstTimer: false,
						customer: {
							...this.state.customer,
							firstName: customer.firstName,
							lastName: customer.lastName,
							email: customer.email,
							city: customer.city,
							province: customer.province,
							phoneNumber: customer.phoneNumber,
							address: customer.address,
							rewardStatus: customer.rewardStatus,
							numberOfOrders: customer.numberOfOrders,
							totalSpent: customer.totalSpent,
							orders: customer.orders,
							id: customer._id
						}
					});
					setTimeout(() => {
						this.setState({
							isLoading: false,
							displayRewardCard: true
						});
					}, 900);
				} else {
					setTimeout(() => {
						this.setState({
							isLoading: false,
							firstTimer: true,
							displayRewardCard: true
						});
					}, 900);
				}
				if (customer.rewardStatus === 3) {
					this.setState({
						freeClearing: true
					});
				}
			})
			.catch(console.log);
	};

	nextStage = (stage) => {
		if (stage === 'phoneCheck') {
			this.findCustomerByPhone();
		} else if (stage === 'rewardCard') {
			this.rewardCardNext();
		} else if (stage === 'information') {
			this.informationNext();
		} else if (stage === 'checkout') {
			this.checkoutNext();
		}
	};

	onPayment = (amount) => {
		console.log(this.state.customer.firstName + ' paid $' + amount + ' to Powder Hounds');
		this.setLoading(false);

		switch (this.state.orderType) {
			case 'Scheduled':
				this.setState({
					...this.state,
					driveways: this.state.schedule.driveways,
					price: this.state.freeClearing ? 0 : this.state.schedule.price
				});
				break;
			case 'Same Day':
				this.setState({
					...this.state,
					driveways: this.state.sameDay.driveways,
					price: this.state.freeClearing ? 0 : this.state.sameDay.price
				});
				break;
			case 'Priority':
				this.setState({
					...this.state,
					driveways: this.state.priority.driveways,
					price: this.state.freeClearing ? 0 : this.state.priority.price
				});
				break;
			default:
				break;
		}

		const { firstName, lastName, address, email, phoneNumber, city, province } = this.state.customer;
		const { orderType, calendarDate, driveways, price } = this.state;


		const rewardStatus = this.state.customer.rewardStatus === 3 ? 0 : this.state.customer.rewardStatus + 1;
		const numberOfOrders = this.state.customer.numberOfOrders + 1;
		const totalSpent = this.state.customer.totalSpent;

		var moment = require('moment');


		const newOrder2 = {
			firstName: firstName,
			lastName: lastName,
			email: email,
			city: city,
			province: province,
			address: address,
			phoneNumber: phoneNumber,
			orderType: orderType,
			driveways: driveways,
			totalCost: price,
			selectedDate: moment(calendarDate, "x").format("DD MMM YYYY hh:mm a")
		};

		this.setState({
			...this.state,
			customer: {
				...this.state.customer,
				orders: [ ...this.state.customer.orders, newOrder2 ]
			}
		});

		const customer = {
			firstName: firstName,
			lastName: lastName,
			email: email,
			city: city,
			province: province,
			address: address,
			phoneNumber: phoneNumber,
			rewardStatus: rewardStatus,
			numberOfOrders: numberOfOrders,
			totalSpent: totalSpent + amount,
			orders: this.state.customer.orders,
			createdDate: calendarDate
		};

		if (this.state.firstTimer) {
			axios.post(`${BASE_URL}`, customer).then((res) => console.log(res.data));
		} else {
			axios.put(`${BASE_URL}` + '/' + `${this.state.customer.id}`, customer).then((res) => console.log(res.data));
		}

		this.setState({
			...this.state,
			showForm: 3,
			isLoading: false
			// customer: {
			// 	firstName: '',
			// 	lastName: '',
			// 	email: '',
			// 	phoneNumber: '',
			// 	city: 'Saskatoon',
			// 	province: 'Saskatchewan',
			// 	address: '',
			// 	numberOfOrders: null,
			// 	totalSpent: null
			// }
		});
		// this.setModalShow(this.state.orderType, false);
	};

	handleChange = (date) => {
		var moment = require('moment');
		var now = moment();
		let selectedDate = moment(date, 'x').format('DD MMM YYYY');

		if (date < now) {
			const button = document.getElementById('scheduleButton');
			button.style.pointerEvents = 'none';
			this.setState({
				...this.state,
				dateError: true,
				schedule: {
					...this.state.schedule,
					disabled: true
				}
			});
		} else {
			const button = document.getElementById('scheduleButton');
			button.removeAttribute('disabled');
			button.classList.remove('disabled');
			button.style.pointerEvents = '';
			this.setState({
				...this.state,
				schedule: {
					...this.state.schedule,
					disabled: false
				},
				dateError: false,
				displayDate: date
			});
		}

		this.setState({
			calendarDate: date,
			chosenDate: selectedDate
		});
	};

	drivewaySelect = (e) => {
		const plan = e.currentTarget.id;
		const driveways = e.currentTarget.value;

		if (plan === 'schedule') {
			if (driveways === '1') {
				this.setState({
					...this.state,
					driveways: 1,
					[plan]: { ...this.state[plan], price: 30, driveways: 1 }
				});
			} else if (driveways === '2') {
				this.setState({
					...this.state,
					driveways: 2,
					[plan]: { ...this.state[plan], price: 35, driveways: 2 }
				});
			} else {
				this.setState({
					...this.state,
					driveways: 0,
					[plan]: { ...this.state[plan], price: 25, driveways: 0 }
				});
			}
		}

		if (plan === 'sameDay') {
			if (driveways === '1') {
				this.setState({
					...this.state,
					driveways: 1,
					[plan]: { ...this.state[plan], price: 40, driveways: 1 }
				});
			} else if (driveways === '2') {
				this.setState({
					...this.state,
					driveways: 2,
					[plan]: { ...this.state[plan], price: 45, driveways: 2 }
				});
			} else {
				this.setState({
					...this.state,
					driveways: 0,
					[plan]: { ...this.state[plan], price: 35, driveways: 0 }
				});
			}
		}

		if (plan === 'priority') {
			if (driveways === '1') {
				this.setState({
					...this.state,
					driveways: 1,
					[plan]: { ...this.state[plan], price: 50, driveways: 1 }
				});
			} else if (driveways === '2') {
				this.setState({
					...this.state,
					driveways: 2,
					[plan]: { ...this.state[plan], price: 55, driveways: 2 }
				});
			} else {
				this.setState({
					...this.state,
					driveways: 0,
					[plan]: { ...this.state[plan], price: 45, driveways: 0 }
				});
			}
		}
	};

	setModalShow = (selection, showModal) => {
		if (selection === 'schedule') {
			this.setState({
				scheduleModal: showModal,
				orderType: 'Scheduled'
			});
		} else if (selection === 'sameDay') {
			this.setState({
				sameDayModal: showModal,
				orderType: 'Same Day'
			});
		} else if (selection === 'priority') {
			this.setState({
				priorityModal: showModal,
				orderType: 'Priority'
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
											selected={this.state.calendarDate}
											onChange={this.handleChange}
											className="datePicker d-flex justify-content-center"
											dateFormat="MMM dd yyyy"
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
											disabled={this.state.schedule.disabled}
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
											<strong>5pm</strong> cuttoff
										</li>
									</ul>
									<div className="button-container">
										<Button
											className="btn btn-block btn-primary text-uppercase button"
											id="scheduleButton"
											disabled={this.state.sameDay.disabled}
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
											<strong>7pm</strong> cutoff
										</li>
									</ul>
									<div className="button-container">
										<Button
											className="btn btn-block btn-primary text-uppercase button"
											id="scheduleButton"
											disabled={this.state.priority.disabled}
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
					rewardStatus={this.state.customer.rewardStatus}
					numberOfOrders={this.state.customer.numberOfOrders}
					nextStage={this.nextStage}
					showform={this.state.showForm}
					orderType={this.state.orderType}
					displayrewardcard={this.state.displayRewardCard}
					validation={this.state.validation}
					firsttimer={this.state.firstTimer}
					onPayment={this.onPayment}
					options={this.state.schedule}
					label="Scheduled snow clearing"
					chosendate={this.state.chosenDate}
					show={this.state.scheduleModal}
					loading={this.state.isLoading}
					setLoading={this.setLoading}
					isFree={this.state.freeClearing}
					onHide={() => this.setModalShow('schedule', false)}
				/>
				<InfoModal
					customer={this.state.customer}
					onUpdateField={this.updateField}
					rewardStatus={this.state.customer.rewardStatus}
					numberOfOrders={this.state.customer.numberOfOrders}
					nextStage={this.nextStage}
					displayrewardcard={this.state.displayRewardCard}
					showform={this.state.showForm}
					orderType={this.state.orderType}
					validation={this.state.validation}
					firsttimer={this.state.firstTimer}
					onPayment={this.onPayment}
					options={this.state.sameDay}
					label="Same day clearing"
					chosendate={this.state.today}
					show={this.state.sameDayModal}
					loading={this.state.isLoading}
					setLoading={this.setLoading}
					isFree={this.state.freeClearing}
					onHide={() => this.setModalShow('sameDay', false)}
				/>
				<InfoModal
					customer={this.state.customer}
					onUpdateField={this.updateField}
					rewardStatus={this.state.customer.rewardStatus}
					numberOfOrders={this.state.customer.numberOfOrders}
					nextStage={this.nextStage}
					showform={this.state.showForm}
					orderType={this.state.orderType}
					displayrewardcard={this.state.displayRewardCard}
					validation={this.state.validation}
					firsttimer={this.state.firstTimer}
					onPayment={this.onPayment}
					options={this.state.priority}
					label="Priority clearing"
					chosendate={this.state.today}
					show={this.state.priorityModal}
					loading={this.state.isLoading}
					setLoading={this.setLoading}
					isFree={this.state.freeClearing}
					onHide={() => this.setModalShow('priority', false)}
				/>
			</section>
		);
	}
}

export default Pricing;
