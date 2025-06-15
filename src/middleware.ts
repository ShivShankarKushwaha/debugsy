// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

// Define protected routes
const PROTECTED_PATHS = ['/dashboard'];

export default async function middleware(req: NextRequest) {
	const { pathname } = req.nextUrl;

	// Only protect certain paths
	if (PROTECTED_PATHS.some((path) => pathname.startsWith(path))) {
		const token = req.cookies.get('token')?.value;

		if (!token) {
			const loginUrl = new URL('/#login', req.url);
			loginUrl.searchParams.set('from', pathname); // optional: redirect back after login
			return NextResponse.redirect(loginUrl);
		}

		try {
			const secret = new TextEncoder().encode(process.env.APP_SECRET!);
			await jwtVerify(token, secret); // 🔁 await is required here!
			return NextResponse.next();
		} catch (err) {
			console.error('JWT verification failed:', err);
			const loginUrl = new URL('/#login', req.url);
			loginUrl.searchParams.set('error', 'invalid-token');
			return NextResponse.redirect(loginUrl);
		}
	}

	// Allow access to all other routes
	return NextResponse.next();
}
