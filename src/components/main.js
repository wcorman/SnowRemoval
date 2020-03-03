import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import 'react-datepicker/dist/react-datepicker.css';
import { Auth } from 'aws-amplify';
import Amplify, { Analytics, Storage, API } from 'aws-amplify';

import DatePicker from 'react-datepicker';

import axios from 'axios';

import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import InfoModal from './modal';

const DOMAIN = 'localhost:4000';
const API_PREFIX = '/orders';
const BASE_URL = `http://${DOMAIN}${API_PREFIX}`;

class Main extends React.Component {
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
			driveways: 0,
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
			price: 0,
			showForm: 0,
			displayRewardCard: false,
			testUser: {},
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
		const checkTime = () => {
			var moment = require('moment');
			const sameDayCutoff = moment().format('5:00 PM');
			const priorityCutoff = moment().format('7:00 PM');

			let currentTime = moment().format('LT');
			const sameDayOpen = currentTime > sameDayCutoff;
			const priorityOpen = currentTime > priorityCutoff;

			this.setState({
				...this.state,
				sameDay: { ...this.state.sameDay, disabled: sameDayOpen },
				priority: { ...this.state.priority, disabled: priorityOpen }
			});
		};

		checkTime();

		setInterval(checkTime, 10000);

		const getUser = () => {
			const setAttributes = (user) => {
				console.log('THIS IS THE USER: ', user);
				this.setState({
					...this.state,
					firstTimer: !parseInt(user.attributes['custom:numberOfOrders'], 10),
					testUser: {
						id: user.username,
						email: user.attributes.email,
						address: '',
						city: 'Saskatoon',
						name: user.attributes.name,
						phone_number: user.attributes.phone_number,
						'custom:firstName': user.attributes['custom:firstName'],
						'custom:lastName': user.attributes['custom:lastName'],
						'custom:numberOfOrders': parseInt(user.attributes['custom:numberOfOrders'], 10),
						'custom:rewardStatus': parseInt(user.attributes['custom:rewardStatus'], 10),
						'custom:totalSpent': parseInt(user.attributes['custom:totalSpent'], 10)
					}
				});

				return true;
			};
			const noUser = (error) => {
				console.log('ERROR: ', error);
				return false;
			};
			Auth.currentUserInfo().then((user) => setAttributes(user)).catch((err) => noUser(err));
		};

