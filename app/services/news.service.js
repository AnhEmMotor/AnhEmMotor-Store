import { newsData } from "@/constants/news";

export const newsService = {
	getFeaturedNews: async () => {
		return newsData.filter((news) => news.featured);
	},

	getAllNews: async (params = {}) => {
		const { page = 1, pageSize = 10 } = params;
		const start = (page - 1) * pageSize;
		const end = start + pageSize;

		const data = newsData.slice(start, end);
		const totalCount = newsData.length;
		const totalPages = Math.ceil(totalCount / pageSize);

		return {
			data,
			pagination: {
				totalCount,
				totalPages,
				pageNumber: page,
				pageSize,
			},
		};
	},

	getNewsBySlug: async (slug) => {
		const news = newsData.find((n) => n.slug === slug);
		if (!news) return null;

		const related = newsData.filter((n) => n.id !== news.id).slice(0, 4);

		return {
			...news,
			related,
		};
	},
};
