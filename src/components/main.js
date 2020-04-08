import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import 'react-datepicker/dist/react-datepicker.css';
import { Auth, API } from 'aws-amplify';

import DatePicker from 'react-datepicker';

import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import InfoModal from './modal';

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
			testUser: {},
			validation: {
				phone: false,
				address: false
			},
			orderType: null,
			firstTimer: false,
			isLoading: false
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
						id: user.attributes.sub,
						email: user.attributes.email,
						address: '',
						city: 'Saskatoon',
						province: 'Saskatchewan',
						name: user.attributes.name,
						// phone_number: user.attributes.phone_number,
						phone_check: false,
						phoneOptIn: user.attributes['custom:phoneOpt'],
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
			Auth.currentUserInfo()
				.then((user) => {
					setAttributes(user);

					if (!this.state.testUser['custom:firstName']) {
						// For first time Social login to make sure requires params are passed to state
						console.log('FIRST TIME SOCIAL LOGIN...');
						let fullName = this.state.testUser.name;
						let firstName;
						let lastName;
						let nameArray = fullName.split(/(\s+)/).filter(function(e) {
							return e.trim().length > 0;
						});
						console.log(nameArray);

						firstName = nameArray[0];
						lastName = nameArray.slice(-1)[0];
						console.log('first!!', firstName);
						console.log('last!!', lastName);
						Auth.currentAuthenticatedUser({ bypassCache: true })
							.then((user) => {
								Auth.updateUserAttributes(user, {
									'custom:firstName': firstName,
									'custom:lastName': lastName,
									'custom:rewardStatus': '0',
									'custom:totalSpent': '0',
									'custom:totalSpent': '0',
									'custom:phoneOpt': 'true'
								});

								this.setState({
									...this.state,
									firstTimer: !parseInt(user.attributes['custom:numberOfOrders'], 10),
									testUser: {
										id: user.attributes.sub,
										email: user.attributes.email,
										address: '',
										city: 'Saskatoon',
										province: 'Saskatchewan',
										name: user.attributes.name,
										// phone_number: user.attributes.phone_number,
										phone_check: false,
										'custom:firstName': user.attributes['custom:firstName'],
										'custom:lastName': user.attributes['custom:lastName'],
										phoneOptIn: user.attributes['custom:phoneOpt'],
										'custom:numberOfOrders': 2,
										'custom:rewardStatus': 2,
										'custom:totalSpent': 0
									}
								});
								API.post('powderHoundsAPI', '/items', {
									body: {
										customerId: user.attributes.sub,
										firstName: user.attributes['custom:firstName'],
										lastName: user.attributes['custom:lastName'],
										orders: []
									}
								})
									.then((res) => console.log('Res: ', res))
									.catch((err) => console.log('Error: ', err));
							})
							.then((data) => console.log(data))
							.catch((err) => console.log(err));
					}
				})
				.then(() => {
					if (!this.state.testUser['custom:numberOfOrders']) {
						console.log('custom:numberOfOrders is present');
						API.post('powderHoundsAPI', '/items', {
							body: {
								customerId: this.state.testUser.id,
								firstName: this.state.testUser['custom:firstName'],
								lastName: this.state.testUser['custom:lastName'],
								orders: []
							}
						})
							.then((res) => console.log('Res: ', res))
							.catch((err) => console.log('Error: ', err));
					}
				})
				.catch((err) => noUser(err));
		};

		getUser();
	}

	updateField = (input) => {
		const field = input.id;

		if (field === 'phoneNumber') {
			this.phoneValidation(input.value);
			this.setState({
				testUser: {
					...this.state.testUser,
					[field]: input.value
				}
			});
		} else if (field === 'phoneOptIn') {
			const flip = !this.state.testUser.phoneOptIn;

			this.setState({
				...this.state,
				testUser: {
					...this.state.testUser,
					phoneOptIn: flip
				}
			});
		} else {
			this.fieldValidation(input);
			this.setState({
				testUser: {
					...this.state.testUser,
					[field]: input.value
				}
			});
		}
	};

	fieldValidation = (input) => {
		const field = input.id;

		if (field === 'address') {
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
		let optIn = this.state.testUser.phoneOptIn;
		let typedNumber = this.state.testUser.phoneNumber;
		const prefix = '+1';
		let formattedNumber = typedNumber.replace(/-/g, '').replace(/[()]/g, '');
		let finalNumber = prefix.concat(formattedNumber).replace(/\s/g, '');

		this.setLoading(true);

		Auth.currentAuthenticatedUser({ bypassCache: true })
			.then((user) => {
				Auth.updateUserAttributes(user, {
					phone_number: finalNumber,
					'custom:phoneOpt': optIn ? 'true' : 'false'
				});
			})
			.then((data) => console.log(data))
			.then(() => {
				this.setState({
					...this.state,
					testUser: {
						...this.state.testUser,
						phone_number: finalNumber
					}
				});
				this.setLoading(false);
				console.log('Phone Number Updated...');
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

	onPayment = (amount) => {
		console.log(this.state.testUser['custom:firstName'] + ' paid $' + amount + ' to Powder Hounds');
		this.setLoading(false);

		const customerId = this.state.testUser.id;

		this.makeOrder(customerId);

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
		const free = this.state.testUser['custom:rewardStatus'] === 3;

		if (selection === 'schedule') {
			this.setState({
				scheduleModal: showModal,
				orderType: 'Scheduled',
				price: free ? 0 : this.state.schedule.price
			});
		} else if (selection === 'sameDay') {
			this.setState({
				sameDayModal: showModal,
				orderType: 'Same Day',
				price: free ? 0 : this.state.sameDay.price
			});
		} else if (selection === 'priority') {
			this.setState({
				priorityModal: showModal,
				orderType: 'Priority',
				price: free ? 0 : this.state.priority.price
			});
		}
	};

	makeOrder = async (customerId) => {
		var moment = require('moment');

		const selectedDate =
			this.state.orderType === 'Same Day' || this.state.orderType === 'Priority'
				? moment().format('MMM Do YYYY, h:mm a')
				: moment(this.state.calendarDate, 'x').format('MMM Do YYYY');

		switch (this.state.orderType) {
			case 'Scheduled':
				this.setState({
					...this.state,
					driveways: this.state.schedule.driveways,
					price: this.state.schedule.price
				});
				break;
			case 'Same Day':
				this.setState({
					...this.state,
					driveways: this.state.sameDay.driveways,
					price: this.state.sameDay.price
				});
				break;
			case 'Priority':
				this.setState({
					...this.state,
					driveways: this.state.priority.driveways,
					price: this.state.priority.price
				});
				break;
			default:
				break;
		}

		let orderList;
		let newOrder = {
			type: this.state.orderType,
			price: this.state.price,
			driveways: this.state.driveways,
			date: selectedDate,
			name: this.state.testUser.name,
			city: this.state.testUser.city,
			address: this.state.testUser.address,
			phone: this.state.testUser.phone_number,
			email: this.state.testUser.email
		};

		await this.get(customerId).then((oldOrders) => {
			console.log('TESTING BUTES: ', oldOrders);
			orderList = oldOrders.orders;
			console.log('oldOrders.orders: ', oldOrders.orders);
			const firstName = this.state.testUser['custom:firstName'];
			const lastName = this.state.testUser['custom:lastName'];

			orderList.push(newOrder);
			console.log(' Old Array: ', orderList);

			async function updateDatabase() {
				return await API.post('powderHoundsAPI', '/items', {
					body: {
						customerId: `${customerId}`,
						firstName: firstName,
						lastName: lastName,
						orders: orderList
					}
				});
			}

			updateDatabase();

			// SEND SMS
			const orderInfo = {
				type: this.state.orderType,
				price: this.state.price,
				driveways: this.state.driveways,
				date: selectedDate,
				name: this.state.testUser.name,
				firstName: `${this.state.testUser['custom:firstName']}`,
				address: this.state.testUser.address,
				phoneNumber: this.state.testUser.phone_number,
				email: this.state.testUser.email,
				optIn: this.state.testUser.phoneOptIn
			};

			API.post('powderHoundsAPI', '/messages', {
				body: orderInfo
			});
		});

		Auth.currentAuthenticatedUser({ bypassCache: true })
			.then((user) => {
				let rewardStatus = parseInt(user.attributes['custom:rewardStatus'], 10);
				let numberOfOrders = parseInt(user.attributes['custom:numberOfOrders'], 10);

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
		return response;
	};

	list = async (customerId) => {
		console.log('calling api');
		const response = await API.get('powderHoundsAPI', `/items/${customerId}`);
		return response;
	};

	render() {
		const dateError = this.state.dateError;

		return (
			<section className="pricing py-5">
				{/* <button onClick={() => this.makeOrder(customerId)}>POST</button>
				<button onClick={() => this.get(customerId)}>GET</button>
				<button onClick={() => this.list(customerId)}>LIST</button> */}

				<div className="container options">
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
												disabledKeyboardNavigation
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
					testCustomer={this.state.testUser}
					onUpdateField={this.updateField}
					nextStage={this.nextStage}
					showform={this.state.showForm}
					orderType={this.state.orderType}
					validation={this.state.validation}
					firstTimer={this.state.firstTimer}
					onPayment={this.onPayment}
					options={this.state.schedule}
					label="Scheduled snow clearing"
					chosendate={this.state.chosenDate}
					show={this.state.scheduleModal}
					loading={this.state.isLoading}
					setLoading={this.setLoading}
					onHide={() => this.setModalShow('schedule', false)}
					optIn={this.state.testUser.phoneOptIn}
				/>
				<InfoModal
					testCustomer={this.state.testUser}
					onUpdateField={this.updateField}
					nextStage={this.nextStage}
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
					onHide={() => this.setModalShow('sameDay', false)}
					optIn={this.state.testUser.phoneOptIn}
				/>
				<InfoModal
					testCustomer={this.state.testUser}
					onUpdateField={this.updateField}
					nextStage={this.nextStage}
					showform={this.state.showForm}
					orderType={this.state.orderType}
					validation={this.state.validation}
					firstTimer={this.state.firstTimer}
					onPayment={this.onPayment}
					options={this.state.priority}
					label="Priority clearing"
					chosendate={this.state.today}
					show={this.state.priorityModal}
					loading={this.state.isLoading}
					setLoading={this.setLoading}
					onHide={() => this.setModalShow('priority', false)}
					optIn={this.state.testUser.phoneOptIn}
				/>
			</section>
		);
	}
}

export default Main;
