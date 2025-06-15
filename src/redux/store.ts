import { configureStore } from '@reduxjs/toolkit';
import modalReducer from '@/redux/slices/AuthModalSlice';
import authReducer from '@/redux/slices/AuthSlice';
import reportReducer from '@/redux/slices/reportSlice';
import createReportReducer from '@/redux/slices/createReportSlice';
import projectsReportReducer from '@/redux/slices/projectSlice';
import messagesReducer from '@/redux/slices/messageSlice';
import addProjectReducer from '@/redux/slices/AddProjectSlice';
import teamReducer from '@/redux/slices/teamSlice';

export const store = configureStore({
	reducer: {
		authmodal: modalReducer,
		auth: authReducer,
		reports: reportReducer,
		createReport: createReportReducer,
		projects: projectsReportReducer,
		messages: messagesReducer,
		addProject: addProjectReducer,
		team: teamReducer
	}
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
