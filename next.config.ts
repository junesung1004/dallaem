// next.config.js
module.exports = {
	eslint: {
		ignoreDuringBuilds: true,
	},
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'sprint-fe-project.s3.ap-northeast-2.amazonaws.com',
				port: '',
				pathname: '/**',
			},
		],
	},
};
