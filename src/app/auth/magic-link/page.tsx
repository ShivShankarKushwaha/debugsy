'use client'; // This directive marks the component as a Client Component

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify'; // Assuming toast is correctly set up with react-toastify
// import { PrimaryButton } from '@/Components/Button'; // Assuming this path is correct

export default function MagicLinkPage() {
	const searchParams = useSearchParams();
	const token = searchParams.get('token');
	const email = searchParams.get('email');
	const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
	const [message, setMessage] = useState('');
	const [errorCode, setErrorCode] = useState<string | null>(null);
	const router = useRouter();

	const handleReRequestMagicLink = async () => {
		if (!email) {
			toast.error('Email is missing.');
			return;
		}
		try {
			const res = await fetch('/api/magic-link', {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email })
			});
			const data = await res.json();
			if (!res.ok) {
				toast.error(data.message || 'Failed to resend magic link.');
				return;
			}
			toast.success(data.message || 'A new magic link has been sent to your email.');
		} catch (err) {
			// Catch as `err` directly, type is implicitly any or unknown
			toast.error((err as Error).message || 'Failed to resend magic link.'); // Cast to Error to access message
		}
	};

	useEffect(() => {
		// Only proceed if token and email are available.
		// `searchParams` might be empty on initial server render, but will populate on client.
		// So we wait until they are truly available on the client side.
		if (!token || !email) {
			// Check if we are still in a loading state and params are truly missing
			if (status === 'loading') {
				// Add a check to prevent premature error messages
				setStatus('error');
				setMessage('Invalid or missing magic link parameters.');
				setErrorCode('MISSING_PARAMS');
				toast.error('Invalid or missing magic link parameters.');
			}
			return;
		}

		// Set initial status to loading once token and email are confirmed to be present
		setStatus('loading');

		const baseUrl = window.location.origin;
		const magicLink = `${baseUrl}/auth/magic-link?token=${token}&email=${encodeURIComponent(email)}`;

		const verifyMagicLink = async () => {
			try {
				const res = await fetch('/api/magic-link', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ email, magicLink })
				});

				const data = await res.json();
				const receivedErrorCode = res.headers.get('X-Error-Code');
				setErrorCode(receivedErrorCode);

				if (!res.ok) {
					setStatus('error');
					setMessage(data.message || 'Authentication failed.');

					switch (receivedErrorCode) {
						case 'EMAIL_ALREADY_VERIFIED':
							toast.warn('Email already verified. You can login now.');
							router.push('/#login'); // Redirect to login modal if email already verified
							break;
						case 'MISSING_FIELDS':
							toast.error('Please provide both email and magic link.');
							break;
						case 'USER_NOT_FOUND':
							toast.error('User not found. Please sign up first.');
							break;
						case 'INVALID_MAGIC_LINK':
							toast.error('Invalid magic link. Please check url.');
							break;
						case 'MAGIC_LINK_EXPIRED':
							toast.error('Magic link has expired. Please request a new one.');
							break;
						default:
							toast.error(data.message || 'Authentication failed.');
					}
					return;
				}

				setStatus('success');
				setMessage(data.message || 'Authentication successful! You are now logged in.');
				toast.success(data.message || 'Authentication successful! You are now logged in.');

				setTimeout(() => {
					router.push('/dashboard');
				}, 2000);
			} catch (err) {
				setStatus('error');
				setMessage((err as Error).message || 'Authentication failed. Please try again.');
				setErrorCode('NETWORK_ERROR');
				toast.error((err as Error).message || 'Authentication failed.');
			}
		};

		verifyMagicLink();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [token, email, router]); // Added status to dependency array to re-evaluate after status changes

	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-950 p-4 text-gray-100">
			<div className="w-full max-w-md rounded-lg border border-gray-800 bg-gray-900 p-8 shadow-xl">
				<h1 className="mb-6 text-center text-3xl font-bold text-gray-50">Magic Link Authentication</h1>

				{status === 'loading' && (
					<div className="flex flex-col items-center justify-center space-y-4">
						<div className="h-12 w-12 animate-spin rounded-full border-t-2 border-b-2 border-emerald-500"></div>
						<p className="text-lg text-gray-400">Verifying magic link...</p>
					</div>
				)}

				{status === 'success' && (
					<div className="text-center text-green-400">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="mx-auto mb-4 h-16 w-16 text-green-500"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth={1.5}
						>
							<path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
						<p className="mb-2 text-xl font-medium">{message}</p>
						<p className="text-gray-400">Redirecting you shortly...</p>
					</div>
				)}

				{status === 'error' && (
					<div className="text-center text-red-400">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="mx-auto mb-4 h-16 w-16 text-red-500"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth={1.5}
						>
							<path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
						<p className="mb-2 text-xl font-medium">{message}</p>
						{errorCode !== 'MAGIC_LINK_EXPIRED' ? (
							// PrimaryButton is expected from a local import, so simulating it with a regular button
							<button
								onClick={handleReRequestMagicLink}
								className="mt-4 rounded-lg bg-emerald-600 px-6 py-2 font-semibold text-white shadow-md transition-all duration-200 hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:outline-none"
							>
								Re-request Auth Link
							</button>
						) : (
							// PrimaryButton is expected from a local import, so simulating it with a regular button
							<button
								onClick={() => router.push('/')}
								className="mt-4 rounded-lg bg-emerald-600 px-6 py-2 font-semibold text-white shadow-md transition-all duration-200 hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:outline-none"
							>
								Go to Homepage
							</button>
						)}
					</div>
				)}
			</div>
		</div>
	);
}
