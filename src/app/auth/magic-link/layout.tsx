import { Suspense } from 'react';

export default function MagicLinkLayout({ children }: { children: React.ReactNode }) {
	return <Suspense>{children}</Suspense>;
}
