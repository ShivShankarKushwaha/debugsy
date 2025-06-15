import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthModalType = 'login' | 'signup' | null;

interface AuthModalState {
	open: boolean;
	type: AuthModalType;
}

const initialState: AuthModalState = {
	open: false,
	type: null
};

export const authModalSlice = createSlice({
	name: 'authModal',
	initialState,
	reducers: {
		openModal: (state, action: PayloadAction<AuthModalType>) => {
			state.open = true;
			state.type = action.payload;
		},
		closeModal: (state) => {
			state.open = false;
			state.type = null;
		},
		switchModal: (state, action: PayloadAction<AuthModalType>) => {
			if (state.type === action.payload) {
				state.open = !state.open;
			} else {
				state.type = action.payload;
				state.open = true;
			}
		}
	}
});

export const { openModal, closeModal, switchModal } = authModalSlice.actions;
export default authModalSlice.reducer;
