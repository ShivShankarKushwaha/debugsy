'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { MoveLeft } from 'lucide-react';

const containerVariants = {
	hidden: { opacity: 0, y: 50 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			type: 'spring',
			damping: 15,
			stiffness: 100,
			staggerChildren: 0.2
		}
	}
};

const itemVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0 }
};

const buttonVariants = {
	hover: { scale: 1.05 },
	tap: { scale: 0.95 }
};

const NOTFOUND = () => {
	return (
		<div className="font-inter flex min-h-screen items-center justify-center bg-gray-900 p-4 text-white">
			<motion.div className="max-w-2xl text-center" variants={containerVariants} initial="hidden" animate="visible">
				<motion.h1
					className="mb-6 bg-gradient-to-r from-emerald-400 to-green-600 bg-clip-text text-9xl leading-none font-extrabold text-transparent md:text-[180px]"
					variants={itemVariants}
				>
					404
				</motion.h1>

				{/* Not Found Message */}
				<motion.h2 className="mb-4 text-4xl font-bold text-white md:text-5xl" variants={itemVariants}>
					Page Not Found
				</motion.h2>

				{/* Descriptive Text */}
				<motion.p className="mx-auto mb-8 max-w-xl text-lg text-gray-400 md:text-xl" variants={itemVariants}>
					Oops! It looks like you&apos;ve ventured into uncharted digital territory. The page you&apos;re looking for doesn&apos;t exist.
				</motion.p>

				<motion.a
					href="/"
					variants={buttonVariants}
					whileHover="hover"
					whileTap="tap"
					className="inline-flex items-center justify-center rounded-lg border border-transparent bg-gradient-to-r from-emerald-600 to-green-700 px-8 py-3 text-lg font-semibold text-white shadow-xl transition-all duration-300 ease-in-out hover:from-emerald-700 hover:to-green-800 focus:ring-4 focus:ring-emerald-500 focus:ring-offset-2 focus:outline-none"
				>
					<MoveLeft className="mr-2 h-5 w-5 scale-y-150" />
					Go to Homepage
				</motion.a>
			</motion.div>
		</div>
	);
};

export default NOTFOUND;
