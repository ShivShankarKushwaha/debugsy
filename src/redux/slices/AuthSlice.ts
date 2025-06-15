import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface AuthState {
	isLoggedIn: boolean;
	loading: boolean;
	user: {
		id: string;
		email: string;
		username?: string;
		avatar?: string;
		role?: string;
	} | null;
	error: string | null;
}

const initialState: AuthState = {
	isLoggedIn: false,
	user: null,
	loading: false,
	error: null
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		loginStart: (state) => {
			state.loading = true;
			state.error = null;
		},
		loginSuccess: (state, action) => {
			state.loading = false;
			state.isLoggedIn = true;
			state.user = action.payload;
			state.error = null;
		},
		loginFailure: (state, action) => {
			state.loading = false;
			state.isLoggedIn = false;
			state.user = null;
			state.error = action.payload;
		},
		logout: (state) => {
			state.loading = false;
			state.isLoggedIn = false;
			state.user = null;
			state.error = null;
		},
		setInitialLoginStatus: (state, action) => {
			state.isLoggedIn = action.payload.isLoggedIn;
			state.user = action.payload.user;
			state.loading = false;
			state.error = null;
		}
	}
});

export const { loginStart, loginSuccess, loginFailure, logout, setInitialLoginStatus } = authSlice.actions;

export default authSlice.reducer;

export const logoutUser = createAsyncThunk('auth/logoutUser', async (_, { dispatch, rejectWithValue }) => {
	try {
		const res = await fetch('/api/signout', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' }
		});

		if (!res.ok) {
			throw new Error('Failed to sign out');
		}

		dispatch(logout());
		return true;
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : 'Logout failed';
		return rejectWithValue(errorMessage);
	}
});
