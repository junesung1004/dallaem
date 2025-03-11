// next.config.js
module.exports = {
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
};
