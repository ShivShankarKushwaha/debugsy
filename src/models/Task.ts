import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IComment {
	text: string;
	author: mongoose.Types.ObjectId;
	createdAt?: Date;
}

export interface ITask extends Document {
	title: string;
	description?: string;
	company: mongoose.Types.ObjectId;
	project: mongoose.Types.ObjectId;
	type: 'bug' | 'task' | 'feature' | 'enhancement';
	status: 'open' | 'in_progress' | 'resolved' | 'closed' | 'reopened' | 'pending_review';
	priority: 'low' | 'medium' | 'high' | 'critical';
	assignedTo?: mongoose.Types.ObjectId;
	reporter: mongoose.Types.ObjectId;
	dueDate?: Date;
	screenshots?: string[];
	comments?: IComment[];
	createdAt?: Date;
	updatedAt?: Date;
}

const CommentSchema = new Schema<IComment>(
	{
		text: { type: String, required: true },
		author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		createdAt: { type: Date, default: Date.now }
	},
	{ _id: true }
);

const TaskSchema = new Schema<ITask>(
	{
		title: { type: String, required: true, trim: true },
		description: { type: String },
		company: { type: Schema.Types.ObjectId, ref: 'Company', required: true },
		project: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
		type: {
			type: String,
			enum: ['bug', 'task', 'feature', 'enhancement'],
			default: 'task',
			required: true
		},
		status: {
			type: String,
			enum: ['open', 'in_progress', 'resolved', 'closed', 'reopened', 'pending_review'],
			default: 'open',
			required: true
		},
		priority: {
			type: String,
			enum: ['low', 'medium', 'high', 'critical'],
			default: 'medium',
			required: true
		},
		assignedTo: { type: Schema.Types.ObjectId, ref: 'User' },
		reporter: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		dueDate: { type: Date },
		screenshots: [{ type: String }],
		comments: [CommentSchema],
		createdAt: { type: Date, default: Date.now },
		updatedAt: { type: Date, default: Date.now }
	},
	{ collection: 'bugs_tasks', timestamps: true }
);

export const Task: Model<ITask> = mongoose.models.Task || mongoose.model<ITask>('Task', TaskSchema);
