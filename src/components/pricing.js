import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';


class Pricing extends React.Component {
  constructor() {
    super();
    this.state = {schedule: { price: 25, driveways: 0 },
                  sameDay: { price: 35, driveways: 0},
                  priority: { price: 55, driveways: 0}
  };
  }

  drivewaySelect = (e) => {
    console.log(e.currentTarget.id);
    console.log(e.currentTarget.value);
    
    const target = e.currentTarget.id;
    const driveways = e.currentTarget.value;

    if (target === "schedule") {
      if (driveways === "1") {
        this.setState({[target]: { price: 30, driveways: 1 }});
      }
      else if (driveways === "2") {
        this.setState({[target]: { price: 35, driveways: 2 }});
      }
      else {
        this.setState({[target]: { price: 25, driveways: 0 }});
      }
    }

    if (target === "sameDay") {
      if (driveways === "1") {
        this.setState({[target]: { price: 40, driveways: 1 }});
      }
      else if (driveways === "2") {
        this.setState({[target]: { price: 45, driveways: 2 }});
      }
      else {
        this.setState({[target]: { price: 35, driveways: 0 }});
      }
    }

    if (target === "priority") {
      if (driveways === "1") {
        this.setState({[target]: { price: 60, driveways: 1 }});
      }
      else if (driveways === "2") {
        this.setState({[target]: { price: 65, driveways: 2 }});
      }
      else {
        this.setState({[target]: { price: 55, driveways: 0 }});
      }
    }
  }

  render() {
    return (
		<section className="pricing py-5">
			<div className="container">
				<div className="row">
					<div className="col-lg-4">
						<div className="card mb-5 mb-lg-0">
							<div className="card-body">
								<h5 className="card-title text-muted text-uppercase text-center">Schedule Ahead</h5>
								<h6 className="card-price text-center">
									${this.state.schedule.price}
								</h6>
                <div className="d-flex justify-content-center">
                  <form className="">
                    <select defaultValue="0" className="custom-select my-1 mr-sm-2" id="schedule" onChange={this.drivewaySelect}>
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
										</span><strong>Plan ahead when you want to have your snow cleared</strong>
									</li>

									<li>
										<span className="fa-li">
											<i className="fas fa-check" />
										</span>Most cost effective
									</li>
								</ul>
								<a href="#" className="btn btn-block btn-primary text-uppercase">
									Clear that snow!
								</a>
							</div>
						</div>
					</div>

					<div className="col-lg-4">
						<div className="card mb-5 mb-lg-0">
							<div className="card-body">
								<h5 className="card-title text-muted text-uppercase text-center">Same Day Removal</h5>
								<h6 className="card-price text-center">
									${this.state.sameDay.price}
								</h6>

                <div className="d-flex justify-content-center">
                  <form className="">
                    <select defaultValue="0" className="custom-select my-1 mr-sm-2" id="sameDay" onChange={this.drivewaySelect}>
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
								<a href="#" className="btn btn-block btn-primary text-uppercase">
									Clear that snow!
								</a>
							</div>
						</div>
					</div>
          
					<div className="col-lg-4">
						<div className="card">
							<div className="card-body">
								<h5 className="card-title text-muted text-uppercase text-center">Priority Removal</h5>
								<h6 className="card-price text-center">
									${this.state.priority.price}
								</h6>

                <div className="d-flex justify-content-center">
                  <form className="">
                    <select defaultValue="0" className="custom-select my-1 mr-sm-2" id="priority" onChange={this.drivewaySelect}>
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
										<strong>Given priority over other same day clients, snow removed ASAP</strong>
									</li>
									<li>
										<span className="fa-li">
											<i className="fas fa-check" />
										</span>
			                <strong>7pm</strong> deadline for payment			
                  </li>
								</ul>
								<a href="#" className="btn btn-block btn-primary text-uppercase">
									Clear that snow!
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);;
  }
}

export default Pricing;
