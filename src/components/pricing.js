import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Button from 'react-bootstrap/Button';

import InfoModal from '../components/modal';

class Pricing extends React.Component {
	constructor() {
		super();

		const today = new Date();

		var displayDate = new Date(parseInt(today.setDate(today.getDate() + 1), 10));

		this.state = {
			schedule: { price: 25, driveways: 0 },
			sameDay: { price: 35, driveways: 0 },
			priority: { price: 45, driveways: 0 },
			startDate: today.setDate(today.getDate() + 0.5),
			displayDate: displayDate,
			dateError: false,
			modalShow: false
		};
	}

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
				displayDate: date,
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
				this.setState({ [plan]: { price: 60, driveways: 0 } });
			}
		}
	};

	setModalShow = (showModal) => {
			this.setState({
				modalShow: showModal
			});
	}

	render() {
		const dateError = this.state.dateError;

		return (
			<section className="pricing py-5">
				<div className="container">
					<div className="row">
						<div className="col-lg-4">
							<div className="card mb-5 mb-lg-0">
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
												<option>Driveway?</option>
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
												<option>Driveway?</option>
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
										<a href="#" className="btn btn-block btn-primary text-uppercase button">
											Clear that snow!
										</a>
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
												<option>Driveway?</option>
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
												Given priority over other same day clients, snow removed ASAP
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
										<a href="#" className="btn btn-block btn-primary text-uppercase button">
											Clear that snow!
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<Button variant="primary" onClick={() => this.setModalShow(true)}>
					{this.state.displayDate.toDateString()}
				</Button>

				<InfoModal chosendate={this.state.displayDate.toDateString()} show={this.state.modalShow} onHide={() => this.setModalShow(false)} />
			</section>
		);
	}
}

export default Pricing;
