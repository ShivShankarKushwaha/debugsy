import AnimatedCTA from '@/Components/Animated/AnimatedCTA';
import AnimatedFeatures from '@/Components/Animated/AnimatedFeature';
import AnimatedHero from '@/Components/Animated/AnimatedHero';
import React from 'react';

const Homepage = () => {
	return (
		<>
			<section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-gray-950 to-gray-800 px-4 py-20 md:px-12">
				<div
					className="absolute top-0 left-40 hidden h-full w-full bg-cover bg-no-repeat opacity-10 sm:block"
					style={{ backgroundImage: "url('https://placehold.co/1920x1080/0d0d0d/2E8B57?text=DETECTING_BUG🐞🐛🪲')" }}
				></div>

				<AnimatedHero />
			</section>

			<section className="bg-gray-850 px-4 py-20 md:px-12">
				<AnimatedFeatures />
			</section>

			<section className="bg-gray-900 px-4 py-20 text-center md:px-12">
				<AnimatedCTA />
			</section>
		</>
	);
};

export default Homepage;
