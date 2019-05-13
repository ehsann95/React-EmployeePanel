import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

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

					<div className="card">
						<div className="card-header">Edit Employee</div>
						<div className="card-body">
							<form onSubmit={this.onSubmit}>
								<div className="form-group">
									<label htmlFor="firstName">First Name</label>
									<input
										type="text"
										className="form-control"
										name="firstName"
										minLength="2"
										required
										ref={this.firstNameInput}
										defaultValue={employee.firstName}
									/>
								</div>

								<div className="form-group">
									<label htmlFor="lastName">Last Name</label>
									<input
										type="text"
										className="form-control"
										name="lastName"
										minLength="2"
										required
										ref={this.lastNameInput}
										defaultValue={employee.lastName}
									/>
								</div>

								<div className="form-group">
									<label htmlFor="email">Email</label>
									<input
										type="email"
										className="form-control"
										name="email"
										ref={this.emailInput}
										defaultValue={employee.email}
									/>
								</div>

								<div className="form-group">
									<label htmlFor="phone">Phone</label>
									<input
										type="text"
										className="form-control"
										name="phone"
										minLength="10"
										required
										ref={this.phoneInput}
										defaultValue={employee.phone}
									/>
								</div>

								<input type="submit" value="Submit" className="btn btn-primary btn-block" />
							</form>
						</div>
					</div>
				</div>
			);
		} else {
			return <h1>Loading...</h1>;
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
