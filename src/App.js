import React from 'react';
import './App.css';
import AppNavbar from './components/layout/AppNavbar';
import Dashboard from './components/layout/Dashboard';
import AddEmployee from './components/employees/AddEmployee';
import EmployeeDetails from './components/employees/EmployeeDetails';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import EditEmployee from './components/employees/EditEmployee';

function App() {
	return (
		<Provider store={store}>
			<Router>
				<div className="App">
					<AppNavbar />
					<div className="container">
						<Switch>
							<Route path="/" exact component={Dashboard} />
							<Route path="/client/add" exact component={AddEmployee} />
							<Route path="/employee/:id" exact component={EmployeeDetails} />
							<Route path="/employee/edit/:id" exact component={EditEmployee} />
						</Switch>
					</div>
				</div>
			</Router>
		</Provider>
	);
}

export default App;
