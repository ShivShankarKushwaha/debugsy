import { comparePassword, generateToken } from '@/lib/authHelper';
import dbConnect from '@/lib/dbConnect';
import { LoginPayload } from '@/types/Payload.dto';
import { NextRequest, NextResponse } from 'next/server';
import { User } from '@/models/User'; // Make sure this path is correct

export async function POST(req: NextRequest) {
	await dbConnect();
	const request = await req.json();
	const { error } = LoginPayload.validate(request);
	if (error) {
		return NextResponse.json({ message: error.details[0].message }, { status: 400 });
	}

	const { email, password } = request;

	// Find user by email
	const user = await User.findOne({ email });
	if (!user) {
		return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
	}

	// Compare password
	const isMatch = await comparePassword(password, user.password);
	if (!isMatch) {
		return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
	}

	// Generate JWT token
	const token = generateToken({ id: user._id, email: user.email, username: user.username, role: user.role });

	// Set token in HttpOnly cookie
	const response = NextResponse.json({ user: { id: user._id, email: user.email, username: user.username, role: user.role } }, { status: 200 });
	response.cookies.set('token', token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'lax',
		path: '/',
		maxAge: 60 * 60 * 24 * 7
	});

	return response;
}
