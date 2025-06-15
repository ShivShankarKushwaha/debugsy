import React from 'react';
import PieChart from '@/Components/PieChart';
import Image from 'next/image';

const OverView = () => {
	// Dummy data for the dashboard sections
	const taskCategories = [
		{ name: 'Projects', count: 4, bgColor: '#4CAF50', textColor: '#DBEAFE' }, // blue-800, blue-100
		{ name: 'Completed', count: 4, bgColor: '#2196F3', textColor: '#D1FAE5' }, // green-800, green-100
		{ name: 'Closed Recently', count: 4, bgColor: '#FFC107', textColor: '#FECACA' }, // red-800, red-100
		{ name: 'Open Tickets', count: 10, bgColor: '#FF5722', textColor: '#FEF9C3' } // yellow-700, yellow-100
	];

	const chartData = {
		labels: ['Done', 'To Do', 'In Review', 'In Progress'],
		datasets: [
			{
				label: 'Tickets',
				data: taskCategories.map((item) => item.count),
				backgroundColor: taskCategories.map((item) => item.bgColor),
				hoverOffset: 4,
				spacing: 0.5,
				borderWidth: 0,
				borderColor: 'transparent'
			}
		]
	};

	const myTasks = [
		{ title: 'Create wireframe for the about page', date: '30 Jan 2025', priority: 'High', status: 'In Review' },
		{ title: 'Create wireframe for the about page', date: '02 Feb 2025', priority: 'Low', status: 'Done' },
		{ title: 'Create wireframe for the about page', date: '30 Jan 2025', priority: 'High', status: 'To Do' },
		{ title: 'Create wireframe for the about page', date: '30 Jan 2025', priority: 'High', status: 'In Progress' },
		{ title: 'Create wireframe for the about page', date: '30 Jan 2025', priority: 'High', status: 'To Do' }
	];

	const teamMembers = [
		{ name: 'SHIV', avatar: 'https://placehold.co/32x32/A020F0/FFFFFF?text=SK' },
		{ name: 'DEEPAK', avatar: 'https://placehold.co/32x32/00BFFF/FFFFFF?text=DK' },
		{ name: 'SAURAV', avatar: 'https://placehold.co/32x32/FFD700/000000?text=SR' }
	];

	const upcomingDeadlines = [
		{ project: 'Add Authentication', startDate: '01 July 25', endDate: '20 July 25' },
		{ project: 'Add Payment', startDate: '21 July 25', endDate: '20 August 25' }
	];

	return (
		<div className="mt-28 min-h-screen p-6 lg:mt-auto lg:ml-40">
			<h1 className="mb-8 text-3xl font-bold text-gray-300">Overview</h1>

			<div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{taskCategories.map((category) => (
					<div key={category.name} className={`flex items-center justify-between rounded-xl bg-gray-800 p-6 shadow-sm`}>
						<div>
							<p className="font-inter text-sm text-gray-500">{category.name}</p>
							<p style={{ color: `${category.textColor}` }} className={`font-inter text-3xl font-bold`}>
								{category.count} Tasks
							</p>
						</div>
					</div>
				))}
				<PieChart chartData={chartData} />
			</div>

			<div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
				{/* My Tasks Section */}
				<div className="rounded-xl bg-gray-800 p-6 shadow-sm lg:col-span-2">
					<h2 className="font-inter mb-4 text-xl font-semibold text-gray-300">My Tasks</h2>
					<ul className="space-y-4">
						{myTasks.map((task, index) => (
							<li key={index} className="flex flex-col items-center justify-between gap-5 border-b border-gray-700 pb-2 lg:flex-row lg:gap-0">
								<div className="flex items-center">
									<input type="checkbox" className="form-checkbox mr-3 h-5 w-5 rounded text-indigo-600" />
									<div>
										<p className="font-inter font-medium text-gray-300">{task.title}</p>
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
					<h2 className="font-inter mb-4 text-xl font-semibold text-gray-300">Upcoming Deadlines</h2>
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
								{upcomingDeadlines.map((deadline, index) => (
									<tr key={index}>
										<td className="font-inter px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-200">{deadline.project}</td>
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

					{/* Grid for horizontal lines */}
					<div className="pointer-events-none absolute top-12 right-0 bottom-11 left-0">
						{[0, 10, 20, 30, 40, 50].map((val) => (
							<div key={val} className="absolute right-0 left-4 border-t border-gray-700 text-xs text-gray-600" style={{ bottom: `${val * 3}px` }}>
								<span className="ml-1">{val}</span>
							</div>
						))}
					</div>

					{/* Bar chart */}
					<div className="relative z-10 flex h-48 items-end justify-around pb-4">
						{[
							{ value: 25, color: 'bg-emerald-600' },
							{ value: 20, color: 'bg-emerald-700' },
							{ value: 15, color: 'bg-emerald-500' },
							{ value: 10, color: 'bg-emerald-400' }
						].map((item, idx) => (
							<div key={idx} className="relative flex flex-col items-center">
								<div className={`w-8 rounded-md ${item.color}`} style={{ height: `${item.value * 3}px` }}></div>
								<span className="font-inter mt-1 text-xs text-gray-500">{item.value}</span>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default OverView;
