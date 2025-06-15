import { BarChart2 } from 'lucide-react';

// New: ReportsPage Component
const ReportsPage = () => {
	return (
		<div className="mt-36 min-h-screen p-2 lg:mt-auto lg:ml-40 lg:p-6">
			<h1 className="mb-8 text-3xl font-bold text-gray-200">Reports</h1>
			<div className="rounded-xl bg-gray-800 p-6 text-center shadow-sm">
				<h2 className="font-inter mb-4 text-xl font-semibold text-gray-400">Project Reports Summary</h2>
				<p className="font-inter text-gray-400">Detailed reports and analytics will be displayed here.</p>
				<div className="font-inter mt-6 rounded-lg border border-dashed border-gray-600 p-4 text-gray-500">
					<BarChart2 size={48} className="mx-auto mb-3" />
					<p>Charts and graphs for various metrics.</p>
					<p>Coming Soon!</p>
				</div>
			</div>
		</div>
	);
};

export default ReportsPage;
