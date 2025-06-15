import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const PROTECTED_PATHS = ['/dashboard'];

export default async function middleware(req: NextRequest) {
	const { pathname } = req.nextUrl;

	if (PROTECTED_PATHS.some((path) => pathname.startsWith(path))) {
		const token = req.cookies.get('token')?.value;

		if (!token) {
			const loginUrl = new URL('/#login', req.url);
			loginUrl.searchParams.set('from', pathname);
			return NextResponse.redirect(loginUrl);
		}

		try {
			const secret = new TextEncoder().encode(process.env.APP_SECRET!);
			const user = await jwtVerify(token, secret);
			console.log('middleware user', user);

			if (pathname.includes('/dashboard/projects/add') && user?.payload?.role?.toLowerCase() === 'developer') {
				const redirectUrl = new URL('/dashboard/projects', req.url);
				return NextResponse.redirect(redirectUrl);
			}
			return NextResponse.next();
		} catch (err) {
			console.error('middleware:', err);
			const loginUrl = new URL('/#login', req.url);
			loginUrl.searchParams.set('error', 'invalid-token');
			return NextResponse.redirect(loginUrl);
		}
	}
	return NextResponse.next();
}
