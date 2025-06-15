import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	reports: [
		{
			id: 451235,
			status: 'Done',
			reportTitle: 'Create wireframe for home page',
			reportDescription: '',
			reportType: 'Feature',
			associatedProject: '',
			assignedTo: 'shivshankar',
			priority: 'Medium',
			reporter: 'Vaibhav',
			reproductionSteps: '',
			expectedBehavior: '',
			actualBehavior: '',
			screenshots: null,
			date: '01 Jan 2025',
			avatar: 'https://placehold.co/32x32/FFC107/000000?text=VB'
		},
		{
			id: 451236,
			status: 'In Progress',
			reportTitle: 'Fix login bug',
			reportDescription: 'Users unable to login with valid credentials.',
			reportType: 'Bug',
			associatedProject: 'Authentication',
			assignedTo: '',
			priority: 'High',
			reporter: 'Amit',
			reproductionSteps: '1. Go to login page\n2. Enter valid credentials\n3. Click login',
			expectedBehavior: 'User should be logged in',
			actualBehavior: 'Error message shown',
			screenshots: null,
			date: '02 Jan 2025',
			avatar: 'https://placehold.co/32x32/2196F3/FFFFFF?text=AM'
		},
		{
			id: 451237,
			status: 'To Do',
			reportTitle: 'Add dark mode',
			reportDescription: 'Implement dark mode for better accessibility.',
			reportType: 'Enhancement',
			associatedProject: 'UI/UX',
			assignedTo: 'shivshankar',
			priority: 'Low',
			reporter: 'Priya',
			reproductionSteps: '',
			expectedBehavior: 'Toggle to switch between light and dark mode',
			actualBehavior: '',
			screenshots: null,
			date: '03 Jan 2025',
			avatar: 'https://placehold.co/32x32/4CAF50/FFFFFF?text=PR'
		},
		{
			id: 451238,
			status: 'To Do',
			reportTitle: 'Update dependencies',
			reportDescription: 'Update all npm dependencies to latest versions.',
			reportType: 'Task',
			associatedProject: 'DevOps',
			assignedTo: 'shivshankar',
			priority: 'Medium',
			reporter: 'Sonia',
			reproductionSteps: '',
			expectedBehavior: 'All dependencies updated without breaking changes',
			actualBehavior: '',
			screenshots: null,
			date: '04 Jan 2025',
			avatar: 'https://placehold.co/32x32/E91E63/FFFFFF?text=SO'
		}
	],
	status: 'idle',
	error: null
};

const reportsSlice = createSlice({
	name: 'reports',
	initialState,
	reducers: {
		addReport: (state, action) => {
			state.reports.push(action.payload);
		},
		updateReport: (state, action) => {
			const { id, updatedReport } = action.payload;
			const existingReport = state.reports.find((report) => report.id === id);
			if (existingReport) {
				Object.assign(existingReport, updatedReport);
			}
		},
		deleteReport: (state, action) => {
			state.reports = state.reports.filter((report) => report.id !== action.payload);
		}
	}
});

export const { addReport, updateReport, deleteReport } = reportsSlice.actions;
export default reportsSlice.reducer;
export const selectAllReports = (state) => state.reports.reports;
export const selectReportById = (state, reportId) => state.reports.reports.find((report) => report.id === reportId);
