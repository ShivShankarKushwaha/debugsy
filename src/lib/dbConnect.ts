import mongoose from 'mongoose';

const uri = process.env.MONGO_URI;

if (!uri) {
	throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

declare global {
	interface Global {
		mongooseCache?: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null };
	}
}

let cached = (global as any).mongooseCache;

if (!cached) {
	cached = (global as any).mongooseCache = { conn: null, promise: null };
}

const dbConnect = async () => {
	// If a connection is already established, return it.
	if (cached.conn) {
		return cached.conn;
	}

	if (!cached.promise) {
		const opts = {
			bufferCommands: false // Disable Mongoose's internal buffering
			// You can add other options here, e.g., useNewUrlParser: true, useUnifiedTopology: true
			// These are often not needed with recent Mongoose versions as they are defaults.
		};

		cached.promise = mongoose.connect(uri, opts);
	}

	// Await the connection promise and cache the connection object
	cached.conn = await cached.promise;
	return cached.conn;
};

export default dbConnect;
