import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	currentProjectForm: {
		projectName: '',
		projectDescription: '',
		startDate: '',
		endDate: '',
		projectStatus: 'To Do'
	},
	status: 'idle',
	error: null
};

const addProjectSlice = createSlice({
	name: 'addProject',
	initialState,
	reducers: {
		updateFormField: (state, action) => {
			const { field, value } = action.payload;
			state.currentProjectForm[field] = value;
		},
		resetForm: (state) => {
			state.currentProjectForm = initialState.currentProjectForm;
			state.status = 'idle';
			state.error = null;
		},
		setSubmitting: (state) => {
			state.status = 'submitting';
		},
		submissionSucceeded: (state) => {
			state.status = 'succeeded';
			state.error = null;
			state.currentProjectForm = initialState.currentProjectForm;
		},
		submissionFailed: (state, action) => {
			state.status = 'failed';
			state.error = action.payload;
		}
	}
});

export const { updateFormField, resetForm, setSubmitting, submissionSucceeded, submissionFailed } = addProjectSlice.actions;
export default addProjectSlice.reducer;

export const selectCurrentProjectForm = (state) => state.addProject.currentProjectForm;
export const selectAddProjectStatus = (state) => state.addProject.status;
export const selectAddProjectError = (state) => state.addProject.error;
