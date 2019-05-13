import React from 'react';
import Employees from '../employees/Employees';
import Sidebar from '../layout/Sidebar';

export default () => {
	return (
		<div className="row">
			<div className="col-md-10">
				<Employees />
			</div>
			<div className="col-md-2">
				<Sidebar />
			</div>
		</div>
	);
};
