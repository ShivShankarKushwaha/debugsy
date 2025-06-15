const DeveloperDashboardPage = () => {
	const myTasksAndBugs = [
		{ id: 1, title: 'Implement user registration flow', date: '05 Feb 2025', priority: 'High', status: 'In Progress', type: 'Task' },
		{ id: 2, title: 'Fix bug: Login redirection issue', date: '03 Feb 2025', priority: 'High', status: 'To Do', type: 'Bug' },
		{ id: 3, title: 'Code review for new API endpoints', date: '07 Feb 2025', priority: 'Medium', status: 'In Review', type: 'Task' },
		{ id: 4, title: 'Database connection error on staging', date: '04 Feb 2025', priority: 'Critical', status: 'In Progress', type: 'Bug' },
		{ id: 5, title: 'Write unit tests for authentication module', date: '06 Feb 2025', priority: 'Low', status: 'To Do', type: 'Task' },
		{ id: 6, title: 'Dashboard UI glitches on mobile', date: '01 Feb 2025', priority: 'Medium', status: 'Done', type: 'Bug' }
	];

	const upcomingDeadlinesDeveloper = [
		{ project: 'User Authentication Module', startDate: '01 Feb 25', endDate: '15 Feb 25' },
		{ project: 'Payment Gateway Integration', startDate: '10 Feb 25', endDate: '28 Feb 25' }
	];

	const myRecentActivity = [
		{ id: 1, description: 'Completed "Dashboard UI glitches on mobile" (Bug)', time: '1h ago' },
		{ id: 2, description: 'Started "Fix bug: Login redirection issue" (Bug)', time: '3h ago' },
		{ id: 3, description: 'Updated "Implement user registration flow" (Task)', time: 'yesterday' }
	];

	return (
		<div className="min-h-screen p-6">
			<h1 className="mb-8 text-3xl font-bold text-gray-800">Developer Dashboard</h1>

			{/* My Tasks/Bugs */}
			<div className="mb-6 rounded-xl bg-white p-6 shadow-sm">
				<h2 className="font-inter mb-4 text-xl font-semibold text-gray-800">My Assigned Tasks & Bugs</h2>
				<div className="overflow-x-auto">
					<table className="min-w-full divide-y divide-gray-200">
						<thead>
							<tr>
								<th className="font-inter bg-gray-50 px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Title</th>
								<th className="font-inter bg-gray-50 px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Type</th>
								<th className="font-inter bg-gray-50 px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Priority</th>
								<th className="font-inter bg-gray-50 px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Status</th>
								<th className="font-inter bg-gray-50 px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Due Date</th>
								<th className="font-inter bg-gray-50 px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Actions</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-200 bg-white">
							{myTasksAndBugs.map((item) => (
								<tr key={item.id}>
									<td className="font-inter px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900">{item.title}</td>
									<td className="font-inter px-6 py-4 text-sm whitespace-nowrap text-gray-500">{item.type}</td>
									<td className="font-inter px-6 py-4 text-sm whitespace-nowrap">
										<span
											className={`inline-flex rounded-full px-2 text-xs leading-5 font-semibold ${
												item.priority === 'High'
													? 'bg-red-100 text-red-800'
													: item.priority === 'Critical'
														? 'bg-red-200 text-red-900'
														: item.priority === 'Medium'
															? 'bg-yellow-100 text-yellow-800'
															: 'bg-green-100 text-green-800'
											}`}
										>
											{item.priority}
										</span>
									</td>
									<td className="font-inter px-6 py-4 text-sm whitespace-nowrap">
										<span
											className={`inline-flex rounded-full px-2 text-xs leading-5 font-semibold ${
												item.status === 'In Progress'
													? 'bg-blue-100 text-blue-800'
													: item.status === 'To Do'
														? 'bg-gray-100 text-gray-800'
														: item.status === 'In Review'
															? 'bg-yellow-100 text-yellow-800'
															: 'bg-green-100 text-green-800'
											}`}
										>
											{item.status}
										</span>
									</td>
									<td className="font-inter px-6 py-4 text-sm whitespace-nowrap text-gray-500">{item.date}</td>
									<td className="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
										<button className="font-inter mr-2 text-indigo-600 hover:text-indigo-900">Edit</button>
										<button className="font-inter text-red-600 hover:text-red-900">Delete</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
				{/* Upcoming Deadlines for Developer */}
				<div className="rounded-xl bg-white p-6 shadow-sm">
					<h2 className="font-inter mb-4 text-xl font-semibold text-gray-800">My Upcoming Deadlines</h2>
					<div className="overflow-x-auto">
						<table className="min-w-full divide-y divide-gray-200">
							<thead>
								<tr>
									<th className="font-inter bg-gray-50 px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Project</th>
									<th className="font-inter bg-gray-50 px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">End Date</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-gray-200 bg-white">
								{upcomingDeadlinesDeveloper.map((deadline, index) => (
									<tr key={index}>
										<td className="font-inter px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900">{deadline.project}</td>
										<td className="font-inter px-6 py-4 text-sm whitespace-nowrap text-gray-500">{deadline.endDate}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>

				{/* My Recent Activity */}
				<div className="rounded-xl bg-white p-6 shadow-sm">
					<h2 className="font-inter mb-4 text-xl font-semibold text-gray-800">My Recent Activity</h2>
					<ul className="space-y-3">
						{myRecentActivity.map((activity) => (
							<li key={activity.id} className="font-inter flex items-center justify-between border-b border-gray-200 pb-2 text-gray-700">
								<span>{activity.description}</span>
								<span className="text-xs text-gray-500">{activity.time}</span>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};
export default DeveloperDashboardPage;
