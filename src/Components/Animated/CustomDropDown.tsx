'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CustomDropdownProps {
	onSelect?: (role: string) => void;
	initialRole?: string;
	options: string[];
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({ onSelect, initialRole = 'Developer', options }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedRole, setSelectedRole] = useState(initialRole);
	const dropdownRef = useRef<HTMLDivElement>(null);

	// Close dropdown when clicking outside
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setIsOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const handleSelectRole = (role) => {
		setSelectedRole(role);
		setIsOpen(false);
		if (onSelect) {
			onSelect(role);
		}
	};

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	const dropdownVariants = {
		hidden: { opacity: 0, y: -10, scaleY: 0.8, transition: { duration: 0.2, ease: 'easeOut' } },
		visible: { opacity: 1, y: 0, scaleY: 1, transition: { duration: 0.2, ease: 'easeOut' } }
	};

	return (
		<div className="font-inter relative" ref={dropdownRef}>
			<button
				type="button"
				onClick={toggleDropdown}
				className="flex w-full items-center justify-between rounded-lg border border-gray-600 bg-gray-700 px-4 py-2 text-white shadow-sm transition-all duration-200 ease-in-out hover:bg-gray-600 focus:border-transparent focus:ring-2 focus:ring-emerald-500 focus:outline-none"
				aria-haspopup="listbox"
				aria-expanded={isOpen}
			>
				<span>{selectedRole}</span>
				<motion.svg
					className="ml-2 h-5 w-5 text-gray-300"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
					initial={{ rotate: 0 }}
					animate={{ rotate: isOpen ? 180 : 0 }}
					transition={{ duration: 0.2 }}
				>
					<path
						fillRule="evenodd"
						d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
						clipRule="evenodd"
					/>
				</motion.svg>
			</button>

			<AnimatePresence>
				{isOpen && (
					<motion.ul
						variants={dropdownVariants}
						initial="hidden"
						animate="visible"
						exit="hidden"
						className="absolute z-10 mt-2 max-h-60 w-full overflow-auto rounded-lg border border-gray-600 bg-gray-700 shadow-lg focus:outline-none"
						role="listbox"
					>
						{options.map((role) => (
							<motion.li
								key={role}
								onClick={() => handleSelectRole(role)}
								className="mx-1 my-1 cursor-pointer rounded-md px-4 py-2 text-white transition-colors duration-150 hover:bg-emerald-700"
								role="option"
								aria-selected={selectedRole === role}
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
							>
								{role}
							</motion.li>
						))}
					</motion.ul>
				)}
			</AnimatePresence>
		</div>
	);
};

export default CustomDropdown;
