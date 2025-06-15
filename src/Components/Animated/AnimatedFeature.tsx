'use client';
import React from 'react';
import { motion } from 'framer-motion';

const sectionVariants = {
	hidden: { opacity: 0, y: 50 },
	visible: { opacity: 1, y: 0, transition: { type: 'spring', damping: 12, stiffness: 100, duration: 0.8 } }
};

const itemVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const AnimatedFeatures: React.FC = () => (
	<section className="bg-gray-850 px-4 py-0 sm:py-20 md:px-12">
		<motion.div
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, amount: 0.1 }}
			variants={sectionVariants}
			className="mx-auto max-w-6xl text-center"
		>
			<h3 className="mb-4 text-4xl font-extrabold text-emerald-400">Key Features</h3>
			<p className="mb-12 text-lg text-gray-300">Everything you need to keep your software bug-free and your team productive.</p>
			<div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
				<motion.div
					variants={itemVariants}
					className="rounded-xl border border-gray-700 bg-gray-800 p-8 shadow-lg transition-colors duration-200 hover:border-emerald-600"
				>
					<div className="mb-4 text-5xl text-emerald-500">
						<svg className="mx-auto h-12 w-12" fill="currentColor" viewBox="0 0 24 24">
							<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
						</svg>
					</div>
					<h4 className="mb-3 text-2xl font-bold text-white">Intuitive Bug Reporting</h4>
					<p className="text-gray-400">Log new issues quickly with rich details, attachments, and clear categorization.</p>
				</motion.div>
				<motion.div
					variants={itemVariants}
					className="rounded-xl border border-gray-700 bg-gray-800 p-8 shadow-lg transition-colors duration-200 hover:border-emerald-600"
				>
					<div className="mb-4 text-5xl text-emerald-500">
						<svg className="mx-auto h-12 w-12" fill="currentColor" viewBox="0 0 24 24">
							<path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm-1 7V3.5L18.5 9H13z" />
						</svg>
					</div>
					<h4 className="mb-3 text-2xl font-bold text-white">Centralized Tracking</h4>
					<p className="text-gray-400">Monitor bug status, assignments, and priorities in a unified dashboard.</p>
				</motion.div>
				<motion.div
					variants={itemVariants}
					className="rounded-xl border border-gray-700 bg-gray-800 p-8 shadow-lg transition-colors duration-200 hover:border-emerald-600"
				>
					<div className="mb-4 text-5xl text-emerald-500">
						<svg className="mx-auto h-12 w-12" fill="currentColor" viewBox="0 0 24 24">
							<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8.59 10 17z" />
						</svg>
					</div>
					<h4 className="mb-3 text-2xl font-bold text-white">Efficient Resolution</h4>
					<p className="text-gray-400">Collaborate with your team, assign tasks, and push fixes seamlessly.</p>
				</motion.div>
				<motion.div
					variants={itemVariants}
					className="rounded-xl border border-gray-700 bg-gray-800 p-8 shadow-lg transition-colors duration-200 hover:border-emerald-600"
				>
					<div className="mb-4 text-5xl text-emerald-500">
						<svg className="mx-auto h-12 w-12" fill="currentColor" viewBox="0 0 24 24">
							<path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-4 0c1.66 0 2.99-1.34 2.99-3S13.66 5 12 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-4 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5c-1.66 0-3 1.34-3 3s1.34 3 3 3z" />
						</svg>
					</div>
					<h4 className="mb-3 text-2xl font-bold text-white">Actionable Insights</h4>
					<p className="text-gray-400">Generate reports and analytics to understand your bug trends and team performance.</p>
				</motion.div>
				<motion.div
					variants={itemVariants}
					className="rounded-xl border border-gray-700 bg-gray-800 p-8 shadow-lg transition-colors duration-200 hover:border-emerald-600"
				>
					<div className="mb-4 text-5xl text-emerald-500">
						<svg className="mx-auto h-12 w-12" fill="currentColor" viewBox="0 0 24 24">
							<path d="M20 6h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM10 4h4v2h-4V4zm10 15H4V8h16v11z" />
						</svg>
					</div>
					<h4 className="mb-3 text-2xl font-bold text-white">Customizable Workflows</h4>
					<p className="text-gray-400">Adapt the tracker to your team&apos;s specific processes and project needs.</p>
				</motion.div>
				<motion.div
					variants={itemVariants}
					className="rounded-xl border border-gray-700 bg-gray-800 p-8 shadow-lg transition-colors duration-200 hover:border-emerald-600"
				>
					<div className="mb-4 text-5xl text-emerald-500">
						<svg className="mx-auto h-12 w-12" fill="currentColor" viewBox="0 0 24 24">
							<path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
						</svg>
					</div>
					<h4 className="mb-3 text-2xl font-bold text-white">Seamless Team Collaboration</h4>
					<p className="text-gray-400">Assign, comment, and discuss issues in real-time with your team.</p>
				</motion.div>
			</div>
		</motion.div>
	</section>
);

export default AnimatedFeatures;
