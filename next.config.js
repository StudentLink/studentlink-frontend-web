/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				port: '',
				hostname: 'media.licdn.com',
				pathname: '/**',
			},
		],
	},
	webpack(config) {
		config.experiments = {
			...config.experiments,
			topLevelAwait: true,
		};
		return config;
	},
	env: {
		API_URL: process.env.API_URL,
	},
	headers: async () => {
		return [
			{
				source: '/:path*',
				headers: [
					{
						key: 'Access-Control-Allow-Origin',
						value: '*',
					},
				],
			},
		];
	},
};

module.exports = nextConfig;
