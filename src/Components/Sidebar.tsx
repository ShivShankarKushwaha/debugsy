'use client';
import React, { useEffect, useState } from 'react';
import { Home, Folder, BarChart2, MessageSquare, Settings, PlusCircle, LogOut, Menu, Cross } from 'lucide-react';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { logoutUser } from '@/redux/slices/AuthSlice';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { AppDispatch } from '@/redux/store';
import { usePathname, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const Sidebar = () => {
	const [isSidebarOpen, setSidebarOpen] = useState(false);
	const dispatch = useDispatch<AppDispatch>();
	const pathName = usePathname();
	const router = useRouter();
	const navItems = [
		{ name: 'Overview', link: '/dashboard/overview', icon: <Home size={20} /> },
		{ name: 'Projects', link: '/dashboard/projects', icon: <Folder size={20} /> },
		{ name: 'Reports', link: '/dashboard/reports', icon: <BarChart2 size={20} /> },
		{ name: 'Messages', link: '/dashboard/messages', icon: <MessageSquare size={20} /> },
		{ name: 'Settings', link: '/dashboard/settings', icon: <Settings size={20} /> }
	];
	useEffect(() => {
		const mediaQuery = window.matchMedia('(min-width: 1024px)');

		if (mediaQuery.matches) {
			setSidebarOpen(true);
		}

		const handleResize = (e: MediaQueryListEvent) => {
			setSidebarOpen(e.matches); // open if >= lg, close if < lg
		};

		mediaQuery.addEventListener('change', handleResize);

		return () => {
			mediaQuery.removeEventListener('change', handleResize);
		};
	}, []);
	const handleSignOut = async () => {
		try {
			await dispatch(logoutUser()).unwrap(); // Unwrap to catch errors
			if (pathName.includes('dashboard')) {
				toast.success('Logged out successfully!');
				await router.push('/');
			}
		} catch (error) {
			console.error('Logout failed:', error);
			toast.error('Logout failed. Please try again.');
		}
	};
	return (
		<div className="z-20">
			{/* Header overlay for mobile view */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.3 }}
				className="bg-opacity-50 fixed top-0 left-0 z-50 flex w-full items-center justify-between bg-gray-900 p-3 lg:hidden"
			>
				<div className="flex w-full items-center">
					<Image width={100} height={100} src="/logo.svg" alt="DEBUGSY Logo" className="mr-3 rounded-full" />
					<Link href={'/'} className="font-inter text-2xl font-bold">
						DEBUGSY
					</Link>
				</div>
				<div className="mr-5 scale-[1.5]">
					{isSidebarOpen ? <Cross onClick={() => setSidebarOpen(false)} className="rotate-45" /> : <Menu onClick={() => setSidebarOpen(true)} />}
				</div>
			</motion.div>
			{isSidebarOpen && (
				<motion.aside
					initial={{ x: -300, opacity: 0 }}
					animate={{ x: 0, opacity: 1 }}
					transition={{ type: 'spring', stiffness: 80, damping: 18 }}
					className="fixed top-0 left-0 flex h-screen w-full flex-col rounded-r-lg bg-gray-800 p-6 text-gray-200 lg:w-72"
				>
					{/* Logo */}
					<div className="mb-10 flex items-center">
						<Image width={100} height={100} src="/logo.svg" alt="DEBUGSY Logo" className="mr-3 rounded-full" />
						<Link href={'/'} className="font-inter text-2xl font-bold">
							DEBUGSY
						</Link>
					</div>

					{/* Navigation */}
					<nav className="flex-grow">
						<ul>
							{navItems.map((item) => {
								const isActive = pathName === item.link || pathName.startsWith(item.link + '/');
								return (
									<li
										// onClick={() => {
										// 	setSidebarOpen(false);
										// }}
										key={item.name}
										className="mb-4"
									>
										<Link
											href={item.link}
											className={`font-inter flex items-center rounded-lg p-3 transition-colors duration-200 hover:bg-gray-700 ${
												isActive ? 'bg-gray-700 font-semibold text-indigo-400' : ''
											}`}
										>
											<span className="mr-3">{item.icon}</span>
											<span>{item.name}</span>
										</Link>
									</li>
								);
							})}
						</ul>
					</nav>

					{/* Actions */}
					<div className="mt-auto">
						<button
							onClick={() => router.push('/dashboard/projects/add')}
							className="font-inter mb-4 flex w-full cursor-pointer items-center justify-center rounded-xl bg-emerald-400 px-4 py-3 text-white shadow-lg transition-colors duration-200 hover:bg-emerald-500"
						>
							<PlusCircle size={20} className="mr-2" />
							Add Project
						</button>
						<button
							onClick={handleSignOut}
							className="font-inter flex w-full cursor-pointer items-center justify-center rounded-xl px-4 py-3 text-gray-400 transition-colors duration-200 hover:bg-gray-700"
						>
							<LogOut size={20} className="mr-2" />
							Logout
						</button>
					</div>
				</motion.aside>
			)}
		</div>
	);
};

export default Sidebar;
