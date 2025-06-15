import { configureStore } from '@reduxjs/toolkit';
import modalReducer from '@/redux/slices/AuthModalSlice';
import authReducer from '@/redux/slices/AuthSlice';

export const store = configureStore({
	reducer: {
		authmodal: modalReducer,
		auth: authReducer
	}
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
