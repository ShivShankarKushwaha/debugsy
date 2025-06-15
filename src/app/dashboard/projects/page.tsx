'use client';
import { selectAllProjects } from '@/redux/slices/projectSlice';
import { useSelector } from 'react-redux';

const ProjectsPage = () => {
	const projects = useSelector(selectAllProjects);

	return (
		<div className="mt-36 min-h-screen p-2 lg:mt-auto lg:ml-40 lg:max-w-[60vw] lg:p-6 2xl:max-w-full">
			<h1 className="mb-8 text-3xl font-bold text-gray-200">Projects</h1>
			<div className="rounded-xl bg-gray-800 p-6 shadow-sm">
				<h2 className="font-inter mb-4 text-xl font-semibold text-gray-300">All Projects</h2>
				<div className="max-w-[80vw] overflow-x-auto">
					<table className="w-full divide-y divide-gray-700">
						<thead className="sticky top-0 z-10 bg-gray-900/50">
							<tr>
								<th className="font-inter rounded-tl-lg bg-gray-900/50 px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
									Project Name
								</th>
								<th className="font-inter bg-gray-900/50 px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Status</th>
								<th className="font-inter bg-gray-900/50 px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Progress</th>
								<th className="font-inter hidden bg-gray-900/50 px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase md:table-cell">
									Start Date
								</th>
								<th className="font-inter hidden rounded-tr-lg bg-gray-900/50 px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase md:table-cell">
									End Date
								</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-700 bg-gray-800">
							{projects.map((project: any) => (
								<tr key={project.id}>
									<td className="font-inter px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-400">{project.name}</td>
									<td className="font-inter px-6 py-4 text-sm whitespace-nowrap text-gray-400">
										<span
											className={`font-inter rounded-full px-3 py-1 text-xs font-semibold ${
												project.status === 'Completed'
													? 'bg-green-100 text-green-700'
													: project.status === 'In Progress'
														? 'bg-blue-100 text-blue-700'
														: project.status === 'In Review'
															? 'bg-yellow-100 text-yellow-700'
															: 'bg-gray-100 text-gray-700'
											}`}
										>
											{project.status}
										</span>
									</td>
									<td className="font-inter px-6 py-4 text-sm whitespace-nowrap text-gray-400">
										<div className="h-2.5 w-24 rounded-full bg-gray-200">
											<div className="h-2.5 rounded-full bg-indigo-600" style={{ width: `${project.progress}%` }}></div>
										</div>
										<span className="ml-2">{project.progress}%</span>
									</td>
									<td className="font-inter px-6 py-4 text-sm whitespace-nowrap text-gray-400">{project.startDate}</td>
									<td className="font-inter px-6 py-4 text-sm whitespace-nowrap text-gray-400">{project.endDate}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				<p className="mt-2 text-xs text-gray-500 md:hidden">Scroll horizontally to see more columns.</p>
			</div>
		</div>
	);
};

export default ProjectsPage;
