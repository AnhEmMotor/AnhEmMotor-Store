export const apps = [
	{
		name: "anhemmotor-store",
		script: "./.output/server/index.mjs",
		env: {
			PORT: 5002,
			NUXT_PUBLIC_API_URL_FOR_BROWSER_CLIENT:
				process.env.NUXT_PUBLIC_API_URL_FOR_BROWSER_CLIENT,
			NUXT_INTERNAL_API_URL_FOR_SERVER:
				process.env.NUXT_INTERNAL_API_URL_FOR_SERVER,
		},
		autorestart: true,
		watch: false,
		max_memory_restart: "1G",
	},
];
