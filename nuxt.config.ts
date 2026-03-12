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
		public: {
			apiBaseUrl: "",
		},
	},
});
