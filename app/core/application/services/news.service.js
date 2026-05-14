

/**
 * Application Layer - News Service
 */
export const newsService = {
	async getFeaturedNews() {
		try {
			const data = await newsRepository.getNews({
				pageSize: 3,
				isFeatured: true,
				sorts: "-createdAt",
			});
			return (data.items || []).map(item => new News(item));
		} catch (error) {
			console.error("Service: Failed to fetch featured news:", error);
			return [];
		}
	},

	async getAllNews(params = {}) {
		try {
			const data = await newsRepository.getNews({
				page: params.page || 1,
				pageSize: params.pageSize || 10,
				sorts: "-createdAt",
				...params,
			});
			return {
				data: (data.items || []).map(item => new News(item)),
				pagination: {
					totalCount: data.totalCount,
					totalPages: data.totalPages,
					pageNumber: data.pageNumber,
					pageSize: data.pageSize,
				},
			};
		} catch (error) {
			console.error("Service: Failed to fetch news list:", error);
			return { data: [], pagination: {} };
		}
	},

	async getNewsBySlug(slug) {
		try {
			const data = await newsRepository.getNewsDetail(slug);
			return data ? new News(data) : null;
		} catch (error) {
			console.error(`Service: Failed to fetch news detail for ${slug}:`, error);
			return null;
		}
	},
};
