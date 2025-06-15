import bcrypt from 'bcrypt';
import Jwt from 'jsonwebtoken';

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
	const appSecret = process.env.APP_SECRET;
	if (!appSecret) {
		throw new Error('APP_SECRET is not defined in environment variables');
	}
	const token = Jwt.sign(payload, appSecret, { expiresIn: '7d' });
	return token;
};

export const verifyToken = (token: string) => {
	const appSecret = process.env.APP_SECRET;
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
