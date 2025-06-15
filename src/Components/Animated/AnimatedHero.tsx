'use client';
import React from 'react';
import { motion } from 'framer-motion';

const sectionVariants = {
	hidden: { opacity: 0, y: 50 },
	visible: { opacity: 1, y: 0, transition: { type: 'spring', damping: 12, stiffness: 100, duration: 0.8 } }
};

const AnimatedHero: React.FC = () => (
	<section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-gray-950 to-gray-800 px-4 py-0 sm:py-20 md:px-12">
		<div
			className="absolute top-0 left-0 hidden h-full w-full bg-cover bg-no-repeat opacity-10 sm:block"
			style={{ backgroundImage: "url('https://placehold.co/1920x1080/0d0d0d/2E8B57?text=DETECTING_BUG🕷️🕷️🕷️')" }}
		></div>
		<motion.div initial="hidden" animate="visible" variants={sectionVariants} className="z-10 max-w-4xl text-center">
			<h2 className="mb-6 bg-gradient-to-r from-emerald-300 to-emerald-600 bg-clip-text text-4xl leading-tight font-extrabold text-transparent md:text-7xl">
				Effortless Bug Tracking. Flawless Software Delivery.
			</h2>
			<p className="mb-10 leading-relaxed text-gray-300 sm:text-xl md:text-2xl">
				Revolutionize your development workflow. Identify, track, and resolve issues faster with DEBUGSY Tracker – your ultimate solution for project
				quality.
			</p>
			<div className="flex flex-col justify-center gap-6 sm:flex-row">
				<motion.a
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					href="/dashboard/overview"
					className="cursor-pointer rounded-lg border border-transparent bg-gradient-to-r from-emerald-600 to-green-700 px-10 py-4 text-lg font-semibold text-white shadow-xl transition-all duration-300 ease-in-out hover:from-emerald-700 hover:to-green-800 focus:ring-4 focus:ring-emerald-500 focus:ring-offset-2 focus:outline-none sm:text-xl"
				>
					Start Free Trial
				</motion.a>
				<motion.button
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					className="cursor-pointer rounded-lg border border-emerald-500 bg-transparent px-10 py-4 text-lg font-semibold text-emerald-300 shadow-xl transition-all duration-300 ease-in-out hover:bg-emerald-900 hover:text-white focus:ring-4 focus:ring-emerald-500 focus:ring-offset-2 focus:outline-none sm:text-xl"
				>
					Learn More
				</motion.button>
			</div>
		</motion.div>
	</section>
);

export default AnimatedHero;
