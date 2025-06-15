import { NextResponse } from 'next/server';

export const GET = async (_request: Request) => {
	try {
		const data = {
			message: 'Hello, this is a response from the API route!',
			timestamp: new Date().toISOString()
		};

		return NextResponse.json(data, {
			status: 200
		});
	} catch (error) {
		console.error('Error in API route:', error);
		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{
				status: 500,
				headers: {
					'Content-Type': 'application/json',
					'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate'
				}
			}
		);
	}
};
