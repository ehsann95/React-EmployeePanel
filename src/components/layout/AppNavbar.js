import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { MDBNavbar, MDBNavbarBrand } from 'mdbreact';

class AppNavbar extends Component {
	render() {
		return (
			// <nav className="navbar navbar-expand-md navbar-dark bg-primary mb-4">
			// 	<div className="container">
			// 		<Link to="/" className="navbar-brand">
			// 			EmployeePanel
			// 		</Link>
			// 		<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarMain">
			// 			<span className="navbar-toggler-icon" />
			// 		</button>
			// 		<div className="collapse navbar-collapse" id="navbarMain">
			// 			<ul className="navbar-nav mr-auto">
			// 				<li className="nav-item">
			// 					<Link to="/" className="nav-link">
			// 						Dashboard
			// 					</Link>
			// 				</li>
			// 			</ul>
			// 		</div>
			// 	</div>
			// </nav>
			<MDBNavbar color="purple" style={{ marginBottom: '20px' }} dark>
				<MDBNavbarBrand>
					<Link to="/" className="navbar-brand">
						<h3>Employee Panel</h3>
					</Link>
				</MDBNavbarBrand>
			</MDBNavbar>
		);
	}
}
export default AppNavbar;
