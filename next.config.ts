import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'placehold.co',
				port: '',
				pathname: '/**'
			},
			{
				protocol: 'https',
				hostname: 'lh3.googleusercontent.com',
				port: '',
				pathname: '/**'
			},
			{
				protocol: 'https',
				hostname: 'developers.google.com',
				port: '',
				pathname: '/**'
			}
		],
		dangerouslyAllowSVG: true
	}
};

export default nextConfig;
