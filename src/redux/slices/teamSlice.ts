import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	members: [
		{ id: '451235', name: 'VAIBHAV', avatar: 'https://placehold.co/32x32/FFD700/000000?text=VB' },
		{ id: '451236', name: 'AMIT', avatar: 'https://placehold.co/32x32/FFD700/000000?text=AM' },
		{ id: '451237', name: 'PRIYA', avatar: 'https://placehold.co/32x32/FFD700/000000?text=PY' },
		{ id: '451238', name: 'SONIA', avatar: 'https://placehold.co/32x32/FFD700/000000?text=SA' },
		{ id: '451239', name: 'ANURAG', avatar: 'https://placehold.co/32x32/A020F0/FFFFFF?text=AN' },
		{ id: '451240', name: 'PRABHAT', avatar: 'https://placehold.co/32x32/A020F0/FFFFFF?text=PB' },
		{ id: '451241', name: 'SHIV SHANKAR', avatar: 'https://placehold.co/32x32/A020F0/FFFFFF?text=SK' },
		{ id: '451242', name: 'DEEPAK', avatar: 'https://placehold.co/32x32/00BFFF/FFFFFF?text=DK' }
	],
	status: 'idle',
	error: null
};

const teamSlice = createSlice({
	name: 'team',
	initialState,
	reducers: {
		addTeamMember: (state, action) => {
			state.members.push(action.payload);
		},
		removeTeamMember: (state, action) => {
			state.members = state.members.filter((member) => member.id !== action.payload);
		},
		updateTeamMember: (state, action) => {
			const { id, updates } = action.payload;
			const member = state.members.find((m) => m.id === id);
			if (member) {
				Object.assign(member, updates);
			}
		}
	}
});

export const { addTeamMember, removeTeamMember, updateTeamMember } = teamSlice.actions;

export default teamSlice.reducer;

export const selectTeamMembers = (state: any) => state.team.members;
