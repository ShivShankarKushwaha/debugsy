'use client';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { selectAllReports } from '@/redux/slices/reportSlice';
import Image from 'next/image';
import { useState, useMemo } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

const ReportsPage = () => {
	const teamReports = useSelector(selectAllReports);
	const [sortColumn, setSortColumn] = useState<'id' | 'status' | 'reportTitle' | 'date' | 'priority' | 'reporter' | ''>('');
	const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
	const [search, setSearch] = useState('');
	const [searchDate, setSearchDate] = useState('');

	const handleSort = (column: typeof sortColumn) => {
		if (sortColumn === column) {
			setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
		} else {
			setSortColumn(column);
			setSortOrder('asc');
		}
	};

	const filteredReports = useMemo(() => {
		return teamReports.filter((report: any) => {
			const matchesSearch =
				search.trim() === '' ||
				report.id.toString().toLowerCase().includes(search.toLowerCase()) ||
				report.status.toLowerCase().includes(search.toLowerCase()) ||
				report.reportTitle.toLowerCase().includes(search.toLowerCase()) ||
				report.priority.toLowerCase().includes(search.toLowerCase()) ||
				report.reporter.toLowerCase().includes(search.toLowerCase());
			const matchesDate = !searchDate || new Date(report.date).toDateString() === new Date(searchDate).toDateString();

			return matchesSearch && matchesDate;
		});
	}, [teamReports, search, searchDate]);

	const sortedReports = useMemo(() => {
		const sorted = [...filteredReports];
		if (sortColumn) {
			if (sortColumn === 'priority') {
				sorted.sort((a, b) => {
					const priorityOrder = ['Low', 'Medium', 'High'];
					const aPriorityIndex = priorityOrder.indexOf(a.priority);
					const bPriorityIndex = priorityOrder.indexOf(b.priority);
					return sortOrder === 'asc' ? aPriorityIndex - bPriorityIndex : bPriorityIndex - aPriorityIndex;
				});
			} else {
				sorted.sort((a, b) => {
					const aValue = a[sortColumn] || '';
					const bValue = b[sortColumn] || '';
					if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
					if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
					return 0;
				});
			}
		}
		return sorted;
	}, [filteredReports, sortColumn, sortOrder]);

	const renderSortIcon = (column: typeof sortColumn) => {
		if (sortColumn !== column) return null;
		return sortOrder === 'asc' ? <ArrowUp className="ml-1 inline-block h-4 w-4" /> : <ArrowDown className="ml-1 inline-block h-4 w-4" />;
	};

	return (
		<div className="mt-36 min-h-screen max-w-[100vw] p-2 sm:max-w-[93vw] sm:p-6 lg:mt-auto lg:ml-40 lg:max-w-[60vw] 2xl:max-w-full">
			<h1 className="mb-8 text-3xl font-bold text-gray-200">Reports</h1>
			<div className="rounded-xl bg-gray-800 p-6 shadow-sm">
				<div className="mb-6 flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0 md:space-x-4">
					<div className="relative w-full flex-grow md:w-auto">
						<input
							type="text"
							placeholder="Search..."
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							className="font-inter w-full rounded-md border border-gray-700 bg-gray-900 py-2 pr-4 pl-10 text-gray-300 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
						/>
						<svg
							className="absolute top-1/2 left-3 -translate-y-1/2 transform text-gray-400"
							width="20"
							height="20"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
						</svg>
					</div>
					<input
						type="date"
						value={searchDate}
						onChange={(e) => setSearchDate(e.target.value)}
						className="font-inter w-full rounded-md border border-gray-700 bg-gray-900 px-4 py-2 text-gray-300 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none md:w-auto"
					/>
					<button
						className="font-inter w-full cursor-pointer rounded-md bg-orange-400/50 px-6 py-2 text-white shadow-md transition-colors duration-200 hover:bg-orange-400 md:w-auto"
						type="button"
						onClick={() => {
							setSearch('');
							setSearchDate('');
						}}
					>
						Reset
					</button>
				</div>

				<h2 className="font-inter mb-4 text-xl font-semibold text-gray-300">Team Reports Summary</h2>
				<div className="overflow-x-auto">
					<table className="min-w-full divide-y divide-gray-700">
						<thead>
							<tr>
								{[
									{ label: 'Team ID', key: 'id' },
									{ label: 'Status', key: 'status' },
									{ label: 'Title', key: 'reportTitle' },
									{ label: 'Date', key: 'date' },
									{ label: 'Priority', key: 'priority' },
									{ label: 'From', key: 'reporter' }
								].map((col) => (
									<th
										key={col.key}
										onClick={() => handleSort(col.key as typeof sortColumn)}
										className={`font-inter cursor-pointer bg-gray-800 px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-400 uppercase ${
											col.key === 'id' ? 'rounded-tl-lg' : ''
										} ${col.key === 'reporter' ? 'rounded-tr-lg' : ''}`}
									>
										{col.label}
										{renderSortIcon(col.key as typeof sortColumn)}
									</th>
								))}
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-700 bg-gray-800">
							{sortedReports.map((report) => (
								<tr key={report.id}>
									<td className="font-inter px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-300">{report.id}</td>
									<td className="font-inter px-6 py-4 text-sm whitespace-nowrap">
										<span
											className={`font-inter rounded-full px-3 py-1 text-xs font-semibold ${
												report.status === 'Done' ? 'bg-green-900 text-green-300' : 'bg-gray-700 text-gray-400'
											}`}
										>
											{report.status}
										</span>
									</td>
									<td className="font-inter px-6 py-4 text-sm whitespace-nowrap text-gray-300">{report.reportTitle}</td>
									<td className="font-inter px-6 py-4 text-sm whitespace-nowrap text-gray-400">{report.date}</td>
									<td className="font-inter px-6 py-4 text-sm whitespace-nowrap text-gray-400">{report.priority}</td>
									<td className="font-inter flex items-center px-6 py-4 text-sm whitespace-nowrap text-gray-300">
										<Image width={40} height={40} src={report.avatar} alt={report.reporter} className="mr-2 h-8 w-8 rounded-full" />
										{report.reporter}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>

			{/* Report Bug Button */}
			<div className="mt-8 text-center">
				<Link
					href={'/dashboard/reports/create'}
					className="font-inter inline-flex justify-center rounded-md border border-transparent bg-red-600 px-6 py-3 text-base font-medium text-white shadow-md hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none"
				>
					Report a Bug
				</Link>
			</div>
		</div>
	);
};

export default ReportsPage;
