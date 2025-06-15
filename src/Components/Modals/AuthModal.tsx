'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { closeModal } from '@/redux/slices/AuthModalSlice';
import LoginModal from './LoginModal';
import SignUpModal from './SignUpModal';
import { useEffect } from 'react';

export default function AuthModals() {
	const { open, type } = useSelector((state: RootState) => state.authmodal);
	const dispatch = useDispatch();
	const handleClose = () => dispatch(closeModal());

	useEffect(() => {
		if (!open) return;
		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') handleClose();
		};
		window.addEventListener('keydown', onKeyDown);
		return () => window.removeEventListener('keydown', onKeyDown);
	}, [open, dispatch]);

	return (
		<>
			{type === 'login' && <LoginModal open={open} onClose={handleClose} />}
			{type === 'signup' && <SignUpModal open={open} onClose={handleClose} />}
		</>
	);
}
