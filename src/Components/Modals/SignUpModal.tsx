import React, { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { switchModal } from '@/redux/slices/AuthModalSlice';
import { toast } from 'react-toastify';
import CustomDropdown from '../Animated/CustomDropDown';
import Image from 'next/image';

interface SignUpModalProps {
	open: boolean;
	onClose: () => void;
	children?: ReactNode;
}
const backdropVariants = {
	visible: { opacity: 1 },
	hidden: { opacity: 0 }
};

const modalVariants = {
	hidden: { y: '100%', scale: 0.8, opacity: 0 },
	visible: { y: '0%', scale: 1, opacity: 1 }
};
const SignUpModal: React.FC<SignUpModalProps> = ({ open, onClose }) => {
	const dispatch = useDispatch();
	const handleSwitchToLogin = (e: React.MouseEvent) => {
		e.stopPropagation();
		dispatch(switchModal('login'));
	};
	const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.target as HTMLFormElement);
		const username = formData.get('username') as string;
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;
		const confirmPassword = formData.get('confirmPassword') as string;
		if (password !== confirmPassword) {
			return toast.error('Passwords do not match. Please try again.');
		}
		try {
			const response = await fetch('/api/signup', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ username, email, password, confirmPassword })
			});

			if (!response.ok) {
				const err = await response.json();
				return toast.error(err?.error);
			}

			const data = await response.json();
			console.log('Sign up successful:', data);
			toast.success('Sign up successful! Redirecting to login...');
			onClose(); // Close the modal on successful sign up
			dispatch(switchModal('login')); // Switch to login modal
		} catch (error) {
			console.error('Error during sign up:', error);
			toast.error(error instanceof Error ? error.message : 'An error occurred during sign up. Please try again later.');
		}
	};
	return (
		<AnimatePresence>
			{open && (
				<motion.div
					className="bg-opacity-60 fixed inset-0 z-50 flex min-h-screen w-full items-center justify-center bg-black/50 p-3"
					variants={backdropVariants}
					initial="hidden"
					animate="visible"
					exit="hidden"
					onClick={onClose}
				>
					<motion.div
						variants={modalVariants}
						initial="hidden"
						animate="visible"
						exit="hidden"
						transition={{
							type: 'spring',
							damping: 10,
							stiffness: 100,
							duration: 0.8,
							delay: 0.2
						}}
						onClick={(e) => e.stopPropagation()}
						className="relative w-full max-w-md rounded-xl border border-gray-700 bg-gray-800 p-8 shadow-2xl"
					>
						<button
							aria-label="Close"
							className="absolute top-4 right-4 cursor-pointer text-2xl text-gray-400 hover:text-white"
							onClick={onClose}
							type="button"
						>
							&times;
						</button>
						<div className="mb-6 flex items-center justify-center">
							<Image src="/logo.svg" alt="Logo" width={36} height={36} className="h-9 w-9 text-emerald-400" />
							<h1 className="ml-3 text-4xl font-extrabold text-white">DEBUGSY</h1>
						</div>

						<p className="mb-8 text-center text-sm text-gray-400 lg:text-lg">Create your account to start managing projects and tasks seamlessly.</p>

						<form className="space-y-6" onSubmit={handleSignUp}>
							<div>
								<label htmlFor="username" className="mb-1 block text-sm font-medium text-gray-300">
									Username
								</label>
								<input
									type="text"
									id="username"
									name="username"
									autoComplete="off"
									required
									className="mt-1 block w-full rounded-lg border border-gray-600 bg-gray-700 px-4 py-2 text-base text-white placeholder-gray-400 shadow-sm transition-all duration-200 ease-in-out focus:border-emerald-500 focus:ring-emerald-500"
								/>
							</div>
							<div>
								<label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-300">
									Email Address
								</label>
								<input
									type="email"
									id="email"
									name="email"
									autoComplete="email"
									required
									className="mt-1 block w-full rounded-lg border border-gray-600 bg-gray-700 px-4 py-2 text-base text-white placeholder-gray-400 shadow-sm transition-all duration-200 ease-in-out focus:border-emerald-500 focus:ring-emerald-500"
								/>
							</div>

							<div>
								<label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-300">
									Password
								</label>
								<input
									type="password"
									id="password"
									name="password"
									autoComplete="new-password"
									required
									className="mt-1 block w-full rounded-lg border border-gray-600 bg-gray-700 px-4 py-2 text-base text-white placeholder-gray-400 shadow-sm transition-all duration-200 ease-in-out focus:border-emerald-500 focus:ring-emerald-500"
								/>
							</div>

							<div>
								<label htmlFor="confirmPassword" className="mb-1 block text-sm font-medium text-gray-300">
									Confirm Password
								</label>
								<input
									type="password"
									id="confirmPassword"
									name="confirmPassword"
									autoComplete="new-password"
									required
									className="mt-1 block w-full rounded-lg border border-gray-600 bg-gray-700 px-4 py-2 text-base text-white placeholder-gray-400 shadow-sm transition-all duration-200 ease-in-out focus:border-emerald-500 focus:ring-emerald-500"
								/>
							</div>

							<div>
								<label htmlFor="role" className="mb-1 block text-sm font-medium text-gray-300">
									Select Role
								</label>
								<CustomDropdown
									options={['Developer', 'Manager']}
									onSelect={(role: string) => console.log('Selected role:', role)}
									initialRole="Developer"
								/>
							</div>

							<div>
								<button
									type="submit"
									className="flex w-full transform cursor-pointer justify-center rounded-lg border border-transparent bg-gradient-to-r from-emerald-500 to-green-600 px-4 py-3 text-base font-semibold text-white shadow-sm transition-all duration-200 ease-in-out hover:scale-105 hover:from-emerald-600 hover:to-green-700 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:outline-none"
								>
									Sign Up
								</button>
							</div>
						</form>

						<div className="mt-8 text-center">
							<p className="text-base text-gray-400">
								Already have an account?{' '}
								<button
									onClick={handleSwitchToLogin}
									className="cursor-pointer font-medium text-emerald-400 transition-colors duration-200 ease-in-out hover:text-emerald-300"
								>
									Sign in
								</button>
							</p>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default SignUpModal;
