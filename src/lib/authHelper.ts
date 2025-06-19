import bcrypt from 'bcrypt';
import Jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import dbConnect from './dbConnect';
import { IUser, User } from '@/models/User';
import crypto from 'crypto';

export const hashPassword = async (password: string) => {
	const hashedPassword = await bcrypt.hash(password, 11);
	return hashedPassword;
};

export const comparePassword = async (password: string, hashedPassword: string) => {
	const match = await bcrypt.compare(password, hashedPassword);
	return match;
};

export const generateToken = (payload: object) => {
	console.log('payload', payload);
	const appSecret = process.env.NEXTAUTH_SECRET;
	if (!appSecret) {
		throw new Error('APP_SECRET is not defined in environment variables');
	}
	const token = Jwt.sign(payload, appSecret, { expiresIn: '7d' });
	return token;
};

export const verifyToken = (token: string) => {
	const appSecret = process.env.NEXTAUTH_SECRET;
	if (!appSecret) {
		throw new Error('APP_SECRET is not defined in environment variables');
	}
	try {
		const payload = Jwt.verify(token, appSecret);
		return payload;
	} catch {
		throw new Error('Invalid or expired token');
	}
};

export const getUserFromCookie = async () => {
	try {
		const cookieStore = await cookies();
		const token = cookieStore.get('token')?.value;
		if (!token) {
			return null;
		}
		const userData = verifyToken(token);
		return userData;
	} catch {
		return null;
	}
};

export const getUserByEmail = async (email: string): Promise<IUser | null> => {
	await dbConnect();
	const user = await User.findOne({ email }).select('+password');
	if (!user) {
		return null;
	}
	return user;
};

export const generateMagicLink = async (email: string): Promise<string | null> => {
	await dbConnect(); // Ensure database connection

	if (!email) {
		return null;
	}

	// Generate a cryptographically secure, URL-safe token
	const token = crypto.randomBytes(32).toString('hex'); // 32 bytes = 64 hex characters

	const baseUrl = process.env.NEXTAUTH_URL;
	const magicLinkUrl = `${baseUrl}/auth/magic-link?token=${token}&email=${encodeURIComponent(email)}`;
	return magicLinkUrl;
};
