import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import svgLoader from "vite-svg-loader";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

export default defineNuxtConfig({
	ssr: true,
	compatibilityDate: "2025-07-15",
	// Force reload to pick up new components and public assets
	devtools: { enabled: true },
	srcDir: "app",

	build: {
		transpile: ["@tanstack/vue-query"],
	},

	modules: [
		"@nuxtjs/seo",
		"@nuxt/content",
		"@pinia/nuxt",
		"@nuxt/eslint-config",
		"@nuxt/eslint",
		"@nuxt/icon",
	],
	icon: {
		clientBundle: {
			scan: true,
		},
		serverBundle: "auto",
        collections: ['ph', 'lucide', 'fa6-solid', 'fa6-regular']
	},

	sitemap: {
		zeroRuntime: true,
	},
	ogImage: {
		zeroRuntime: true,
	},

	vite: {
		optimizeDeps: {
			include: [
				"@vue/devtools-core",
				"@vue/devtools-kit",
				"@tanstack/vue-query",
				"vue3-toastify",
				"@microsoft/fetch-event-source",
				"@tanstack/vue-query-devtools",
				"axios",
			],
		},
		ssr: {
			noExternal: ["@tanstack/vue-query"],
		},
		plugins: [
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(tailwindcss as any)(),
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			(svgLoader as any)(),
			{
				apply: "build",
				name: "vite-plugin-quiet-build",
				configResolved(config) {
					const originalOnWarn = config.build.rollupOptions.onwarn;
					config.build.rollupOptions.onwarn = (warning, warn) => {
						const silentCodes = ["SOURCEMAP_BROKEN", "UNUSED_EXTERNAL_IMPORT"];
						const silentMessages = [
							"cache-driver.js",
							"virtual:#nitro-internal-virtual/storage",
							"module-preload-polyfill",
						];

						if (
							silentCodes.includes(warning.code || "") ||
							silentMessages.some((msg) => warning.message?.includes(msg))
						) {
							return;
						}

						if (originalOnWarn) {
							originalOnWarn(warning, warn);
						} else {
							warn(warning);
						}
					};
				},
			},
		],
		build: {
			sourcemap: false,
		},
	},

	plugins: ["~/plugins/vue-query.js", "~/plugins/toast.js"],

	nitro: {
		externals: {
			trace: false,
		},
		rollupConfig: {
			onwarn(warning, warn) {
				const silentCodes = ["CIRCULAR_DEPENDENCY"];
				const silentMessages = [
					"cache-driver.js",
					"virtual:#nitro-internal-virtual/storage",
					"node_modules/nitropack",
				];

				if (
					silentCodes.includes(warning.code || "") ||
					silentMessages.some((msg) => warning.message?.includes(msg))
				) {
					return;
				}
				warn(warning);
			},
		},
		routeRules: {
			"/contact": { redirect: "/support" },
			"/news/**": { swr: 3600 },
			"/api/v1/**": {
				proxy: "http://localhost:7001/api/v1/**",
			},
			"/assets/**": {
				headers: { "Cache-Control": "public, max-age=31536000, immutable" },
			},
		},
		compressPublicAssets: true,
	},

	css: ["~/assets/main.css"],

	app: {
		head: {
			charset: "utf-8",
			viewport: "width=device-width, initial-scale=1",
			link: [
				{
					rel: "icon",
					type: "image/x-icon",
					href: "/favicon.ico",
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
					href: "https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap",
				},
			],
			script: [],
		},
	},

	site: {
		url: "https://anhemmotor.online",
		name: "Anh Em Motor",
		description:
			"Chuyên cung cấp xe máy, phụ tùng, phụ kiện chính hãng | AnhEm Motor",
		defaultLocale: "vi",
		twitterCard: "summary_large_image",
		canonical: "https://anhemmotor.online",
	},

	runtimeConfig: {
		internalApiUrlForServer: process.env.NUXT_INTERNAL_API_URL_FOR_SERVER,
		public: {
			apiUrlForBrowserClient:
				process.env.NUXT_PUBLIC_API_URL_FOR_BROWSER_CLIENT,
		},
	},

	alias: {
		"@/stores": "./app/core/application/stores",
		"@/services": "./app/core/application/services",
		"@/mappers": "./app/core/application/mappers",
		"@/constants": "./app/core/domain/constants",
		"@/utils": "./app/core/domain/utils",
		"~/stores": "./app/core/application/stores",
		"~/services": "./app/core/application/services",
		"~/mappers": "./app/core/application/mappers",
		"~/constants": "./app/core/domain/constants",
		"~/utils": "./app/core/domain/utils",
	},

	imports: {
		dirs: [
			"core/domain/constants/**",
			"core/domain/utils/**",
			"core/application/services/**",
			"core/application/stores/**",
			"core/application/mappers/**",
			"core/infrastructure/repositories/**",
			"core/domain/models/**",
		],
	},


});
