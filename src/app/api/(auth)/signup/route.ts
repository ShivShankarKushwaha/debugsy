// app/api/signup/route.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect'; // Your Mongoose database connection
import { User } from '@/models/User'; // Your Mongoose User model
import { SignUpPayload } from '@/types/Payload.dto'; // Your validation schema
import { generateMagicLink, hashPassword } from '@/lib/authHelper'; // Assuming this hashes passwords
import { sendMail } from '@/lib/Mail';
import { confirmMailTemplate } from '@/MailTemplates';

export async function POST(request: NextRequest) {
	await dbConnect();

	try {
		const payload = await request.json();
		const { error } = SignUpPayload.validate(payload);
		if (error) {
			// Handle validation errors from Joi/yup (or whatever SignUpPayload.validate uses)
			console.error('Signup validation error:', error.details[0].message);
			return NextResponse.json({ message: error.details[0].message }, { status: 400 });
		}

		const { name, email, password } = payload;

		if (password.length < 6) {
			// Ensure password meets minimum length
			return NextResponse.json({ message: 'Password must be at least 6 characters long.' }, { status: 400 });
		}
		// You might add more validation for email format or role enum here

		// --- Check if user already exists with this email ---
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			console.warn(`Signup attempt: User with email '${email}' already exists.`);
			return NextResponse.json(
				{ message: 'User with this email already exists. Please try logging in or using a different email.' },
				{ status: 409 }
			); // 409 Conflict
		}

		// --- Determine and Assign Company ---
		// This is a crucial part based on your schema. You need a way to assign a 'company'.
		// Here are common strategies:
		// 1. User selects company during signup (companyId included in payload)
		//    const { companyId } = payload;
		//    const company = await Company.findById(companyId);
		//    if (!company) {
		//        return NextResponse.json({ message: 'Invalid company selected.' }, { status: 400 });
		//    }
		//    let assignedCompanyId = company._id;

		// --- Hash Password ---
		const hashedPassword = await hashPassword(password);

		const magicLink = await generateMagicLink(email);
		console.log('Generated magic link:', magicLink);

		if (!magicLink) {
			return NextResponse.json({ message: 'Failed to generate magic link for signUp. Please try again later.' }, { status: 500 });
		}
		const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // Magic link expires in 24 hours

		await sendMail({
			to: email,
			subject: 'Email confirmation at DEBUGSY',
			html: confirmMailTemplate({ name, magicLink })
		});

		// --- Create New User Document ---
		const newUser = new User({
			name,
			email,
			image: `https://placehold.co/32x32/2196F3/FFFFFF?text=${name?.toUpperCase()?.slice(0, 2)}`,
			password: hashedPassword, // Store the hashed password
			magicLink,
			magicLinkExpires: expiresAt
		});

		// --- Save the New User to Database ---
		await newUser.save();

		console.log('New user created successfully:', newUser.email);

		const response = NextResponse.json({ message: 'We have sent you a confirmation Email, Please verify it before login' }, { status: 201 });

		return response;
	} catch (error: any) {
		// Catch any unexpected errors during the process
		console.error('Unhandled signup error:', error);
		// Provide a generic error message for security reasons
		return NextResponse.json({ message: 'An unexpected error occurred during registration. Please try again later.' }, { status: 500 });
	}
}
