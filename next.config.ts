// next.config.js
import nextPWA from 'next-pwa';
import 'dotenv/config';

const withPWA = nextPWA({
	dest: 'public',
	register: true,
	skipWaiting: true,
	disable: process.env.BASE_URL === 'development',
});

module.exports = withPWA({
	env: {
		BASE_URL: process.env.BASE_URL,
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
	reactStrictMode: true,
	images: {
		// domains: ['sprint-fe-project.s3.ap-northeast-2.amazonaws.com'],
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'sprint-fe-project.s3.ap-northeast-2.amazonaws.com',
				port: '',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'plus.unsplash.com',
				port: '',
				pathname: '/**',
			},
		],
	},
});
