import { newsData } from "~/core/domain/constants/news";

/**
 * Infrastructure Layer - News Repository
 */
export const newsRepository = {
	async getNews(params = {}) {
		// Mock delay
		await new Promise(resolve => setTimeout(resolve, 500));
		
		let items = [...newsData];

		// Lọc tin tức nổi bật nếu được yêu cầu
		if (params.isFeatured) {
			items = items.filter(n => n.featured);
		}

		const page = params.page || 1;
		const pageSize = params.pageSize || 10;
		const totalCount = items.length;
		const totalPages = Math.ceil(totalCount / pageSize);

		// Cắt mảng lấy đúng số lượng phần tử của trang hiện tại
		const start = (page - 1) * pageSize;
		const end = start + pageSize;
		const paginatedItems = items.slice(start, end);

		return {
			items: paginatedItems,
			totalCount,
			totalPages,
			pageNumber: page,
			pageSize
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
