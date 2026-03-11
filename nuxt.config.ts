import tailwindcss from "@tailwindcss/vite";
import svgLoader from "vite-svg-loader";

export default defineNuxtConfig({
	compatibilityDate: "2025-07-15",
	devtools: { enabled: true },

	modules: ["@nuxtjs/seo", "@nuxt/content"],

	vite: {
		plugins: [(tailwindcss as any)(), (svgLoader as any)()],
	},

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
