import { verifyToken } from '@/lib/authHelper';
import dbConnect from '@/lib/dbConnect';
import { NextRequest, NextResponse } from 'next/server';
import { User } from '@/models/User';

export async function GET(req: NextRequest) {
	await dbConnect();
	const token = req.cookies.get('token')?.value;

	if (!token) {
		return NextResponse.json({ error: 'No token provided' }, { status: 401 });
	}

	try {
		const decoded = verifyToken(token);
		console.log(token, decoded);
		if (!decoded?.id) {
			return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
		}
		const user = (await User.findOne({ _id: decoded?.id }))?.toObject();
		if (!user) {
			return NextResponse.json({ error: 'User not found' }, { status: 404 });
		}

		// Optionally remove sensitive fields
		delete user.password;
		return NextResponse.json(user, { status: 200 });
	} catch (err) {
		console.error('Error verifying token:', err);
		return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
	}
}
