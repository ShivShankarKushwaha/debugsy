import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProject extends Document {
	name: string;
	description?: string;
	company: mongoose.Types.ObjectId;
	projectLead?: mongoose.Types.ObjectId;
	developers: mongoose.Types.ObjectId[];
	status: 'planning' | 'in_progress' | 'completed' | 'on_hold' | 'cancelled';
	startDate?: Date;
	endDate?: Date;
	createdAt: Date;
	updatedAt: Date;
}

const ProjectSchema: Schema<IProject> = new Schema<IProject>(
	{
		name: {
			type: String,
			required: true,
			trim: true,
			description: 'The name of the project.'
		},
		description: {
			type: String,
			description: 'A detailed description of the project.'
		},
		company: {
			type: Schema.Types.ObjectId,
			ref: 'Company',
			required: true,
			description: 'The company that owns this project.'
		},
		projectLead: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			description: 'The user responsible for leading this project.'
		},
		developers: [
			{
				type: Schema.Types.ObjectId,
				ref: 'User',
				description: 'Developers assigned to work on this project.'
			}
		],
		status: {
			type: String,
			enum: ['planning', 'in_progress', 'completed', 'on_hold', 'cancelled'],
			default: 'planning',
			description: 'Current status of the project.'
		},
		startDate: {
			type: Date,
			description: 'The planned start date for the project.'
		},
		endDate: {
			type: Date,
			description: 'The planned end date for the project.'
		}
	},
	{
		timestamps: true // Automatically manages createdAt and updatedAt
	}
);

const Project: Model<IProject> = mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);

export default Project;
