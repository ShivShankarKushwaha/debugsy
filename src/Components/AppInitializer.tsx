'use client';

import { closeModal, openModal } from '@/redux/slices/AuthModalSlice';
import { RootState } from '@/redux/store';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Bounce, ToastContainer } from 'react-toastify';
import { useSession } from 'next-auth/react';
import AuthModals from './Modals/AuthModal';

export default function AppInitializer({ children }: { children: React.ReactNode }) {
	const { data: session, status } = useSession();
	const dispatch = useDispatch();
	const { open, type } = useSelector((state: RootState) => state.authmodal);
	const [initialized, setInitialized] = useState(false);

	useEffect(() => {
		console.log('AppInitializer mounted', session, status, open, type);
		if (status === 'loading') {
			console.log('Session is loading, skipping hash change handling');
			return;
		}

		const handleHashChange = () => {
			const hash = window.location.hash;

			// ✅ If user is logged in, skip modal logic
			if (session?.user) {
				if (open) {
					dispatch(closeModal());
				}
				if (hash === '#login' || hash === '#signup') {
					window.history.replaceState(null, '', window.location.pathname + window.location.search);
				}
				return;
			}

			if (hash === '#login') {
				if (type !== 'login' || !open) {
					dispatch(openModal('login'));
				}
			} else if (hash === '#signup') {
				if (type !== 'signup' || !open) {
					dispatch(openModal('signup'));
				}
			} else {
				if (open) {
					dispatch(closeModal());
				}
			}
		};

		if (!initialized && (status === 'authenticated' || status === 'unauthenticated')) {
			handleHashChange();
			setInitialized(true);
		}

		window.addEventListener('hashchange', handleHashChange);
		return () => window.removeEventListener('hashchange', handleHashChange);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch, open, type, initialized, session?.user, status]);

	useEffect(() => {
		if (status === 'loading') {
			console.log('Session is loading, skipping hash change handling');
			return;
		}

		const currentHash = window.location.hash;
		if (open && type && currentHash !== `#${type}`) {
			window.history.replaceState(null, '', `#${type}`);
		} else if (!open && (currentHash === '#login' || currentHash === '#signup')) {
			window.history.replaceState(null, '', window.location.pathname + window.location.search);
		}
	}, [open, type, status]);
	return (
		<>
			<AuthModals />
			{children}
			<ToastContainer
				position="bottom-right"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick={false}
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="dark"
				transition={Bounce}
			/>
		</>
	);
}
