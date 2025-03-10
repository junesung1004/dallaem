// next.config.js
module.exports = {
	eslint: {
		ignoreDuringBuilds: true,
	},
	env: {
		BASE_URL: process.env.BASE_URL,
	},
	//@ts-ignore
	webpack: (config, { isServer }) => {
		// 서버 사이드에서만 환경 변수를 확인하려면
		if (isServer) {
			console.log('BASE_URL on build: ', process.env.BASE_URL);
		}
		return config;
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
