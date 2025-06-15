'use client';
import React from 'react';
import PieChart from '@/Components/PieChart';
import Image from 'next/image';
import TrendLineChart from '@/Components/TrendLineChart';
import { deleteReport, selectAllReports } from '@/redux/slices/reportSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { selectAllProjects } from '@/redux/slices/projectSlice';
import { selectTeamMembers } from '@/redux/slices/teamSlice';

const OverView = () => {
	const dispatch = useDispatch();
	const { user } = useSelector((state: RootState) => state.auth);
	const teamReports = useSelector(selectAllReports);
	const projects = useSelector(selectAllProjects);
	const teamMembers = useSelector(selectTeamMembers).slice(0, 5);
	const myReports = teamReports.filter((report) => report.assignedTo === user?.username);
	const managerUpcomingDeadlines = projects.filter((report: { endDate: string }) => new Date(report.endDate).getTime() > Date.now());
	const userRole = user?.role?.toLowerCase();

	const managerTaskCategories = [
		{ name: 'Open Bugs', count: 7, bgColor: '#FF5722', textColor: '#FEF9C3' },
		{ name: 'Closed Bugs', count: 18, bgColor: '#4CAF50', textColor: '#DBEAFE' },
		{ name: 'Total Projects', count: 25, bgColor: '#2196F3', textColor: '#D1FAE5' },
		{ name: 'Tasks Due Today', count: 3, bgColor: '#FFC107', textColor: '#FECACA' }
	];

	const managerChartData = {
		labels: ['Done', 'To Do', 'In Review', 'In Progress'],
		datasets: [
			{
				label: 'Tickets',
				data: [4, 4, 4, 10],
				backgroundColor: ['#4CAF50', '#2196F3', '#FFC107', '#FF5722'],
				hoverOffset: 4,
				spacing: 0.5,
				borderWidth: 0,
				borderColor: 'transparent'
			}
		]
	};

	const developerUpcomingDeadlines = [
		{ project: 'User Authentication Module', startDate: '01 Feb 25', endDate: '15 Feb 25' },
		{ project: 'Payment Gateway Integration', startDate: '10 Feb 25', endDate: '28 Feb 25' }
	];

	const developerRecentActivity = [
		{ id: 1, description: 'Completed "Dashboard UI glitches on mobile" (Bug)', time: '1h ago' },
		{ id: 2, description: 'Started "Fix bug: Login redirection issue" (Bug)', time: '3h ago' },
		{ id: 3, description: 'Updated "Implement user registration flow" (Task)', time: 'yesterday' }
	];

	return (
		<div className="mt-36 min-h-screen max-w-[100vw] p-2 sm:max-w-[93vw] sm:p-6 lg:mt-auto lg:ml-40 lg:max-w-[60vw] 2xl:max-w-full">
			<h1 className="mb-8 text-xl font-bold text-gray-300 lg:text-3xl">{userRole === 'manager' ? 'Manager Dashboard' : 'Developer Dashboard'}</h1>
			{userRole === 'manager' && (
				<>
					<div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
						{managerTaskCategories.map((category) => (
							<div key={category.name} className={`flex items-center justify-between rounded-xl bg-gray-800 p-6 shadow-sm`}>
								<div>
									<p className="font-inter text-sm text-gray-500">{category.name}</p>
									<p style={{ color: `${category.textColor}` }} className={`font-inter text-3xl font-bold`}>
										{category.count}
									</p>
								</div>
							</div>
						))}
						<PieChart chartData={managerChartData} />
						<TrendLineChart />
					</div>
					<div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
						{/* My Tasks Section */}
						<div className="rounded-xl bg-gray-800 p-6 shadow-sm lg:col-span-2">
							<h2 className="font-inter mb-4 text-xl font-semibold text-gray-300">Managerial Tasks</h2>
							<ul className="space-y-4">
								{teamReports.map((task) => (
									<li key={task.id} className="flex flex-col items-center justify-between gap-5 border-b border-gray-700 pb-2 lg:flex-row lg:gap-0">
										<div className="flex items-center">
											<input type="checkbox" className="form-checkbox mr-3 h-5 w-5 rounded text-indigo-600" />
											<div>
												<p className="font-inter font-medium text-gray-300">{task.reportTitle}</p>
												<p className="font-inter text-sm text-gray-500">{task.date}</p>
											</div>
										</div>
										<div className="flex items-center space-x-3">
											<span
												className={`font-inter rounded-full px-3 py-1 text-xs font-semibold ${
													task.priority === 'High' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
												}`}
											>
												{task.priority}
											</span>
											<span
												className={`font-inter rounded-full px-3 py-1 text-xs font-semibold ${
													task.status === 'Done'
														? 'bg-green-100 text-green-700'
														: task.status === 'In Review'
															? 'bg-yellow-100 text-yellow-700'
															: task.status === 'To Do'
																? 'bg-blue-100 text-blue-700'
																: 'bg-indigo-100 text-indigo-700'
												}`}
											>
												{task.status}
											</span>
										</div>
									</li>
								))}
							</ul>
						</div>

						{/* Team Section */}
						<div className="rounded-xl bg-gray-800 p-6 shadow-sm">
							<h2 className="font-inter mb-4 text-xl font-semibold text-gray-300">Team</h2>
							<ul className="space-y-3">
								{teamMembers.map((member) => (
									<li key={member.name} className="flex items-center">
										<Image width={32} height={32} src={member.avatar} alt={member.name} className="mr-3 h-8 w-8 rounded-full border" />
										<span className="font-inter text-gray-300">{member.name}</span>
									</li>
								))}
							</ul>
						</div>

						{/* Upcoming Deadlines Section */}
						<div className="rounded-xl bg-gray-800 p-6 shadow-sm lg:col-span-2">
							<h2 className="font-inter mb-4 text-xl font-semibold text-gray-300">Key Deadlines</h2>
							<div className="overflow-x-auto">
								<table className="min-w-full divide-y divide-gray-700">
									<thead>
										<tr>
											<th className="font-inter rounded-tl-lg bg-gray-900/50 px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
												Project
											</th>
											<th className="font-inter bg-gray-900/50 px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
												Start Date
											</th>
											<th className="font-inter rounded-tr-lg bg-gray-900/50 px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
												End Date
											</th>
										</tr>
									</thead>
									<tbody className="divide-y divide-gray-700 bg-gray-800">
										{managerUpcomingDeadlines.map((deadline, index) => (
											<tr key={index}>
												<td className="font-inter px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-200">{deadline.name}</td>
												<td className="font-inter px-6 py-4 text-sm whitespace-nowrap text-gray-200">{deadline.startDate}</td>
												<td className="font-inter px-6 py-4 text-sm whitespace-nowrap text-gray-200">{deadline.endDate}</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
							<p className="mt-2 text-xs text-gray-500 md:hidden">Scroll horizontally to see more columns.</p>
						</div>

						{/* Project By Priority (Bar Chart Placeholder) */}
						<div className="relative rounded-xl bg-gray-800 p-6 shadow-sm">
							<h2 className="font-inter mb-4 text-xl font-semibold text-gray-300">Project By Priority</h2>

							<div className="pointer-events-none absolute top-12 right-0 bottom-13 left-0">
								{[0, 'Low', 'Medium', 'High'].map((val, index) => (
									<div
										key={val}
										className="absolute right-0 left-4 border-t border-gray-700 text-xs text-gray-600"
										style={{ bottom: `${index * 40}px` }}
									>
										<span className="ml-1">{val}</span>
									</div>
								))}
							</div>

							{/* Bar chart */}
							<div className="relative z-10 flex h-48 items-end justify-around pb-4">
								{[
									{ value: 15, color: 'bg-emerald-600' },
									{ value: 28, color: 'bg-emerald-500' },
									{ value: 42, color: 'bg-emerald-400' }
								].map((item, idx) => (
									<div key={idx} className="relative flex flex-col items-center">
										<div className={`w-8 rounded-md ${item.color}`} style={{ height: `${item.value * 3}px` }}></div>
										<span className="font-inter mt-1 text-xs text-gray-500">{item.value}</span>
									</div>
								))}
							</div>
						</div>
					</div>
				</>
			)}
			{userRole === 'developer' && (
				<>
					<div className="mb-6 rounded-xl bg-gray-800 p-6 shadow-sm">
						<h2 className="font-inter mb-4 text-xl font-semibold text-gray-300">My Assigned Tasks & Bugs</h2>
						<div className="overflow-x-auto">
							<table className="w-full divide-y divide-gray-700">
								<thead>
									<tr>
										<th className="font-inter bg-gray-900/50 px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
											Title
										</th>
										<th className="font-inter bg-gray-900/50 px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Type</th>
										<th className="font-inter bg-gray-900/50 px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
											Priority
										</th>
										<th className="font-inter bg-gray-900/50 px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
											Status
										</th>
										<th className="font-inter bg-gray-900/50 px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
											Due Date
										</th>
										<th className="font-inter bg-gray-900/50 px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
											Actions
										</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-gray-700 bg-gray-800">
									{myReports.map((item) => (
										<tr key={item.id}>
											<td className="font-inter px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-200">{item.reportTitle}</td>
											<td className="font-inter px-6 py-4 text-sm whitespace-nowrap text-gray-200">{item.reportType}</td>
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
											<td className="font-inter px-6 py-4 text-sm whitespace-nowrap text-gray-200">{item.date}</td>
											<td className="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
												<button className="font-inter mr-2 cursor-pointer text-indigo-400 hover:text-indigo-600">Edit</button>
												<button
													onClick={() => {
														dispatch(deleteReport(item?.id));
													}}
													className="font-inter cursor-pointer text-red-400 hover:text-red-600"
												>
													Delete
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
						<p className="mt-2 text-xs text-gray-500 md:hidden">Scroll horizontally to see more columns.</p>
					</div>

					<div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
						{/* Upcoming Deadlines for Developer */}
						<div className="rounded-xl bg-gray-800 p-6 shadow-sm">
							<h2 className="font-inter mb-4 text-xl font-semibold text-gray-300">My Upcoming Deadlines</h2>
							<div className="overflow-x-auto">
								<table className="min-w-full divide-y divide-gray-700">
									<thead>
										<tr>
											<th className="bg-gray-900/50 px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Project</th>
											<th className="bg-gray-900/50 px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">End Date</th>
										</tr>
									</thead>
									<tbody className="divide-y divide-gray-700 bg-gray-800">
										{developerUpcomingDeadlines.map((deadline, index) => (
											<tr key={index}>
												<td className="font-inter px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-200">{deadline.project}</td>
												<td className="font-inter px-6 py-4 text-sm whitespace-nowrap text-gray-200">{deadline.endDate}</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
							<p className="mt-2 text-xs text-gray-500 md:hidden">Scroll horizontally to see more columns.</p>
						</div>

						{/* My Recent Activity */}
						<div className="rounded-xl bg-gray-800 p-6 shadow-sm">
							<h2 className="font-inter mb-4 text-xl font-semibold text-gray-300">My Recent Activity</h2>
							<ul className="space-y-3">
								{developerRecentActivity.map((activity) => (
									<li key={activity.id} className="font-inter flex items-center justify-between border-b border-gray-700 pb-2 text-gray-300">
										<span>{activity.description}</span>
										<span className="text-xs text-gray-500">{activity.time}</span>
									</li>
								))}
							</ul>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default OverView;
