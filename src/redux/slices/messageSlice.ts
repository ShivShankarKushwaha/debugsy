import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	inboxMessages: [
		{
			id: 1,
			sender: 'Shiv Shankar',
			subject: 'Project Update: Website Redesign',
			snippet: 'Hi, the latest wireframes are ready for review...',
			time: '2h ago',
			read: false
		},
		{
			id: 2,
			sender: 'Anurag',
			subject: 'Meeting Reminder: Daily Standup',
			snippet: 'Just a reminder for the daily standup at 10 AM...',
			time: 'Yesterday',
			read: true
		},
		{
			id: 3,
			sender: 'Prabhat',
			subject: 'New Feature Request: User Authentication',
			snippet: 'Please review the new user authentication feature request...',
			time: '3 days ago',
			read: false
		}
	],
	composeForm: {
		recipient: '',
		subject: '',
		message: ''
	},
	status: 'idle',
	error: null
};

const messagesSlice = createSlice({
	name: 'messages',
	initialState,
	reducers: {
		addMessage: (state, action) => {
			state.inboxMessages.push(action.payload);
		},
		markAsRead: (state, action) => {
			const message = state.inboxMessages.find((msg) => msg.id === action.payload);
			if (message) {
				message.read = true;
			}
		},
		deleteMessage: (state, action) => {
			state.inboxMessages = state.inboxMessages.filter((msg) => msg.id !== action.payload);
		},
		updateComposeField: (state, action) => {
			const { field, value } = action.payload;
			state.composeForm[field] = value;
		},
		resetComposeForm: (state) => {
			state.composeForm = initialState.composeForm;
			state.status = 'idle';
			state.error = null;
		},
		sendMessageStart: (state) => {
			state.status = 'sending';
		},
		sendMessageSuccess: (state) => {
			state.status = 'succeeded';
			state.error = null;
			state.composeForm = initialState.composeForm;
		},
		sendMessageFailure: (state, action) => {
			state.status = 'failed';
			state.error = action.payload;
		}
	}
});

export const {
	addMessage,
	markAsRead,
	deleteMessage,
	updateComposeField,
	resetComposeForm,
	sendMessageStart,
	sendMessageSuccess,
	sendMessageFailure
} = messagesSlice.actions;

export default messagesSlice.reducer;

export const selectAllMessages = (state) => state.messages.inboxMessages;
export const selectComposeForm = (state) => state.messages.composeForm;
export const selectMessagesStatus = (state) => state.messages.status;
export const selectMessagesError = (state) => state.messages.error;
