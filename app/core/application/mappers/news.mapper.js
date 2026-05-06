

const newsMapper = {
	mapNewsList(rawItems) {
		if (!rawItems || !Array.isArray(rawItems)) return [];
		return rawItems.map((item) => this.mapNewsItem(item));
	},

	mapNewsItem(raw) {
		const date = raw.createdAt || raw.publishedAt;
		const formattedDate = date
			? new Date(date).toLocaleDateString("vi-VN")
			: "";

		return {
			id: raw.id,
			title: raw.title,
			slug: raw.slug,
			summary: raw.summary,
			excerpt: raw.summary, // Used by some components
			content: raw.content,
			image: getImageUrl(raw.coverImageUrl || raw.cover_image_url || raw.thumbnailUrl || raw.imageUrl),
			category: raw.categoryName || "Tin tức",
			author: raw.authorName || "AnhEm Motor",
			createdAt: raw.createdAt,
			publishedAt: raw.publishedAt || raw.createdAt,
			date: formattedDate, // Used by NewsCard
			featured: raw.isFeatured || false,
		};
	},


	mapNewsDetail(raw) {
		if (!raw) return null;
		return {
			...this.mapNewsItem(raw),
			related: this.mapNewsList(raw.relatedNews || []),
		};
	},
};

export default newsMapper;
