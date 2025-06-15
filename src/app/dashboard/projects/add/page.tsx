'use client';
import CustomDropdown from '@/Components/Animated/CustomDropDown';
import { addProject } from '@/redux/slices/projectSlice';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const AddProjectPage = () => {
	const dispatch = useDispatch();
	const [status, setStatus] = useState('To Do');
	const submitAddProject = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.target as HTMLFormElement);
		const projectName = formData.get('projectName') as string;
		const projectDescription = formData.get('projectDescription') as string;
		const startDate = formData.get('startDate') as string;
		const endDate = formData.get('endDate') as string;
		const projectData = {
			id: Date.now(), // mocking id
			name: projectName,
			description: projectDescription,
			startDate,
			endDate,
			progress: 0,
			status
		};
		if (!projectName || !projectDescription || !startDate || !endDate || !status) {
			toast.error('Please fill in all fields before submitting.');
			return;
		}
		dispatch(addProject(projectData));
		toast.success('Project added successfully!');
		e.target?.reset();
	};
	return (
		<div className="mt-36 min-h-screen p-2 sm:p-6 lg:mt-auto lg:ml-40">
			<h1 className="mb-8 text-3xl font-bold text-gray-200">Add New Project</h1>
			<div className="rounded-xl bg-gray-800 p-6 shadow-sm">
				<h2 className="font-inter mb-4 text-xl font-semibold text-gray-200">Project Details</h2>
				<form className="space-y-4" onSubmit={submitAddProject}>
					<div>
						<label htmlFor="projectName" className="font-inter block text-sm font-medium text-gray-400">
							Project Name:
						</label>
						<input
							type="text"
							name="projectName"
							className="font-inter mt-1 block w-full rounded-md border border-gray-700 bg-gray-900 p-2 text-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
							placeholder="e.g., Website Redesign Phase 2"
							required
						/>
					</div>
					<div>
						<label htmlFor="projectDescription" className="font-inter block text-sm font-medium text-gray-400">
							Description:
						</label>
						<textarea
							name="projectDescription"
							rows={4}
							className="font-inter mt-1 block w-full rounded-md border border-gray-700 bg-gray-900 p-2 text-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
							placeholder="Provide a brief description of the project."
							required
						></textarea>
					</div>
					<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
						<div>
							<label htmlFor="startDate" className="font-inter block text-sm font-medium text-gray-400">
								Start Date:
							</label>
							<input
								type="date"
								name="startDate"
								className="font-inter mt-1 block w-full rounded-md border border-gray-700 bg-gray-900 p-2 text-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
								required
							/>
						</div>
						<div>
							<label htmlFor="endDate" className="font-inter block text-sm font-medium text-gray-400">
								End Date:
							</label>
							<input
								type="date"
								name="endDate"
								className="font-inter mt-1 block w-full rounded-md border border-gray-700 bg-gray-900 p-2 text-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
								required
							/>
						</div>
					</div>
					<div>
						<label htmlFor="projectStatus" className="font-inter block text-sm font-medium text-gray-400">
							Status:
						</label>
						<CustomDropdown initialRole={status} onSelect={(data) => setStatus(data)} options={['To Do', 'In Progress', 'In Review', 'Completed']} />
					</div>
					<button
						type="submit"
						className="font-inter inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
					>
						Add Project
					</button>
				</form>
			</div>
		</div>
	);
};
export default AddProjectPage;
