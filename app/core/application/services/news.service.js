

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
			return (data.items || []).map(item => ({
				id: item.id,
				title: item.title,
				slug: item.slug,
				image: item.image || item.thumbnail || "/assets/image/placeholder-news.webp",
				content: item.content,
				excerpt: item.excerpt || item.shortDescription || item.description || "",
				category: item.category?.name || item.category || "Tin tức",
				createdAt: item.createdAt || new Date(),
				date: item.date || (item.createdAt ? new Date(item.createdAt).toLocaleDateString('vi-VN') : 'Mới nhất'),
				isHot: !!item.isHot,
				featured: !!item.featured
			}));
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
				data: (data.items || []).map(item => ({
					id: item.id,
					title: item.title,
					slug: item.slug,
					image: item.image || item.thumbnail || "/assets/image/placeholder-news.webp",
					content: item.content,
					excerpt: item.excerpt || item.shortDescription || item.description || "",
					category: item.category?.name || item.category || "Tin tức",
					createdAt: item.createdAt || new Date(),
					date: item.date || (item.createdAt ? new Date(item.createdAt).toLocaleDateString('vi-VN') : 'Mới nhất'),
					isHot: !!item.isHot,
					featured: !!item.featured
				})),
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
			const item = await newsRepository.getNewsDetail(slug);
			if (!item) return null;
			return {
				id: item.id,
				title: item.title,
				slug: item.slug,
				image: item.image || item.thumbnail || "/assets/image/placeholder-news.webp",
				content: item.content,
				excerpt: item.excerpt || item.shortDescription || item.description || "",
				category: item.category?.name || item.category || "Tin tức",
				createdAt: item.createdAt || new Date(),
				date: item.date || (item.createdAt ? new Date(item.createdAt).toLocaleDateString('vi-VN') : 'Mới nhất'),
				isHot: !!item.isHot,
				featured: !!item.featured,
				related: (item.relatedNews || []).map(r => ({
					id: r.id,
					title: r.title,
					slug: r.slug,
					image: r.image || r.thumbnail || "/assets/image/placeholder-news.webp",
					category: r.category?.name || r.category || "Tin tức",
					date: r.date || (r.createdAt ? new Date(r.createdAt).toLocaleDateString('vi-VN') : 'Mới nhất')
				}))
			};
		} catch (error) {
			console.error(`Service: Failed to fetch news detail for ${slug}:`, error);
			return null;
		}
	},
};
