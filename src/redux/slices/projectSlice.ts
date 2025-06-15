import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	projects: [
		{
			id: 1,
			name: 'Website Redesign',
			description: 'Redesigning the corporate website for a modern look and improved UX.',
			status: 'In Progress',
			progress: 75,
			startDate: '2025-01-10',
			endDate: '2025-07-31'
		},
		{
			id: 2,
			name: 'Mobile App Development',
			description: 'Developing a cross-platform mobile app for our services.',
			status: 'Completed',
			progress: 100,
			startDate: '2024-11-01',
			endDate: '2025-08-15'
		},
		{
			id: 3,
			name: 'Database Migration',
			description: 'Migrating legacy data to a new cloud-based database.',
			status: 'To Do',
			progress: 0,
			startDate: '2025-02-01',
			endDate: '2025-02-28'
		},
		{
			id: 4,
			name: 'Marketing Campaign',
			description: 'Launching a new marketing campaign for product awareness.',
			status: 'In Review',
			progress: 90,
			startDate: '2025-01-20',
			endDate: '2025-10-10'
		}
	],
	status: 'idle',
	error: null
};

const projectsSlice = createSlice({
	name: 'projects',
	initialState,
	reducers: {
		addProject: (state, action) => {
			state.projects.push(action.payload);
		},
		updateProject: (state, action) => {
			const { id, updatedProject } = action.payload;
			const existingProject = state.projects.find((project) => project.id === id);
			if (existingProject) {
				Object.assign(existingProject, updatedProject);
			}
		},
		deleteProject: (state, action) => {
			state.projects = state.projects.filter((project) => project.id !== action.payload);
		}
	}
});

export const { addProject, updateProject, deleteProject } = projectsSlice.actions;
export default projectsSlice.reducer;
export const selectAllProjects = (state) => state.projects.projects;
export const selectProjectById = (state, projectId) => state.projects.projects.find((project) => project.id === projectId);
