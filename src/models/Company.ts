import mongoose, { Schema, Document, Model } from 'mongoose';

interface ICompany extends Document {
	name: string;
	description?: string;
	createdAt: Date;
	updatedAt: Date;
}

const CompanySchema: Schema<ICompany> = new Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			description: 'The official name of the company.'
		},
		description: {
			type: String,
			description: 'A brief description of the company.'
		},
		createdAt: {
			type: Date,
			default: Date.now,
			description: 'Timestamp when the company record was created.'
		},
		updatedAt: {
			type: Date,
			default: Date.now,
			description: 'Timestamp when the company record was last updated.'
		}
	},
	{
		timestamps: true
	}
);

const Company: Model<ICompany> = mongoose.models.Company || mongoose.model<ICompany>('Company', CompanySchema);

export default Company;
