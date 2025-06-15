'use client';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';

const SettingsPage = () => {
	const { user } = useSelector((state: RootState) => state.auth);
	return (
		<div className="mt-36 min-h-screen p-2 lg:mt-auto lg:ml-40 lg:p-6">
			<h1 className="mb-8 text-3xl font-bold text-gray-200">Settings</h1>
			<div className="rounded-xl bg-gray-800 p-6 shadow-sm">
				<h2 className="font-inter mb-4 text-xl font-semibold text-gray-200">Account Settings</h2>
				<div className="space-y-4">
					<div className="flex flex-col items-center justify-between border-b border-gray-700 pb-3 lg:flex-row">
						<label htmlFor="username" className="font-inter text-gray-300">
							Username:
						</label>
						<input
							type="text"
							id="username"
							defaultValue={user?.username}
							className="font-inter rounded-md border border-gray-700 bg-gray-900 p-2 text-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
						/>
					</div>
					<div className="flex flex-col items-center justify-between border-b border-gray-700 pb-3 lg:flex-row">
						<label htmlFor="email" className="font-inter text-gray-300">
							Email:
						</label>
						<input
							type="email"
							id="email"
							defaultValue={user?.email}
							className="font-inter rounded-md border border-gray-700 bg-gray-900 p-2 text-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
						/>
					</div>
					<div className="flex items-center justify-between border-b border-gray-700 pb-3">
						<label htmlFor="notifications" className="font-inter text-gray-300">
							Email Notifications:
						</label>
						<input
							type="checkbox"
							id="notifications"
							defaultChecked
							className="form-checkbox h-5 w-5 rounded border-gray-700 bg-gray-900 text-indigo-500"
						/>
					</div>
					<button className="font-inter cursor-pointer rounded-md bg-indigo-600 px-5 py-2 text-gray-200 shadow-md transition-colors duration-200 hover:bg-indigo-700">
						Save Changes
					</button>
				</div>
			</div>

			<div className="mt-6 rounded-xl bg-gray-800 p-6 shadow-sm">
				<h2 className="font-inter mb-4 text-xl font-semibold text-gray-200">Privacy Settings</h2>
				<p className="font-inter text-gray-400">Manage your privacy preferences here.</p>
				<button className="font-inter mt-4 cursor-pointer rounded-md bg-gray-700 px-5 py-2 text-gray-300 transition-colors duration-200 hover:bg-gray-600">
					View Privacy Policy
				</button>
			</div>
		</div>
	);
};

export default SettingsPage;
