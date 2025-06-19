// lib/mail.ts
import nodemailer from 'nodemailer';
import { google } from 'googleapis';

// Initialize Google OAuth2 client with your app's credentials
const OAuth2_client = new google.auth.OAuth2(process.env.GMAIL_CLIENT_ID, process.env.GMAIL_CLIENT_SECRET);

// Set the refresh token obtained manually (e.g., from OAuth Playground)
// This will allow the client to automatically fetch new access tokens
// when the current one expires.
console.log('Setting refresh token for OAuth2 client:', process.env.GMAIL_REFRESH_TOKEN);
OAuth2_client.setCredentials({ refresh_token: process.env.GMAIL_REFRESH_TOKEN });

interface SendMailData {
	to: string;
	subject?: string;
	html: string;
}

export const sendMail = async (data: SendMailData): Promise<{ status: number; message: string; result?: any; err?: any }> => {
	try {
		const tokenResponse = await OAuth2_client.getAccessToken();
		const accessToken = tokenResponse.token;

		console.log('Obtained access token:', accessToken);

		if (!accessToken) {
			throw new Error('Failed to obtain Gmail API access token.');
		}

		// Create a Nodemailer transporter configured for Gmail with OAUTH2
		const transport = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				type: 'OAUTH2',
				user: process.env.GMAIL_USER, // The email address associated with the refresh token
				clientId: process.env.GOOGLE_CLIENT_ID,
				clientSecret: process.env.GOOGLE_CLIENT_SECRET,
				refreshToken: process.env.GMAIL_REFRESH_TOKEN,
				accessToken: accessToken // Use the dynamically obtained access token
			}
		});

		// Construct the mail options
		const mailOption = {
			from: `Debugsy <${process.env.GMAIL_USER}>`, // Display name and sender email
			to: data.to,
			subject: data.subject,
			html: data.html
		};

		// Send the email
		const result = await transport.sendMail(mailOption);
		transport.close(); // Close the transport connection after sending

		console.log('Mail sent successfully:', result);
		return { status: 200, message: 'Mail sent successfully', result };
	} catch (err: any) {
		console.error('Error sending mail:', err);
		// Provide more detail in the error object for debugging
		return {
			status: err.code || 300, // Use Google API error code if available, otherwise default
			message: 'Mail not sent',
			err: err
		};
	}
};
