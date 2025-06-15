'use client';
import { MessageSquare } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import {
	selectAllMessages,
	selectComposeForm,
	selectMessagesStatus,
	addMessage,
	markAsRead,
	deleteMessage,
	updateComposeField,
	resetComposeForm,
	sendMessageStart,
	sendMessageSuccess,
	sendMessageFailure
} from '@/redux/slices/messageSlice';
import { toast } from 'react-toastify';

const MessagesPage = () => {
	const dispatch = useDispatch();
	const messages = useSelector(selectAllMessages);
	const composeForm = useSelector(selectComposeForm);
	const status = useSelector(selectMessagesStatus);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { id, value } = e.target;
		dispatch(updateComposeField({ field: id === 'recipient' ? 'recipient' : id, value }));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// All fields required
		if (!composeForm.recipient.trim() || !composeForm.subject.trim() || !composeForm.message.trim()) {
			toast.error('All fields are required.');
			return;
		}
		dispatch(sendMessageStart());
		try {
			dispatch(
				addMessage({
					id: Date.now(),
					sender: 'You',
					subject: composeForm.subject,
					snippet: composeForm.message,
					time: 'Just now',
					read: false
				})
			);
			dispatch(sendMessageSuccess());
			toast.success('Message sent!');
			dispatch(resetComposeForm());
		} catch {
			dispatch(sendMessageFailure('Failed to send message'));
			toast.error('Failed to send message.');
		}
	};

	return (
		<div className="mt-36 min-h-screen p-2 lg:mt-auto lg:ml-40 lg:p-6">
			<h1 className="mb-8 text-3xl font-bold text-gray-200">Messages</h1>
			<div className="max-h-[80vh] overflow-y-auto rounded-xl bg-gray-800 p-6 shadow-sm">
				<h2 className="font-inter mb-4 text-xl font-semibold text-gray-200">Your Inbox</h2>
				{messages.length > 0 ? (
					<ul className="w-full max-w-[80vw] divide-y divide-gray-700 overflow-x-auto">
						{messages.map((message) => (
							<li
								key={message.id}
								className={`flex items-center justify-between rounded-lg px-2 py-4 transition-colors duration-150 hover:bg-gray-700 ${!message.read ? 'bg-gray-700/30' : ''}`}
							>
								<div className="flex items-center">
									<input
										type="checkbox"
										className="form-checkbox mr-3 h-4 w-4 rounded border-gray-600 bg-gray-900 text-indigo-400"
										checked={!!message.read}
										onChange={() => dispatch(markAsRead(message.id))}
									/>
									<div className="flex-1">
										<p className="font-inter text-sm font-medium text-gray-300">{message.sender}</p>
										<p className="font-inter text-sm text-gray-300">{message.subject}</p>
										<p className="font-inter truncate text-xs text-gray-400">{message.snippet}</p>
									</div>
								</div>
								<div className="flex items-center gap-2">
									<span className="font-inter text-xs text-gray-500">{message.time}</span>
									<button
										className="ml-2 text-xs text-red-400 hover:text-red-600"
										onClick={() => dispatch(deleteMessage(message.id))}
										title="Delete"
										type="button"
									>
										Delete
									</button>
								</div>
							</li>
						))}
					</ul>
				) : (
					<div className="py-10 text-center">
						<MessageSquare size={48} className="mx-auto mb-3 text-gray-500" />
						<p className="font-inter text-gray-400">No new messages.</p>
					</div>
				)}
			</div>

			<div className="mt-6 rounded-xl bg-gray-800 p-6 shadow-sm">
				<h2 className="font-inter mb-4 text-xl font-semibold text-gray-200">Compose New Message</h2>
				<form className="space-y-4" onSubmit={handleSubmit}>
					<div>
						<label htmlFor="recipient" className="font-inter block text-sm font-medium text-gray-300">
							To:
						</label>
						<input
							type="text"
							id="recipient"
							className="font-inter mt-1 block w-full rounded-md border border-gray-700 bg-gray-900 p-2 text-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
							placeholder="Recipient"
							value={composeForm.recipient}
							onChange={handleInputChange}
							required
						/>
					</div>
					<div>
						<label htmlFor="subject" className="font-inter block text-sm font-medium text-gray-300">
							Subject:
						</label>
						<input
							type="text"
							id="subject"
							className="font-inter mt-1 block w-full rounded-md border border-gray-700 bg-gray-900 p-2 text-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
							placeholder="Subject"
							value={composeForm.subject}
							onChange={handleInputChange}
							required
						/>
					</div>
					<div>
						<label htmlFor="message" className="font-inter block text-sm font-medium text-gray-300">
							Message:
						</label>
						<textarea
							id="message"
							rows={5}
							className="font-inter mt-1 block w-full rounded-md border border-gray-700 bg-gray-900 p-2 text-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
							placeholder="Your message here..."
							value={composeForm.message}
							onChange={handleInputChange}
							required
						></textarea>
					</div>
					<button
						type="submit"
						className="font-inter inline-flex cursor-pointer justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
						disabled={status === 'sending'}
					>
						{status === 'sending' ? 'Sending...' : 'Send Message'}
					</button>
				</form>
			</div>
		</div>
	);
};

export default MessagesPage;
