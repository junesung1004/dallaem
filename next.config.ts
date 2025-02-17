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
				hostname: 'plus.unsplash.com',
				port: '',
				pathname: '/*',
			},
		],
	},
};
