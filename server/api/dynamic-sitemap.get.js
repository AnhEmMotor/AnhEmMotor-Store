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

    const productEntries = (productSlugs || []).map((slug) => ({
      loc: `/product/${slug}`,
      lastmod: new Date().toISOString(),
      changefreq: "daily",
      priority: 0.8,
    }));

    const customPages = [
      { loc: "/bang-gia", changefreq: "weekly", priority: 0.5 },
      { loc: "/so-sanh", changefreq: "weekly", priority: 0.5 },
    ];

    return [...productEntries, ...customPages];
  } catch {
    return [];
  }
});
