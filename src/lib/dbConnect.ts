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
	if (cached.conn) {
		return cached.conn;
	}

	if (!cached.promise) {
		const opts = {
			bufferCommands: false // Disable mongoose's buffering of commands
		};

		cached.promise = mongoose.connect(uri, opts);
	}

	cached.conn = await cached.promise;
	return cached.conn;
};

export default dbConnect;
