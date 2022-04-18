/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	async rewrites() {
		return [
			{
				source: '/api/openai/manifesto',
				destination: 'https://seeding-the-future-next.vercel.app/api/openai/manifesto',
			},
		];
	},
};

module.exports = nextConfig;
