'use client';

import { signIn } from 'next-auth/react';
import Image from 'next/image';

export function GoogleLoginButton() {
	return (
		<button
			onClick={() => signIn('google')}
			style={{
				display: 'flex',
				alignItems: 'center',
				background: '#fff',
				color: '#444',
				border: '1px solid #ddd',
				borderRadius: 4,
				padding: '8px 16px',
				cursor: 'pointer',
				fontWeight: 500,
				fontSize: 16
			}}
		>
			<Image
				width={100}
				height={100}
				src="https://developers.google.com/identity/images/g-logo.png"
				alt="Google"
				style={{ width: 20, height: 20, marginRight: 8 }}
			/>
			Continue with Google
		</button>
	);
}
