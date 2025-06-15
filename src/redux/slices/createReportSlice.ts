import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	currentReportForm: {
		reportTitle: '',
		reportDescription: '',
		reportType: 'Bug',
		associatedProject: '',
		priority: 'Medium',
		reporter: '',
		reproductionSteps: '',
		expectedBehavior: '',
		actualBehavior: '',
		status: 'To Do',
		screenshots: null,
		avatar: '',
		date: new Date().toISOString().split('T')[0]
	},
	status: 'idle',
	error: null
};

const createReportSlice = createSlice({
	name: 'createReport',
	initialState,
	reducers: {
		updateFormField: (state, action) => {
			const { field, value } = action.payload;
			state.currentReportForm[field] = value;
		},
		resetForm: (state) => {
			state.currentReportForm = initialState.currentReportForm;
			state.status = 'idle';
			state.error = null;
		},
		setSubmitting: (state) => {
			state.status = 'submitting';
		},
		submissionSucceeded: (state) => {
			state.status = 'succeeded';
			state.error = null;
		},
		submissionFailed: (state, action) => {
			state.status = 'failed';
			state.error = action.payload;
		},
		reportAdded: (state) => {
			state.status = 'succeeded';
			state.error = null;
			state.currentReportForm = initialState.currentReportForm;
		}
	}
});

export const { updateFormField, resetForm, setSubmitting, submissionSucceeded, submissionFailed, reportAdded } = createReportSlice.actions;
export default createReportSlice.reducer;
export const selectCurrentReportForm = (state) => state.createReport.currentReportForm;
export const selectCreateReportStatus = (state) => state.createReport.status;
export const selectCreateReportError = (state) => state.createReport.error;
