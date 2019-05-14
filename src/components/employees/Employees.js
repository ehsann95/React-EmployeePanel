import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { MDBIcon } from 'mdbreact';

class Employees extends React.Component {
	render() {
		const { employees } = this.props;
		if (employees) {
			return (
				<div>
					<div className="row">
						<div className="col-md-6">
							<h2>
								{' '}
								<i className="fas fa-user" /> Employees
							</h2>
						</div>
						<div className="col-md-6" />
					</div>

					<table className="table table-striped">
						<thead className="thead-inverse">
							<tr>
								<th>Name</th>
								<th>Email</th>
								<th>Phone</th>
								<th />
							</tr>
						</thead>
						<tbody>
							{employees.map(employee => (
								<tr key={employee.id}>
									<td>
										{employee.firstName} {employee.lastName}
									</td>
									<td>{employee.email}</td>
									<td>{employee.phone}</td>
									<td>
										<Link to={`/employee/${employee.id}`} className="btn btn-secondary btn-sm">
											<i className="fas fa-arrow-circle-right" /> Details
										</Link>
									</td>
								</tr>
							))}
						</tbody>
					</table>
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

Employees.propTypes = {
	firestore: PropTypes.object.isRequired,
	employees: PropTypes.array,
};

export default compose(
	firestoreConnect([{ collection: 'employees' }]),
	connect((state, props) => ({
		employees: state.firestore.ordered.employees,
	}))
)(Employees);
