'use client';
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '@/redux/slices/AuthModalSlice';
import { RootState, AppDispatch } from '@/redux/store';
import Link from 'next/link';
import { logoutUser } from '@/redux/slices/AuthSlice';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { SecondaryButton } from '../Button';

const AnimatedNav: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const pathName = usePathname();
	const router = useRouter();
	const { isLoggedIn, loading, user } = useSelector((state: RootState) => state.auth);
	console.log('user in nav:', user);

	const [isLogoutButtonVisible, setIsLogoutButtonVisible] = useState(false);

	const handleSignOut = async () => {
		try {
			await dispatch(logoutUser()).unwrap();
			if (pathName.includes('dashboard')) {
				toast.success('Logged out successfully!');
				await router.push('/');
			}
		} catch (error) {
			console.error('Logout failed:', error);
			toast.error('Logout failed. Please try again.');
		}
	};

	const showLogoutButton = () => {
		setIsLogoutButtonVisible(true);
		setTimeout(() => {
			setIsLogoutButtonVisible(false);
		}, 10000);
	};
	return (
		<motion.nav
			initial={{ y: -100, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ type: 'spring', stiffness: 120, damping: 14, delay: 0.1 }}
			className="bg-opacity-90 fixed z-50 flex w-full items-center justify-between rounded-b-xl bg-gray-900 px-6 py-4 shadow-lg backdrop-blur-lg backdrop-filter md:px-12"
		>
			<div className="flex items-center">
				<Image src="/logo.svg" alt="Logo" width={36} height={36} className="h-9 w-9 text-emerald-400" />
				<Link href="/" className="ml-2 text-2xl font-bold">
					DEBUGSY
				</Link>
			</div>
			<div className="hidden sm:block">
				{loading ? (
					<span className="text-emerald-300">Loading...</span>
				) : isLoggedIn && user ? (
					<div className="flex items-center space-x-4">
						<AnimatePresence>
							<Link
								key={'dashboard-button'}
								href={'/dashboard/overview'}
								className="mr-10 cursor-pointer rounded-lg border border-emerald-500 px-4 py-2 font-medium text-emerald-300 transition-colors duration-200 ease-in-out hover:bg-emerald-900"
							>
								Dashboard
							</Link>
							<div key={'user profile'} className="flex items-center space-x-2" onMouseOver={showLogoutButton}>
								<Image
									width={100}
									height={100}
									src={user.avatar || '/user.png'}
									alt={user.name || 'User'}
									className="h-8 w-8 rounded-full border border-emerald-400"
									title={user?.name || 'User Avatar'}
								/>
								<span className="font-medium text-emerald-200">{user.name}</span>
							</div>
							{isLogoutButtonVisible && (
								<motion.button
									key={'sign-out-button'}
									initial={{ opacity: 0, x: 150 }}
									animate={{ opacity: 1, x: 0 }}
									exit={{ opacity: 0, x: 50, transition: { duration: 0.5, ease: 'linear' } }}
									transition={{ type: 'spring', stiffness: 100, damping: 30 }}
									onClick={handleSignOut}
									className="cursor-pointer rounded-lg border border-emerald-500 px-4 py-2 font-medium text-emerald-300 transition-colors duration-200 ease-in-out hover:bg-emerald-900"
									style={{ marginLeft: 'auto' }}
								>
									Sign Out
								</motion.button>
							)}
						</AnimatePresence>
					</div>
				) : (
					<SecondaryButton text="Sign In" onClick={() => dispatch(openModal('login'))} />
					// <button
					// 	onClick={() => dispatch(openModal('login'))}
					// 	className="cursor-pointer rounded-lg border border-emerald-500 px-4 py-2 font-medium text-emerald-300 transition-colors duration-200 ease-in-out hover:bg-emerald-900"
					// >
					// 	Sign In
					// </button>
				)}
			</div>
			{/* Hamburger menu for mobile */}
			<div className="flex items-center sm:hidden">
				<button
					onClick={() => setIsLogoutButtonVisible((v) => !v)}
					className="inline-flex items-center justify-center rounded-md p-2 text-emerald-300 hover:bg-emerald-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none focus:ring-inset"
					aria-label="Open main menu"
				>
					<svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
					</svg>
				</button>
				<AnimatePresence>
					{isLogoutButtonVisible && (
						<motion.div
							initial={{ opacity: 0, x: 100 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: 100 }}
							transition={{ type: 'spring', stiffness: 120, damping: 20 }}
							className="absolute top-16 right-4 z-50 flex w-48 flex-col rounded-lg border border-emerald-700 bg-gray-900 shadow-lg"
						>
							{loading ? (
								<span className="px-4 py-2 text-emerald-300">Loading...</span>
							) : isLoggedIn && user ? (
								<>
									<button
										onClick={async () => {
											setIsLogoutButtonVisible(false);
											await router.push('/dashboard/overview');
										}}
										className="w-full px-4 py-2 text-left text-emerald-300 hover:bg-emerald-800"
									>
										Dashboard
									</button>
									<div className="flex items-center space-x-2 px-4 py-2">
										<Image
											width={32}
											height={32}
											src={user.avatar || '/user.png'}
											alt={user.name || 'User'}
											className="h-8 w-8 rounded-full border border-emerald-400"
										/>
										<span className="font-medium text-emerald-200">{user.name}</span>
									</div>
									<button
										onClick={async () => {
											setIsLogoutButtonVisible(false);
											await handleSignOut();
										}}
										className="w-full px-4 py-2 text-left text-emerald-300 hover:bg-emerald-800"
									>
										Sign Out
									</button>
								</>
							) : (
								<button
									onClick={() => {
										setIsLogoutButtonVisible(false);
										dispatch(openModal('login'));
									}}
									className="w-full px-4 py-2 text-left text-emerald-300 hover:bg-emerald-800"
								>
									Sign In
								</button>
							)}
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</motion.nav>
	);
};

export default AnimatedNav;
