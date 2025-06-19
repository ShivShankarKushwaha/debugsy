import mongoose from 'mongoose';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_URI;

if (!uri) {
	throw new Error('Please define the MONGO_URI environment variable inside .env.local');
}

declare global {
	interface Global {
		__mongooseCache?: {
			conn: typeof mongoose | null;
			clientPromise: Promise<MongoClient> | null;
			promise: Promise<MongoClient> | null;
		};
	}
	interface NodeJS {
		Global: Global;
	}
}

const globalAny = global as typeof globalThis & {
	__mongooseCache?: {
		conn: typeof mongoose | null;
		clientPromise: Promise<MongoClient> | null;
		promise: Promise<MongoClient> | null;
	};
};

let cached = globalAny.__mongooseCache;
if (!cached) {
	cached = globalAny.__mongooseCache = { conn: null, clientPromise: null, promise: null };
}

const dbConnect = async (): Promise<MongoClient> => {
	if (cached.conn && cached.conn.connections[0].readyState === 1) {
		return cached.conn.connection.getClient();
	}

	if (!cached.promise) {
		const opts = {
			bufferCommands: false
		};

		cached.promise = mongoose.connect(uri, opts).then((mongooseInstance) => {
			cached.conn = mongooseInstance;
			return mongooseInstance.connection.getClient();
		});
	}

	cached.clientPromise = cached.promise;
	return await cached.promise;
};

export default dbConnect;
