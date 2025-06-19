import NextAuth, { SessionStrategy } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { comparePassword, getUserByEmail } from '@/lib/authHelper'; // Assuming this is for your credentials provider
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'; // Import the MongoDB adapter
import dbConnect from '@/lib/dbConnect'; // Your Mongoose connection function
import { User } from '@/models/User'; // Assuming your Mongoose User model is exported default from this path

const authOptions = {
	adapter: MongoDBAdapter(dbConnect()),

	session: {
		strategy: 'jwt' as SessionStrategy,
		maxAge: 5 * 24 * 60 * 60 // 5 days
	},

	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!
		}),
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'email' },
				password: { label: 'Password', type: 'password' }
			},
			async authorize(credentials: Record<'email' | 'password', string> | undefined) {
				try {
					// Ensure the database connection is established before querying
					await dbConnect();

					const { email, password } = credentials ?? {};

					// Basic validation for input
					if (!email || !password) {
						throw new Error('Email and password are required.');
					}

					// This `getUserByEmail` should fetch the user from your MongoDB 'users' collection
					// using your Mongoose User model.
					const user = await getUserByEmail(email);

					if (!user) {
						// If user is not found, throw an error
						console.log('User not found in database:', email);
						throw new Error('User not found. Please sign up.');
					}

					console.log('User fetched from database:', user);
					if (!user?.emailVerified) {
						console.log('User email is not verified');
						throw new Error('Email not verified. Please check your inbox for the verification link.');
					}

					if (user?.providerId === 'google') {
						console.log('User signed up with Google, cannot use credentials login');
						throw new Error('You signed up with Google, please use Google login instead.');
					}
					if (!(await comparePassword(password, user?.password as string))) {
						// Check if user exists and password is correct
						throw new Error('Invalid email or password');
					}

					// check if user email is verified
					console.log('User email verification status:', user);

					// Ensure the 'id' returned is a string and not undefined
					const id = user?._id?.toString();
					if (!id) {
						throw new Error('User ID is not defined');
					}

					return {
						id,
						name: user.name,
						image: user.image ?? null,
						email: user.email,
						role: user.role,
						company: user.company?.toString() ?? null,
						emailVerified: user.emailVerified ?? null
					};
				} catch (error: any) {
					console.error('CredentialsSignin:', error);
					throw new Error(error.message || 'An error occurred during sign-in. Please try again.');
				}
			}
		})
	],
	pages: {
		signIn: '/#login',
		signup: '/#signup'
		// You can define a custom error page here.
		// If not defined, NextAuth.js will redirect to signIn page with an error query param.
		// error: '/auth/error',
	},
	secret: process.env.NEXTAUTH_SECRET,
	callbacks: {
		// The 'signIn' callback is invoked when a user successfully signs in,
		// allowing you to perform additional actions.
		async signIn({ user, account, profile }: { user: any; account: any; profile?: any }) {
			console.log('SignIn Callback - User:', user);
			console.log('SignIn Callback - Account:', account);
			console.log('SignIn Callback - Profile:', profile);

			// NextAuth does not pass isNewUser directly; check account?.provider and account?.type
			const isNewUser = account?.type === 'oauth' && account?.provider === 'google' && account?.['isNewUser'];

			// This block handles setting default role/company for *new* Google sign-ups.
			// The NextAuth.js adapter already handles the core user creation/linking.
			if (isNewUser) {
				try {
					// Ensure Mongoose connection is ready before using the User model directly
					await dbConnect();

					const userExists = await User.findOne({ email: user.email });
					if (userExists) {
						console.log('User already exists in the database:', userExists);
						return true; // Allow sign-in if user already exists
					}

					// Update the user created by the MongoDBAdapter to set custom fields.
					const updatedUser = await User.findByIdAndUpdate(
						user.id, // user.id here is the _id from the newly created MongoDB user document
						{
							$set: {
								role: 'developer',
								providerId: 'google',
								company: null,
								emailVerified: true,
								createdAt: new Date(),
								updatedAt: new Date()
							}
						},
						{ new: true } // `new: true` returns the updated document
					);
					console.log('Default role/company set for new Google user:', updatedUser);
				} catch (error) {
					console.error('Error setting default role/company for new Google user in signIn callback:', error);
					// Decide if you want to prevent sign-in on error, or just log it.
					// For now, it will proceed with sign-in even if the update fails.
					// If this update is critical for user functionality, you might return false here
					// or redirect to a specific error page.
				}
			}
			return true; // Return true to allow the sign-in to proceed
		},
		// The 'jwt' callback adds custom properties to the JWT token.
		// This token is then used for managing the session.
		async jwt({
			token,
			user,
			account
		}: {
			token: import('next-auth/jwt').JWT;
			user?: import('next-auth').User;
			account?: import('next-auth').Account | null;
		}) {
			// 'user' is available during sign-in and represents the database user record.
			// This is where you populate the JWT token with user data from your DB.
			if (user) {
				// Ensure 'user' properties are correctly accessed, potentially with type assertions
				token.id = user.id;
				token.name = (user as { name?: string }).name;
				token.role = (user as { role?: string }).role;
				token.company = (user as { company?: any }).company?.toString(); // company could be ObjectId or string
			}
			// For OAuth providers (like Google), store the access token if you need to
			// make API calls to the provider on behalf of the user.
			if (account) {
				token.accessToken = account.access_token;
			}
			return token;
		},
		// The 'session' callback extends the session object, making custom properties
		// available on the client-side via the `useSession()` hook.
		// This callback receives the token from the `jwt` callback.
		async session({ session, token }: { session: any; token: import('next-auth/jwt').JWT }) {
			if (session.user) {
				session.user.id = token.id as string;
				session.user.name = token.name as string;
				session.user.role = token.role as string;
				session.user.company = token.company as string;
			}
			session.accessToken = token.accessToken;
			return session;
		}
	}
};

const handler = NextAuth(authOptions as any);

export { handler as GET, handler as POST };
