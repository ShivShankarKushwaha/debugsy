import { Schema, model, models, Document } from 'mongoose';

export interface IUser extends Document {
	username: string;
	email: string;
	role: 'Developer' | 'Manager';
	password: string;
	createdAt: Date;
}

const UserSchema = new Schema<IUser>({
	username: { type: String, required: true, unique: true, trim: true },
	email: { type: String, required: true, unique: true, lowercase: true, trim: true },
	role: { type: String, enum: ['Developer', 'Manager'], default: 'Developer' },
	password: { type: String, required: true },
	createdAt: { type: Date, default: Date.now }
});

export const User = models.User || model<IUser>('User', UserSchema);
