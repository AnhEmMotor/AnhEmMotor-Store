import { newsData } from "../../domain/constants/news";

/**
 * Infrastructure Layer - News Repository
 */
export const newsRepository = {
	async getNews(params) {
		// Mock delay
		await new Promise(resolve => setTimeout(resolve, 500));
		return {
			data: newsData,
			totalCount: newsData.length,
			pageIndex: 1,
			pageSize: 10
		};
	},

	async getNewsDetail(slug) {
		const news = newsData.find(n => n.slug === slug);
		return news || null;
	},

	async getFeaturedNews() {
		return newsData.filter(n => n.featured);
	}
};
