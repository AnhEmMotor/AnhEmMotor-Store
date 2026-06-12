import { getImageUrl } from "~/utils/image";

const newsMapper = {
	mapNewsList(rawItems) {
		if (!rawItems || !Array.isArray(rawItems)) return [];
		return rawItems.map((item) => this.mapNewsItem(item));
	},

	mapNewsItem(raw) {
		const date = raw.createdAt || raw.publishedAt || raw.date || raw.publishedDate;
		let formattedDate = "";
		if (date) {
			try {
				const d = new Date(date);
				if (!isNaN(d.getTime())) {
					formattedDate = d.toLocaleDateString("vi-VN");
				}
			} catch {
				
			}
		}
		if (!formattedDate && raw.date) {
			formattedDate = raw.date;
		}

		const summary = raw.summary || raw.excerpt || raw.shortDescription || raw.description || "";

		return {
			id: raw.id,
			title: raw.title,
			slug: raw.slug,
			summary: summary,
			excerpt: summary, // Used by some components
			content: raw.content,
			image: getImageUrl(raw.coverImageUrl || raw.image || raw.thumbnail || "/assets/image/placeholder-news.webp"),
			category: raw.categoryName || raw.category?.name || raw.category || "Tin tức",
			author: raw.authorName || "AnhEm Motor",
			createdAt: raw.createdAt || raw.publishedDate,
			publishedAt: raw.publishedDate || raw.publishedAt || raw.createdAt,
			date: formattedDate || raw.publishedDate, 
			featured: raw.isFeatured || raw.featured || false,
			isHot: raw.isHot || false,
		};
	},


	mapNewsDetail(raw) {
		if (!raw) return null;
		return {
			...this.mapNewsItem(raw),
			related: this.mapNewsList(raw.relatedNews || []),
			linkedProducts: raw.linkedProducts || [],
		};
	},
};

export default newsMapper;
