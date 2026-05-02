export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig(event);
	const apiUrl = config.internalApiUrlForServer || "http://localhost:5000";

	try {
		const response = await $fetch(`${apiUrl}/api/v1/Product/sitemap-slugs`, {
			headers: {
				"X-Forwarded-For": "127.0.0.1",
			},
		});

		const { productSlugs } = response;

		if (!productSlugs || !Array.isArray(productSlugs)) {
			return [];
		}

		return productSlugs.map((slug) => {
			return {
				loc: `/product/${slug}`,
				lastmod: new Date().toISOString(),
				changefreq: "daily",
				priority: 0.8,
			};
		});
	} catch (error) {
		console.error("Error fetching sitemap slugs:", error);
		return [];
	}
});