		getUser();
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
			testUser: {
				...this.state.testUser,
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
		let typedNumber = this.state.testUser.phoneNumber;
		console.log(typedNumber);
		const prefix = '+1';
		let formattedNumber = typedNumber.replace(/-/g, '').replace(/[()]/g, '');
		let finalNumber = prefix.concat(formattedNumber).replace(/\s/g, '');
		console.log(finalNumber);
		this.setState({
			...this.state,
			customer: {
				...this.state.customer,
				phoneNumber: finalNumber
			}
		});
		this.setLoading(true);

		Auth.currentAuthenticatedUser({ bypassCache: true })
			.then((user) => {
				return Auth.updateUserAttributes(user, { phone_number: finalNumber });
			})
			.then((data) => console.log(data))
			.then(() => {
				console.log('Phone Number Updated...');
				this.setLoading(false);
			})
			.catch((err) => console.log(err));
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

	makeOrder = () => {
		Auth.currentSession().then((data) => console.log('DATA: ', data)).catch((err) => console.log(err));

		Auth.currentAuthenticatedUser({ bypassCache: true })
			.then((user) => {
				console.log('USER: ', user);
				let rewardStatus = parseInt(user.attributes['custom:rewardStatus'], 10);
				let numberOfOrders = parseInt(user.attributes['custom:numberOfOrders'], 10);
				console.log('rewardStatus: ', rewardStatus);
				console.log('Number of Orders: ', numberOfOrders);

				if (rewardStatus < 3) {
					return Auth.updateUserAttributes(user, {
						'custom:rewardStatus': (rewardStatus + 1).toString(),
						'custom:numberOfOrders': (numberOfOrders + 1).toString()
					});
				} else {
					return Auth.updateUserAttributes(user, {
						'custom:rewardStatus': '0',
						'custom:numberOfOrders': (numberOfOrders + 1).toString()
					});
				}
			})
			.then((data) => console.log(data))
			.catch((err) => console.log(err));
	};

	onPayment = (amount) => {
		console.log(this.state.customer.firstName + ' paid $' + amount + ' to Powder Hounds');
		this.setLoading(false);

		const customerId = this.state.testUser.id;

		const free = this.state.testUser['custom:rewardStatus'] === 3;
		const firstTimer = this.state.testUser['custom:numberOfOrders'] === 0;

		switch (this.state.orderType) {
			case 'Scheduled':
				this.setState({
					...this.state,
					driveways: this.state.schedule.driveways,
					price: free ? 0 : this.state.schedule.price
				});
				break;
			case 'Same Day':
				this.setState({
					...this.state,
					driveways: this.state.sameDay.driveways,
					price: free ? 0 : this.state.sameDay.price
				});
				break;
			case 'Priority':
				this.setState({
					...this.state,
					driveways: this.state.priority.driveways,
					price: free ? 0 : this.state.priority.price
				});
				break;
			default:
				break;
		}

		const { orderType, calendarDate, driveways, price } = this.state;

		const rewardStatus = this.state.freeClearing ? 0 : this.state.customer.rewardStatus + 1;
		const numberOfOrders = this.state.customer.numberOfOrders + 1;
		const totalSpent = this.state.customer.totalSpent;
		console.log('Amount: ', amount);
		console.log('Price: ', price);

		var moment = require('moment');

		const newOrder2 = {
			selectedDate:
				this.state.orderType === 'Same Day' || this.state.orderType === 'Priority'
					? moment().format('MMM Do YYYY, h:mm a')
					: moment(calendarDate, 'x').format('MMM Do YYYY')
		};

		console.log('orders state: ', this.state.customer.orders);

		let newOrdersList = this.state.customer.orders;
		newOrdersList.push(newOrder2);

		const customer = {};

		if (firstTimer) {
			this.post(customerId);
			// axios.post(`${BASE_URL}`, customer).then((res) => console.log(res.data));
		} else {
			this.post(customerId);
			// axios.put(`${BASE_URL}` + '/' + `${this.state.customer.id}`, customer).then((res) => console.log(res.data));
		}

		this.setState({
			...this.state,
			showForm: 3,
			isLoading: false
		});
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

	post = async (customerId) => {
		console.log('calling api');

		let orderList;
		let newOrder = {
			type: this.state.orderType,
			price: this.state.price,
			driveways: this.state.driveways,
			date: 'Aug 23, 2020'
		};

		await this.get(customerId).then((oldOrders) => {
			console.log('TESTING BUTES: ', oldOrders);
			orderList = oldOrders.orders;
			console.log('oldOrders.orders: ', oldOrders.orders);

			orderList.push(newOrder);
			console.log(' Old Array: ', orderList);
			API.post('powderHoundsAPI', '/items', {
				body: {
					customerId: `${customerId}`,
					firstName: `${this.state.testUser['custom:firstName']}`,
					lastName: `${this.state.testUser['custom:lastName']}`,
					orders: orderList
				}
			})
				.then((res) => console.log('Res: ', res))
				.catch((err) => console.log('Error: ', err));
		});

		Auth.currentAuthenticatedUser({ bypassCache: true })
			.then((user) => {
				console.log('USER: ', user);
				let rewardStatus = parseInt(user.attributes['custom:rewardStatus'], 10);
				let numberOfOrders = parseInt(user.attributes['custom:numberOfOrders'], 10);
				console.log('rewardStatus: ', rewardStatus);
				console.log('Number of Orders: ', numberOfOrders);

				if (rewardStatus < 3) {
					return Auth.updateUserAttributes(user, {
						'custom:rewardStatus': (rewardStatus + 1).toString(),
						'custom:numberOfOrders': (numberOfOrders + 1).toString()
					});
				} else {
					return Auth.updateUserAttributes(user, {
						'custom:rewardStatus': '0',
						'custom:numberOfOrders': (numberOfOrders + 1).toString()
					});
				}
			})
			.then((data) => console.log(data))
			.catch((err) => console.log(err));
	};

	get = async (customerId) => {
		console.log('calling api');
		const response = await API.get('powderHoundsAPI', `/items/object/${customerId}`);
		console.log(response.orders);
		return response;
	};

	list = async (customerId) => {
		console.log('calling api');
		const response = await API.get('powderHoundsAPI', `/items/${customerId}`);
		console.log(response);
		return response;
		// console.log(JSON.stringify(response, null, 2));
	};

	render() {
		const dateError = this.state.dateError;
		const customerId = this.state.testUser.id;

		return (
			<section className="pricing py-5">
				<button onClick={() => this.post(customerId)}>POST</button>
				<button onClick={() => this.get(customerId)}>GET</button>
				<button onClick={() => this.list(customerId)}>LIST</button>

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
									<OverlayTrigger
										placement="bottom"
										overlay={<Tooltip id={`tooltip-bottom`}>Open calendar to pick a date</Tooltip>}
									>
										<div className="d-flex justify-content-center">
											<DatePicker
												selected={this.state.calendarDate}
												onChange={this.handleChange}
												className="datePicker d-flex justify-content-center"
												dateFormat="MMM dd yyyy"
												withPortal
											/>
										</div>
									</OverlayTrigger>{' '}
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
					testCustomer={this.state.testUser}
					onUpdateField={this.updateField}
					rewardStatus={this.state.customer.rewardStatus}
					numberOfOrders={this.state.customer.numberOfOrders}
					nextStage={this.nextStage}
					showform={this.state.showForm}
					orderType={this.state.orderType}
					displayrewardcard={this.state.displayRewardCard}
					validation={this.state.validation}
					firstTimer={this.state.firstTimer}
					onPayment={this.onPayment}
					options={this.state.schedule}
					label="Scheduled snow clearing"
					chosendate={this.state.chosenDate}
					show={this.state.scheduleModal}
					loading={this.state.isLoading}
					setLoading={this.setLoading}
					isFree={this.state.testUser['custom:rewardStatus'] === 3}
					onHide={() => this.setModalShow('schedule', false)}
				/>
				<InfoModal
					customer={this.state.customer}
					testCustomer={this.state.testUser}
					onUpdateField={this.updateField}
					rewardStatus={this.state.customer.rewardStatus}
					numberOfOrders={this.state.customer.numberOfOrders}
					nextStage={this.nextStage}
					displayrewardcard={this.state.displayRewardCard}
					showform={this.state.showForm}
					orderType={this.state.orderType}
					validation={this.state.validation}
					firstTimer={this.state.firstTimer}
					onPayment={this.onPayment}
					options={this.state.sameDay}
					label="Same day clearing"
					chosendate={this.state.today}
					show={this.state.sameDayModal}
					loading={this.state.isLoading}
					setLoading={this.setLoading}
					isFree={this.state.testUser['custom:rewardStatus'] === 3}
					onHide={() => this.setModalShow('sameDay', false)}
				/>
				<InfoModal
					customer={this.state.customer}
					testCustomer={this.state.testUser}
					onUpdateField={this.updateField}
					rewardStatus={this.state.customer.rewardStatus}
					numberOfOrders={this.state.customer.numberOfOrders}
					nextStage={this.nextStage}
					showform={this.state.showForm}
					orderType={this.state.orderType}
					displayrewardcard={this.state.displayRewardCard}
					validation={this.state.validation}
					firstTimer={this.state.firstTimer}
					onPayment={this.onPayment}
					options={this.state.priority}
					label="Priority clearing"
					chosendate={this.state.today}
					show={this.state.priorityModal}
					loading={this.state.isLoading}
					setLoading={this.setLoading}
					isFree={this.state.testUser['custom:rewardStatus'] === 3}
					onHide={() => this.setModalShow('priority', false)}
				/>
			</section>
		);
	}
}

export default Main;
