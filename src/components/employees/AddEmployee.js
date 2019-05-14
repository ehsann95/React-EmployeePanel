import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';

class AddEmployee extends Component {
	state = {
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
	};

	onSubmit = e => {
		e.preventDefault();

		const newEmployee = this.state;

		const { firestore, history } = this.props;

		firestore.add({ collection: 'employees' }, newEmployee).then(() => history.push('/'));
	};

	onChange = e => this.setState({ [e.target.name]: e.target.value });

	render() {
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
										<p className="h4 text-center py-4">Add Employee</p>
										<div className="grey-text">
											<MDBInput
												label="Your First Name"
												icon="user"
												group
												type="text"
												name="firstName"
												validate
												error="wrong"
												success="right"
												onChange={this.onChange}
												value={this.state.firstName}
											/>
											<MDBInput
												label="Your Last Name"
												icon="user"
												group
												type="text"
												name="lastName"
												validate
												error="wrong"
												success="right"
												onChange={this.onChange}
												value={this.state.lastName}
											/>
											<MDBInput
												label="Your Email"
												icon="envelope"
												group
												type="email"
												name="email"
												validate
												error="wrong"
												success="right"
												onChange={this.onChange}
												value={this.state.email}
											/>
											<MDBInput
												label="Your Phone"
												icon="phone"
												group
												type="text"
												name="phone"
												validate
												error="wrong"
												success="right"
												onChange={this.onChange}
												value={this.state.phone}
											/>
										</div>
										<div className="text-center py-4 mt-3">
											<MDBBtn color="cyan" className="btn-block" type="submit">
												Submit
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
	}
}
AddEmployee.propTypes = {
	firestore: PropTypes.object.isRequired,
	settings: PropTypes.object.isRequired,
};

export default firestoreConnect()(AddEmployee);
