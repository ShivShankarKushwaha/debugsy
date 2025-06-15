'use client';

import { closeModal, openModal } from '@/redux/slices/AuthModalSlice';
import { setInitialLoginStatus } from '@/redux/slices/AuthSlice';
import { RootState } from '@/redux/store';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Bounce, ToastContainer } from 'react-toastify';

export default function AppInitializer({ children }: { children: React.ReactNode }) {
	const dispatch = useDispatch();
	const { open, type } = useSelector((state: RootState) => state.authmodal);
	const [initialized, setInitialized] = useState(false); // Prevent initial loop

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const res = await fetch('/api/user', { credentials: 'include' });
				const user = await res.json();
				dispatch(setInitialLoginStatus({ isLoggedIn: res.ok, user: res.ok ? user : null }));
			} catch {
				dispatch(setInitialLoginStatus({ isLoggedIn: false, user: null }));
			}
		};
		fetchUser();
	}, [dispatch]);

	useEffect(() => {
		const handleHashChange = () => {
			const hash = window.location.hash;

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

		// Handle initial hash on first render
		if (!initialized) {
			handleHashChange();
			setInitialized(true);
		}

		window.addEventListener('hashchange', handleHashChange);
		return () => window.removeEventListener('hashchange', handleHashChange);
	}, [dispatch, open, type, initialized]);

	useEffect(() => {
		const currentHash = window.location.hash;

		if (open && type && currentHash !== `#${type}`) {
			window.history.replaceState(null, '', `#${type}`);
		} else if (!open && (currentHash === '#login' || currentHash === '#signup')) {
			window.history.replaceState(null, '', window.location.pathname + window.location.search);
		}
	}, [open, type]);

	return (
		<>
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
