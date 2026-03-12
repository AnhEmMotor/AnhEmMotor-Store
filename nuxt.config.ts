import tailwindcss from "@tailwindcss/vite";
import svgLoader from "vite-svg-loader";

export default defineNuxtConfig({
	compatibilityDate: "2025-07-15",
	devtools: { enabled: true },

	modules: [
		"@nuxtjs/seo",
		"@nuxt/content",
		"@pinia/nuxt",
		"@nuxt/eslint-config",
		"@nuxt/eslint",
	],

	sitemap: {
		zeroRuntime: true,
	},

	vite: {
		plugins: [
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(tailwindcss as any)(),
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(svgLoader as any)(),
		],
		build: {
			sourcemap: false,
		},
	},

	plugins: ["~/plugins/vue-query.js", "~/plugins/toast.js"],

	css: ["~/assets/main.css"],

	app: {
		head: {
			charset: "utf-8",
			viewport: "width=device-width, initial-scale=1",
			link: [
				{
					rel: "stylesheet",
					href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css",
					integrity:
						"sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg==",
					crossorigin: "anonymous",
					referrerpolicy: "no-referrer",
				},
				{
					rel: "preconnect",
					href: "https://fonts.googleapis.com",
				},
				{
					rel: "preconnect",
					href: "https://fonts.gstatic.com",
					crossorigin: "anonymous",
				},
				{
					rel: "stylesheet",
					href: "https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap",
				},
			],
		},
	},

	site: {
		url: "https://anhemmotor.vn",
		name: "AnhEm Motor",
		description:
			"Chuyên cung cấp xe máy, phụ tùng, phụ kiện chính hãng | AnhEm Motor",
		defaultLocale: "vi",
	},

	runtimeConfig: {
		apiServerUrl: "",
		public: {
			apiBaseUrl: "",
		},
	},
});
