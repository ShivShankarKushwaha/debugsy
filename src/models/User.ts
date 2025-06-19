import { Schema, model, models, Document, Types } from 'mongoose';

export interface IUser extends Document {
	name: string;
	email: string;
	image?: string;
	password?: string;
	providerId?: string;
	magicLink?: string;
	magicLinkExpires?: Date;
	emailVerified: boolean;
	company?: Types.ObjectId;
	projects?: Types.ObjectId[];
	role: 'admin' | 'manager' | 'developer' | 'viewer';
	createdAt: Date;
	updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
	{
		name: {
			type: String,
			required: true,
			trim: true,
			minlength: 5,
			maxlength: 50,
			description: "User's full name, used for identification and display purposes."
		},
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			lowercase: true,
			minlength: 5,
			maxlength: 100,
			description: "User's email address, used for login and notifications."
		},
		image: {
			type: String,
			trim: true,
			description: "URL of the user's profile picture."
		},
		password: {
			type: String,
			description: 'Hashed password for credential-based login.'
		},
		providerId: {
			type: String,
			description: 'ID from external authentication provider (e.g., Google, GitHub).',
			default: 'custom'
		},
		magicLink: {
			type: String,
			description: 'Magic link token for passwordless authentication.'
		},
		magicLinkExpires: {
			type: Date,
			description: 'Expiration time for the magic link token.'
		},
		emailVerified: {
			type: Boolean,
			default: false,
			description: "Indicates whether the user's email has been verified."
		},
		company: {
			type: Schema.Types.ObjectId,
			ref: 'Company',
			description: 'The company the user belongs to.'
		},
		projects: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Project',
				description: 'Projects associated with the user.'
			}
		],
		role: {
			type: String,
			enum: ['admin', 'manager', 'developer', 'viewer'],
			default: 'developer',
			description: 'The role of the user within the system/company.'
		},
		createdAt: {
			type: Date,
			default: Date.now,
			description: 'Timestamp when the user record was created.'
		},
		updatedAt: {
			type: Date,
			default: Date.now,
			description: 'Timestamp when the user record was last updated.'
		}
	},
	{ timestamps: true }
);

export const User = models.User || model<IUser>('User', UserSchema);
