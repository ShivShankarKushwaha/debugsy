'use client';
import React, { ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { switchModal } from '@/redux/slices/AuthModalSlice';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { loginSuccess } from '@/redux/slices/AuthSlice';
import Image from 'next/image';
import { GoogleLoginButton } from '../GoogleLogin';
import { signIn } from 'next-auth/react';
import { PrimaryButton } from '../Button';

interface LoginModalProps {
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

const LoginModal: React.FC<LoginModalProps> = ({ open, onClose }) => {
	const [isLoading, setIsLoading] = React.useState(false);
	const dispatch = useDispatch();
	const router = useRouter();
	const handleSwitchToSignup = (e: React.MouseEvent) => {
		e.stopPropagation();
		dispatch(switchModal('signup'));
	};
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			setIsLoading(true);
			e.preventDefault();
			const formData = new FormData(e.target as HTMLFormElement);
			const email = formData.get('email') as string;
			const password = formData.get('password') as string;
			console.log('Submitting login form:', { email, password });

			const data = await signIn('credentials', {
				redirect: false,
				email,
				password
				// callbackUrl: '/dashboard/overview'
			});
			setIsLoading(false);
			console.log('signIn response data:', data); // Log the data to inspect its structure

			// // --- IMPORTANT: Check for an error property in the returned data ---
			if (data?.error) {
				// 	// NextAuth.js will put an error message here if authorization failed
				// 	// The error message might be generic like "CredentialsSignin"
				// 	// You might need to map these to more user-friendly messages if needed
				// 	let errorMessage = 'An unexpected error occurred. Please try again.';

				// 	// NextAuth.js often returns a generic "CredentialsSignin" error
				// 	// when your authorize function throws an error.
				// 	// To get your specific error message, you might need to look into
				// 	// NextAuth.js's internal error handling or consider custom error pages.
				// 	if (data.error === 'CredentialsSignin') {
				// 		// This is a common error when authorize() returns null or throws an error.
				// 		// It's a good practice to provide a general message here for security reasons,
				// 		// rather than revealing whether it was an invalid email or password.
				// 		errorMessage = 'Invalid email or password. Please check your credentials.';
				// 	} else if (data.error === 'EmailNotVerified') {
				// 		// Example: If you customize NextAuth.js to pass this through
				// 		errorMessage = 'Your email is not verified. Please check your inbox.';
				// 	} else {
				// 		errorMessage = data.error; // Use the raw error if it's more specific
				// 	}

				toast.error(data?.error || 'Login failed. Please check your credentials and try again.');
				// You might want to return here to prevent further execution on error
				return;
			}
			toast.success('Login successful!');
			console.log('Login successful:', data);

			dispatch(loginSuccess(data));

			const searchParams = new URLSearchParams(window.location.search);
			const redirectUrl = searchParams.get('from');

			if (redirectUrl && redirectUrl.trim() !== '') {
				console.log('Redirecting to:', redirectUrl);
				await router.push(redirectUrl);
			} else {
				console.log('No redirect URL found, navigating to dashboard');

				await router.push('/dashboard');
			}
			setTimeout(() => {
				onClose();
			}, 1000);
		} catch (error) {
			console.error('Error during login:', error);
			toast.error(error instanceof Error ? error.message : 'An error occurred during login. Please try again later.');
		}
	};
	// const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
	// 	e.preventDefault();
	// 	const formData = new FormData(e.target as HTMLFormElement);
	// 	const email = formData.get('email') as string;
	// 	const password = formData.get('password') as string;

	// 	try {
	// 		const response = await fetch('/api/login', {
	// 			method: 'POST',
	// 			headers: {
	// 				'Content-Type': 'application/json'
	// 			},
	// 			body: JSON.stringify({ email, password })
	// 		});

	// 		if (!response.ok) {
	// 			const errorData = await response.json();
	// 			return toast.error(errorData?.message || 'Login failed. Please check your credentials and try again.');
	// 		}

	// 		const data = await response.json();
	// 		console.log('Login successful:', data);
	// 		toast.success('Login successful! Redirecting to dashboard...');
	// 		dispatch(loginSuccess(data.user));

	// 		const searchParams = new URLSearchParams(window.location.search);
	// 		const redirectUrl = searchParams.get('from');

	// 		if (redirectUrl && redirectUrl.trim() !== '') {
	// 			console.log('Redirecting to:', redirectUrl);
	// 			await router.push(redirectUrl);
	// 		} else {
	// 			console.log('No redirect URL found, navigating to dashboard');

	// 			await router.push('/dashboard/overview');
	// 		}
	// 		setTimeout(() => {
	// 			onClose();
	// 		}, 1000);
	// 	} catch (error) {
	// 		console.error('Error during login:', error);
	// 		toast.error(error instanceof Error ? error.message : 'An error occurred during login. Please try again later.');
	// 	}
	// };
	return (
		<AnimatePresence>
			{open && (
				<motion.div
					className="bg-opacity-60 fixed inset-0 z-50 flex min-h-screen w-full items-center justify-center bg-black/50 p-2"
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
						className="relative w-full max-w-md rounded-xl border border-gray-700 bg-gray-800 p-8 shadow-2xl"
						onClick={(e) => e.stopPropagation()}
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

						<p className="mb-8 text-center text-sm text-gray-400 sm:text-lg">
							Your unified platform for project and task management. Log in to access your personalized dashboard.
						</p>

						<form className="space-y-6" onSubmit={handleSubmit}>
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
									autoComplete="current-password"
									required
									className="mt-1 block w-full rounded-lg border border-gray-600 bg-gray-700 px-4 py-2 text-base text-white placeholder-gray-400 shadow-sm transition-all duration-200 ease-in-out focus:border-emerald-500 focus:ring-emerald-500"
								/>
							</div>

							<div className="flex items-center justify-between">
								<div className="flex items-center">
									<input
										id="remember-me"
										name="remember-me"
										type="checkbox"
										className="h-4 w-4 rounded-md border-gray-600 text-emerald-500 focus:ring-emerald-500"
									/>
									<label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
										Remember me
									</label>
								</div>

								<div className="text-sm">
									<Link href="#" className="font-medium text-emerald-400 transition-colors duration-200 ease-in-out hover:text-emerald-300">
										Forgot your password?
									</Link>
								</div>
							</div>

							<div>
								<PrimaryButton text="Sign in" loading={isLoading} type="submit" />
							</div>

							{/* <div>
								<button
									type="submit"
									className="flex w-full transform cursor-pointer justify-center rounded-lg border border-transparent bg-gradient-to-r from-emerald-500 to-green-600 px-4 py-3 text-base font-semibold text-white shadow-sm transition-all duration-200 ease-in-out hover:scale-105 hover:from-emerald-600 hover:to-green-700 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:outline-none"
								>
									Sign in
								</button>
							</div> */}
						</form>

						<div className="mt-8 text-center">
							<p className="text-base text-gray-400">
								Don&apos;t have an account?{' '}
								<button
									onClick={handleSwitchToSignup}
									className="cursor-pointer font-medium text-emerald-400 transition-colors duration-200 ease-in-out hover:text-emerald-300"
								>
									Sign up
								</button>
							</p>
						</div>
						<div className="mt-6 flex w-full justify-center border-t border-gray-700 pt-4 text-center">
							<GoogleLoginButton />
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default LoginModal;
