import { generateMagicLink } from '@/lib/authHelper';
import dbConnect from '@/lib/dbConnect';
import { sendMail } from '@/lib/Mail';
import { confirmMailTemplate } from '@/MailTemplates';
import { User } from '@/models/User';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
	try {
		const { email, magicLink } = await req.json();

		if (!email || !magicLink) {
			return new NextResponse(JSON.stringify({ message: 'Email and magic link are required.' }), {
				status: 400,
				headers: { 'Content-Type': 'application/json', 'X-Error-Code': 'MISSING_FIELDS' }
			});
		}
		await dbConnect();
		const user = await User.findOne({ email });
		if (!user) {
			return new NextResponse(JSON.stringify({ message: 'User not found.' }), {
				status: 404,
				headers: { 'Content-Type': 'application/json', 'X-Error-Code': 'USER_NOT_FOUND' }
			});
		}

		if (user.emailVerified) {
			return new NextResponse(JSON.stringify({ message: 'Email already verified. You can login now.' }), {
				status: 200,
				headers: { 'Content-Type': 'application/json', 'X-Error-Code': 'EMAIL_ALREADY_VERIFIED' }
			});
		}
		const isValid = user.magicLink === magicLink;

		if (!isValid) {
			return new NextResponse(JSON.stringify({ message: 'Invalid or expired magic link.' }), {
				status: 401,
				headers: { 'Content-Type': 'application/json', 'X-Error-Code': 'INVALID_MAGIC_LINK' }
			});
		}

		const now = Date.now();

		if (user.magicLinkExpires && new Date(user.magicLinkExpires).getTime() < now) {
			return new NextResponse(JSON.stringify({ message: 'Link has expired. Please request a new link' }), {
				status: 401,
				headers: { 'Content-Type': 'application/json', 'X-Error-Code': 'MAGIC_LINK_EXPIRED' }
			});
		}

		user.emailVerified = true;
		user.magicLink = null; // Clear the magic link after successful verification
		user.magicLinkExpires = null; // Clear the expiration time
		await user.save();

		return NextResponse.json({ message: 'Authentication successful! You can login now.' }, { status: 200 });
	} catch (err: any) {
		return new NextResponse(JSON.stringify({ message: err.message || 'Authentication failed.' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json', 'X-Error-Code': 'INTERNAL_ERROR' }
		});
	}
}

export async function PATCH(req: NextRequest) {
	try {
		const { email } = await req.json();

		if (!email) {
			return new NextResponse(JSON.stringify({ message: 'Email is required.' }), {
				status: 400,
				headers: { 'Content-Type': 'application/json', 'X-Error-Code': 'MISSING_EMAIL' }
			});
		}

		await dbConnect();
		const user = await User.findOne({ email });

		if (!user) {
			return new NextResponse(JSON.stringify({ message: 'User not found.' }), {
				status: 404,
				headers: { 'Content-Type': 'application/json', 'X-Error-Code': 'USER_NOT_FOUND' }
			});
		}

		if (user.emailVerified) {
			return new NextResponse(JSON.stringify({ message: 'Email already verified. You can login now.' }), {
				status: 200,
				headers: { 'Content-Type': 'application/json', 'X-Error-Code': 'EMAIL_ALREADY_VERIFIED' }
			});
		}

		const magicLink = await generateMagicLink(email);
		console.log('Generated magic link:', magicLink);

		if (!magicLink) {
			return NextResponse.json(
				{ message: 'Failed to generate magic link for signUp. Please try again later.' },
				{ status: 500, headers: { 'Content-Type': 'application/json', 'X-Error-Code': 'LINK_GENERATION_FAILED' } }
			);
		}
		const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // Magic link expires in 24 hours

		await sendMail({
			to: email,
			subject: 'Email confirmation at DEBUGSY',
			html: confirmMailTemplate({ name: user?.name, magicLink })
		});
		user.magicLink = magicLink;
		user.magicLinkExpires = expiresAt;
		await user.save();

		// TODO: Send the magic link to the user's email address here

		return NextResponse.json({ message: 'A new magic link has been sent to your email.' }, { status: 200 });
	} catch (err: any) {
		return new NextResponse(JSON.stringify({ message: err.message || 'Failed to resend magic link.' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json', 'X-Error-Code': 'INTERNAL_ERROR' }
		});
	}
}
