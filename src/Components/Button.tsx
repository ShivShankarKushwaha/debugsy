import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	text: string;
	loadingText?: string;
	loading?: boolean;
}

export const PrimaryButton: React.FC<ButtonProps> = ({ text, loadingText, loading = false, disabled = false, className = '', ...props }) => {
	return (
		<button
			className={`flex w-full transform cursor-pointer justify-center rounded-lg border border-transparent bg-gradient-to-r from-emerald-500 to-green-600 px-4 py-3 text-base font-semibold text-white shadow-sm transition-all duration-200 ease-in-out hover:scale-105 hover:from-emerald-600 hover:to-green-700 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:outline-none disabled:opacity-70 ${className}`}
			disabled={disabled || loading}
			{...props}
		>
			{loading ? (
				<div className="relative flex h-full min-h-6 w-full flex-col items-center justify-center space-y-4">
					<div className="absolute h-12 w-12 translate-y-1.5 animate-spin rounded-full border-t-2 border-b-2 border-emerald-300"></div>
					<p className="text-lg text-gray-200">{loadingText}</p>
				</div>
			) : (
				text
			)}
		</button>
	);
};

export const SecondaryButton: React.FC<ButtonProps> = ({ text, loadingText, loading = false, disabled = false, className = '', ...props }) => {
	return (
		<button
			className={`cursor-pointer rounded-lg border border-emerald-500 px-4 py-2 font-medium text-emerald-300 transition-colors duration-200 ease-in-out hover:bg-emerald-900 ${className}`}
			disabled={disabled || loading}
			{...props}
		>
			{loading ? (
				<div className="relative flex h-full min-h-6 w-full flex-col items-center justify-center space-y-4">
					<div className="absolute h-12 w-12 translate-y-1.5 animate-spin rounded-full border-t-2 border-b-2 border-emerald-300"></div>
					<p className="text-lg text-gray-200">{loadingText}</p>
				</div>
			) : (
				text
			)}
		</button>
	);
};
