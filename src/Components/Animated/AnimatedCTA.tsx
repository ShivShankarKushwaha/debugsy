'use client';
import React from 'react';
import { motion } from 'framer-motion';

const sectionVariants = {
	hidden: { opacity: 0, y: 50 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			type: 'spring' as const,
			damping: 12,
			stiffness: 100,
			duration: 0.8
		}
	}
};

const AnimatedCTA: React.FC = () => (
	<section className="bg-gray-900 px-4 py-20 text-center md:px-12">
		<motion.div
			initial="hidden"
			whileInView="visible"
			viewport={{ once: false, amount: 0.1 }}
			variants={sectionVariants}
			className="mx-auto max-w-4xl"
		>
			<h3 className="mb-6 text-4xl font-extrabold text-emerald-400">Ready to Ship Flawless Software?</h3>
			<p className="mb-10 text-xl text-gray-300">Join thousands of developers who trust DEBUGSY Tracker to keep their projects on track.</p>
			<div className="flex flex-col justify-center gap-6 sm:flex-row">
				<motion.a
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					href="/dashboard/overview"
					className="cursor-pointer rounded-lg border border-transparent bg-gradient-to-r from-emerald-600 to-green-700 px-10 py-4 text-lg font-semibold text-white shadow-xl transition-all duration-300 ease-in-out hover:from-emerald-700 hover:to-green-800 focus:ring-4 focus:ring-emerald-500 focus:ring-offset-2 focus:outline-none sm:text-xl"
				>
					Get Started for Free
				</motion.a>
				<motion.button
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					className="cursor-pointer rounded-lg border border-emerald-500 bg-transparent px-10 py-4 text-lg font-semibold text-emerald-300 shadow-xl transition-all duration-300 ease-in-out hover:bg-emerald-900 hover:text-white focus:ring-4 focus:ring-emerald-500 focus:ring-offset-2 focus:outline-none sm:text-xl"
				>
					Contact Sales
				</motion.button>
			</div>
		</motion.div>
	</section>
);

export default AnimatedCTA;
