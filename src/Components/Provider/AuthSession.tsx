// app/layout.tsx
'use client';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setInitialLoginStatus } from '@/redux/slices/AuthSlice';

import { SessionProvider } from 'next-auth/react';

export default function AuthSessionProvider({ children }: { children: React.ReactNode }) {
	return (
		<SessionProvider>
			{' '}
			<SessionLoader />
			{children}
		</SessionProvider>
	);
}

function SessionLoader() {
	const { data: session, status } = useSession();
	const dispatch = useDispatch();

	useEffect(() => {
		if (status === 'loading') return;

		if (session?.user) {
			dispatch(
				setInitialLoginStatus({
					isLoggedIn: true,
					user: {
						id: (session?.user as any)?.id || '',
						email: session.user.email || '',
						name: session.user.name || '',
						avatar: session.user.image || '',
						role: (session.user as any).role || '' // if added via JWT
					}
				})
			);
		} else {
			dispatch(setInitialLoginStatus({ isLoggedIn: false, user: null }));
		}
	}, [session, status, dispatch]);

	return null;
}
