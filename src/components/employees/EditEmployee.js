import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBIcon } from 'mdbreact';

class EditEmployee extends Component {
	constructor(props) {
		super(props);

		this.firstNameInput = React.createRef();
		this.lastNameInput = React.createRef();
		this.emailInput = React.createRef();
		this.phoneInput = React.createRef();
		this.balanceInput = React.createRef();
	}

	onSubmit = e => {
		e.preventDefault();

		const { employee, firestore, history } = this.props;

		// Updated Client
		const updEmployee = {
			firstName: this.firstNameInput.current.value,
			lastName: this.lastNameInput.current.value,
			email: this.emailInput.current.value,
			phone: this.phoneInput.current.value,
		};

		// Update client in firestore
		firestore.update({ collection: 'employees', doc: employee.id }, updEmployee).then(history.push('/'));
	};

	render() {
		const { employee } = this.props;

		if (employee) {
			return (
				<div>
					<div className="row">
						<div className="col-md-6">
							<Link to="/" className="btn btn-link">
								<i className="fas fa-arrow-circle-left" /> Back To Dashboard
							</Link>
						</div>
					</div>

					<MDBContainer>
						<MDBRow>
							<MDBCol md="12">
								<MDBCard>
									<MDBCardBody>
										<form onSubmit={this.onSubmit}>
											<p className="h4 text-center py-4">Edit Employee</p>
											<label
												htmlFor="defaultFormCardFirstNameEx"
												className="grey-text font-weight-light"
											>
												Your Firstname
											</label>
											<input
												type="text"
												id="defaultFormCardLastNameEx"
												className="form-control"
												name="firstName"
												minLength="2"
												required
												ref={this.firstNameInput}
												defaultValue={employee.firstName}
											/>
											<br />
											<label
												htmlFor="defaultFormCardLastNameEx"
												className="grey-text font-weight-light"
											>
												Your Lastname
											</label>
											<input
												type="text"
												id="defaultFormCardFirstNameEx"
												className="form-control"
												name="lastName"
												minLength="2"
												required
												ref={this.lastNameInput}
												defaultValue={employee.lastName}
											/>
											<br />
											<label
												htmlFor="defaultFormCardEmailEx"
												className="grey-text font-weight-light"
											>
												Your Email
											</label>
											<input
												type="email"
												id="defaultFormCardEmailEx"
												className="form-control"
												name="email"
												ref={this.emailInput}
												defaultValue={employee.email}
											/>

											<br />
											<label
												htmlFor="defaultFormCardPhoneEx"
												className="grey-text font-weight-light"
											>
												Your Phone
											</label>
											<input
												type="phone"
												id="defaultFormCardPhoneEx"
												className="form-control"
												name="phone"
												ref={this.phoneInput}
												defaultValue={employee.phone}
											/>
											<div className="text-center py-4 mt-3">
												<MDBBtn className="btn btn-outline-purple btn-block" type="submit">
													Submit
													<MDBIcon far icon="paper-plane" className="ml-2" />
												</MDBBtn>
											</div>
										</form>
									</MDBCardBody>
								</MDBCard>
							</MDBCol>
						</MDBRow>
					</MDBContainer>
				</div>
			);
		} else {
			return (
				<div className="row mb-4">
					<div className="col-6 " />
					<MDBIcon icon="spinner" spin size="3x" fixed />
					<span className="sr-only">Loading...</span>
				</div>
			);
		}
	}
}

EditEmployee.propTypes = {
	firestore: PropTypes.object.isRequired,
};

export default compose(
	firestoreConnect(props => [{ collection: 'employees', storeAs: 'employee', doc: props.match.params.id }]),
	connect(({ firestore: { ordered }, settings }, props) => ({
		employee: ordered.employee && ordered.employee[0],
		settings,
	}))
)(EditEmployee);
