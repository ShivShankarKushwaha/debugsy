import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Project from '@/models/Project';

// GET: List all projects
export async function GET(req: NextRequest) {
	console.log('req', { req });

	await dbConnect();
	// need to work here
	return NextResponse.json(req);
}

// POST: Create a new project
export async function POST(req: NextRequest) {
	await dbConnect();
	const body = await req.json();
	try {
		const project = new Project(body);
		await project.save();
		return NextResponse.json(project, { status: 201 });
	} catch (err: any) {
		return NextResponse.json({ error: err.message }, { status: 400 });
	}
}

// PATCH: Update a project by ID
export async function PATCH(req: NextRequest) {
	await dbConnect();
	const { id, ...update } = await req.json();
	if (!id) {
		return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
	}
	try {
		const project = await Project.findByIdAndUpdate(id, update, { new: true });
		if (!project) {
			return NextResponse.json({ error: 'Project not found' }, { status: 404 });
		}
		return NextResponse.json(project);
	} catch (err: any) {
		return NextResponse.json({ error: err.message }, { status: 400 });
	}
}
