'use client';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentReportForm, updateFormField, resetForm } from '@/redux/slices/createReportSlice';
import { RootState } from '@/redux/store';
import { toast } from 'react-toastify';
import { selectAllProjects } from '@/redux/slices/projectSlice';
import { addReport } from '@/redux/slices/reportSlice';
import Image from 'next/image';

const CreateReportPage = () => {
	const dispatch = useDispatch();
	const { user } = useSelector((state: RootState) => state.auth);
	const reportData = useSelector(selectCurrentReportForm);
	const projects = useSelector(selectAllProjects);

	const handleReportChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		const { id, value, type, files } = e.target as HTMLInputElement;
		dispatch(
			updateFormField({
				field: id,
				value: type === 'file' ? (files?.[0] ?? null) : value
			})
		);
	};

	const handleReportSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log('New Report/Bug Data:', reportData);
		const newReport = {
			...reportData,
			id: Date.now().toString(),
			reporter: user?.username || 'Anonymous',
			avatar: user?.avatar || 'https://placehold.co/32x32/2196F3/FFFFFF?text=AN'
		};
		toast.success('Bug Report Submitted Successfully!');
		dispatch(addReport(newReport));
		dispatch(resetForm());
	};
	return (
		<div className="mt-36 min-h-screen max-w-[100vw] p-2 sm:max-w-[93vw] sm:p-6 lg:mt-auto lg:ml-40 lg:max-w-[60vw] 2xl:max-w-full">
			<h1 className="mb-8 text-3xl font-bold text-gray-200">Create New Report / Bug</h1>
			<div className="rounded-xl bg-gray-800 p-6 shadow-sm">
				<form onSubmit={handleReportSubmit} className="space-y-6">
					{/* Report Title */}
					<div>
						<label htmlFor="reportTitle" className="font-inter block text-sm font-medium text-gray-300">
							Report Title:
						</label>
						<input
							type="text"
							id="reportTitle"
							value={reportData.reportTitle}
							onChange={handleReportChange}
							className="font-inter mt-1 block w-full rounded-md border border-gray-700 bg-gray-900 p-2 text-gray-300 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
							placeholder="e.g., Critical UI bug on checkout page"
							required
						/>
					</div>
					{/* Report Type, Associated Project, Priority */}
					<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
						<div>
							<label htmlFor="reportType" className="font-inter block text-sm font-medium text-gray-300">
								Report Type:
							</label>
							<select
								id="reportType"
								value={reportData.reportType}
								onChange={handleReportChange}
								className="font-inter mt-1 block w-full rounded-md border border-gray-700 bg-gray-900 p-2 text-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
							>
								<option value="Bug">Bug</option>
								<option value="Feature Request">Feature Request</option>
								<option value="Improvement Suggestion">Improvement Suggestion</option>
							</select>
						</div>
						<div>
							<label htmlFor="associatedProject" className="font-inter block text-sm font-medium text-gray-300">
								Associated Project:
							</label>
							<select
								id="associatedProject"
								value={reportData.associatedProject}
								onChange={handleReportChange}
								className="font-inter mt-1 block w-full rounded-md border border-gray-700 bg-gray-900 p-2 text-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
								required
							>
								{projects.map((p: any) => (
									<option key={p.id} value={p.id}>
										{p.name}
									</option>
								))}
							</select>
						</div>
						<div>
							<label htmlFor="priority" className="font-inter block text-sm font-medium text-gray-300">
								Priority:
							</label>
							<select
								id="priority"
								value={reportData.priority}
								onChange={handleReportChange}
								className="font-inter mt-1 block w-full rounded-md border border-gray-700 bg-gray-900 p-2 text-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
							>
								<option value="Critical">Critical</option>
								<option value="High">High</option>
								<option value="Medium">Medium</option>
								<option value="Low">Low</option>
							</select>
						</div>
					</div>
					{/* Reproduction Steps */}
					<div>
						<label htmlFor="reproductionSteps" className="font-inter block text-sm font-medium text-gray-300">
							Reproduction Steps (for Bugs):
						</label>
						<textarea
							id="reproductionSteps"
							rows={4}
							value={reportData.reproductionSteps}
							onChange={handleReportChange}
							className="font-inter mt-1 block w-full rounded-md border border-gray-700 bg-gray-900 p-2 text-gray-300 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
							placeholder="Provide clear steps to reproduce the bug."
						></textarea>
					</div>
					{/* Expected and Actual Behavior */}
					<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
						<div>
							<label htmlFor="expectedBehavior" className="font-inter block text-sm font-medium text-gray-300">
								Expected Behavior:
							</label>
							<textarea
								id="expectedBehavior"
								rows={3}
								value={reportData.expectedBehavior}
								onChange={handleReportChange}
								className="font-inter mt-1 block w-full rounded-md border border-gray-700 bg-gray-900 p-2 text-gray-300 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
								placeholder="What should happen?"
							></textarea>
						</div>
						<div>
							<label htmlFor="actualBehavior" className="font-inter block text-sm font-medium text-gray-300">
								Actual Behavior:
							</label>
							<textarea
								id="actualBehavior"
								rows={3}
								value={reportData.actualBehavior}
								onChange={handleReportChange}
								className="font-inter mt-1 block w-full rounded-md border border-gray-700 bg-gray-900 p-2 text-gray-300 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
								placeholder="What actually happens?"
							></textarea>
						</div>
					</div>
					{/* Reporter (read-only for now) */}
					<div>
						<label htmlFor="reporter" className="font-inter block text-sm font-medium text-gray-300">
							Reporter:
						</label>
						<input
							type="text"
							id="reporter"
							value={user?.username}
							readOnly
							className="font-inter mt-1 block w-full rounded-md border border-gray-700 bg-gray-900 p-2 text-gray-400 shadow-sm sm:text-sm"
						/>
					</div>
					{/* Screenshots/Attachments */}
					<div>
						<label htmlFor="screenshots" className="font-inter block text-sm font-medium text-gray-300">
							Screenshots/Attachments (Optional):
						</label>
						<input
							type="file"
							id="screenshots"
							accept="image/*,application/pdf"
							onChange={handleReportChange}
							className="font-inter mt-1 block w-full text-sm text-gray-400 file:mr-4 file:rounded-md file:border-0 file:bg-gray-700 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-gray-200 hover:file:bg-gray-600"
						/>
						{/* Preview of uploaded document */}
						{reportData.screenshots && (
							<div className="mt-3">
								{reportData.screenshots.type?.startsWith('image/') ? (
									<Image
										width={200}
										height={200}
										src={URL.createObjectURL(reportData.screenshots)}
										alt="Preview"
										className="max-h-48 rounded border border-gray-700"
									/>
								) : (
									<div className="flex items-center space-x-2">
										<span className="text-gray-300">{reportData.screenshots.name}</span>
										<a
											href={URL.createObjectURL(reportData.screenshots)}
											target="_blank"
											rel="noopener noreferrer"
											className="text-indigo-400 underline"
										>
											Preview
										</a>
									</div>
								)}
							</div>
						)}
					</div>
					{/* Submit Button */}
					<button
						type="submit"
						className="font-inter inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
					>
						Submit Report
					</button>
				</form>
			</div>
		</div>
	);
};

export default CreateReportPage;
