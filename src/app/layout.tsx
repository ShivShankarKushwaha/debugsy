import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Footer from '@/Components/Footer';
import { ReduxProvider } from '@/redux/provider';
import AppInitializer from '@/Components/AppInitializer';
import AuthSessionProvider from '@/Components/Provider/AuthSession';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin']
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin']
});

export const metadata: Metadata = {
	title: 'Debugsy - Bug Tracking & Project Management',
	description: 'Debugsy helps companies and users create projects, report bugs, resolve issues, set deadlines, and track bug status efficiently.',
	applicationName: 'Debugsy',
	keywords: ['bug tracking', 'project management', 'issue tracker', 'debugging', 'deadline tracking', 'status tracking', 'Debugsy'],
	authors: [{ name: 'Debugsy Team', url: 'https://debugsy.vercel.app' }],
	creator: 'Debugsy',
	openGraph: {
		title: 'Debugsy - Bug Tracking & Project Management',
		description: 'Create projects, report and resolve bugs, set deadlines, and track status with Debugsy.',
		url: 'https://debugsy.vercel.app',
		siteName: 'Debugsy',
		images: [
			{
				url: 'https://debugsy.vercel.app/og-image.png',
				width: 1200,
				height: 630,
				alt: 'Debugsy App Screenshot'
			}
		],
		type: 'website'
	}
};

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<meta name="robots" content="index, follow" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="canonical" href="https://debugsy.vercel.app" />
			</head>
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<ReduxProvider>
					<AuthSessionProvider>
						<AppInitializer>
							<div className="font-inter min-h-screen bg-gray-900 text-white">
								{children}
								<Footer />
							</div>
						</AppInitializer>
					</AuthSessionProvider>
				</ReduxProvider>
			</body>
		</html>
	);
}
