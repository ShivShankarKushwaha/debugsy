// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt'; // Import getToken from next-auth/jwt

const PROTECTED_PATHS = ['/dashboard'];

export default async function middleware(req: NextRequest) {
	const { pathname } = req.nextUrl;
	const token = await getToken({
		req: req,
		secret: process.env.NEXTAUTH_SECRET // Use the same secret as your NextAuth.js configuration
		// cookieName: process.env.NODE_ENV === 'production' ? '__Secure-next-auth.session-token' : 'next-auth.session-token',
	});
	console.log('Middleware: Checking token for request:', { pathname, token });

	// This is crucial because req.headers is read-only.
	const requestHeaders = new Headers(req.headers);

	if (token) {
		// These properties should be configured in your NextAuth.js `callbacks.jwt`
		if (token.id) {
			requestHeaders.set('X-User-Id', token.id as string);
		}
		// console.log('Middleware: Modified headers:', Array.from(requestHeaders.entries())); // For debugging
	}

	// Check if the current path is one of the protected paths
	if (PROTECTED_PATHS.some((path) => pathname.startsWith(path))) {
		// If no valid token is found, redirect to the login page.
		if (!token) {
			console.log('Middleware: No valid token found. Redirecting to login.');
			const loginUrl = new URL('/#login', req.url); // Assuming /login is your sign-in page
			loginUrl.searchParams.set('callbackUrl', pathname); // Pass the original path as callbackUrl
			return NextResponse.redirect(loginUrl);
		}

		// If a token is found, it means the user is authenticated.
		// Now, check for authorization based on role for specific paths.
		console.log('Middleware: Token found. Payload:', token);

		// Example: Restrict access to /dashboard/projects/add for 'developer' role
		// This assumes 'role' is part of your JWT payload (as configured in authOptions' jwt callback)
		if (pathname === '/dashboard/projects/add' && token.role === 'developer') {
			console.log('Middleware: Developer tried to access add project. Redirecting.');
			const redirectUrl = new URL('/dashboard/projects', req.url);
			return NextResponse.redirect(redirectUrl);
		}

		// If authenticated and authorized, proceed to the requested page
		console.log('Middleware: User authenticated and authorized. Proceeding.');
		return NextResponse.next();
	}

	// For unprotected paths, simply proceed
	return NextResponse.next({ headers: requestHeaders });
}

// Configuration for the middleware (optional, but good practice)
export const config = {
	matcher: ['/((?!api/auth|_next/static|_next/image|favicon.ico|login|signup).*)']
};
