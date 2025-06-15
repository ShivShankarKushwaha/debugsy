import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import { User } from '@/models/User';
import { SignUpPayload } from '@/types/Payload.dto';
import { hashPassword } from '@/lib/authHelper';

export async function POST(req: NextRequest) {
	await dbConnect();

	try {
		const request = await req.json();
		const { error } = SignUpPayload.validate(request);
		if (error) {
			return NextResponse.json({ error: error.details[0].message }, { status: 400 });
		}
		const { email, password, username, role } = request;

		// Check if user already exists
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return NextResponse.json({ error: 'Email already in use.' }, { status: 409 });
		}

		// Create new user
		const hashedPassword = await hashPassword(password);
		const user = new User({ username, email, role, password: hashedPassword });
		await user.save();

		// Create JWT
		// const token = generateToken({ id: user._id, email: user.email });

		const response = NextResponse.json({ message: 'User registered successfully.' }, { status: 201 });
		// response.cookies.set('token', token, {
		//     httpOnly: true,
		//     secure: process.env.NODE_ENV === 'production',
		//     sameSite: 'lax',
		//     path: '/',
		//     maxAge: 60 * 60 * 24 * 7, // 7 days
		// });

		return response;
	} catch (error) {
		return NextResponse.json({ error: error }, { status: 500 });
	}
}
