import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { MDBIcon } from 'mdbreact';

class EmployeeDetails extends Component {
	onDeleteClick = () => {
		const { employee, firestore, history } = this.props;

		firestore.delete({ collection: 'employees', doc: employee.id }).then(history.push('/'));
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
						<div className="col-md-6">
							<div className="btn-group float-right">
								<Link to={`/employee/edit/${employee.id}`} className="btn btn-dark">
									Edit
								</Link>
								<button onClick={this.onDeleteClick} className="btn btn-danger">
									Delete
								</button>
							</div>
						</div>
					</div>
					<hr />
					<div className="card">
						<h3 className="card-header">
							{employee.firstName} {employee.lastName}
						</h3>
						<div className="card-body">
							<div className="row">
								<div className="col-md-8 col-sm-6">
									<h4>
										Client ID: <span className="text-secondary">{employee.id}</span>
									</h4>
								</div>
							</div>

							<hr />
							<ul className="list-group">
								<li className="list-group-item">Contact Email: {employee.email}</li>
								<li className="list-group-item">Contact Phone: {employee.phone}</li>
							</ul>
						</div>
					</div>
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

EmployeeDetails.propTypes = {
	firestore: PropTypes.object.isRequired,
};

export default compose(
	firestoreConnect(props => [
		{
			collection: 'employees',
			storeAs: 'employee',
			doc: props.match.params.id,
		},
	]),
	connect(({ firestore: { ordered } }, props) => ({
		employee: ordered.employee && ordered.employee[0],
	}))
)(EmployeeDetails);
