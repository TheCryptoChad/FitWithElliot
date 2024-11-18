import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'utfs.io',
				pathname: '/a/zhk9o8up8h/*',
			},
		],
	},
};

export default nextConfig;
