import { NextResponse } from 'next/server';

export async function POST() {
	const response = NextResponse.json({ message: 'Signed out successfully' }, { status: 200 });
	response.cookies.set('token', '', {
		httpOnly: true,
		secure: true,
		sameSite: 'strict',
		expires: new Date(0),
		path: '/'
	});
	return response;
}
