export const newsService = {
	async getNewsCategories() {
		try {
			const data = await newsRepository.getNewsCategories();
			return (data.items || data || []).map((item) => ({
				id: item.id,
				name: item.name,
				slug: item.slug,
				icon: item.icon || "ph:newspaper-fill", // Default icon
			}));
		} catch {
			return [];
		}
	},

	async getFeaturedNews() {
		try {
			const data = await newsRepository.getNews({
				pageSize: 3,
				isFeatured: true,
				sorts: "-createdAt",
			});
			return (data.items || []).map((item) => ({
				id: item.id,
				title: item.title,
				slug: item.slug,
				image:
					item.coverImageUrl ||
					item.image ||
					item.thumbnail ||
					"/assets/image/placeholder-news.webp",
				content: item.content,
				category:
					item.categoryName ||
					item.category?.name ||
					item.category ||
					"Tin tức",
				createdAt: item.publishedDate || item.createdAt || new Date(),
				date: item.publishedDate
					? new Date(item.publishedDate).toLocaleDateString("vi-VN")
					: item.date ||
						(item.createdAt
							? new Date(item.createdAt).toLocaleDateString("vi-VN")
							: "Mới nhất"),
				isHot: !!item.isHot,
				featured: !!item.featured,
			}));
		} catch {
			return [];
		}
	},

	async getLatestNews() {
		try {
			const data = await newsRepository.getLatestNews();
			return (data || []).map((item) => ({
				id: item.id,
				title: item.title,
				slug: item.slug,
				image:
					item.coverImageUrl ||
					item.image ||
					item.thumbnail ||
					"/assets/image/placeholder-news.webp",
				content: item.content,
				category:
					item.categoryName ||
					item.category?.name ||
					item.category ||
					"Tin tức",
				createdAt: item.publishedDate || item.createdAt || new Date(),
				date: item.publishedDate
					? new Date(item.publishedDate).toLocaleDateString("vi-VN")
					: item.date ||
						(item.createdAt
							? new Date(item.createdAt).toLocaleDateString("vi-VN")
							: "Mới nhất"),
				isHot: !!item.isHot,
				featured: !!item.featured,
			}));
		} catch {
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
			const ret = {
				data: (data.items || []).map((item) => ({
					id: item.id,
					title: item.title,
					slug: item.slug,
					image:
						item.coverImageUrl ||
						item.image ||
						item.thumbnail ||
						"/assets/image/placeholder-news.webp",
					content: item.content || "",
					excerpt:
						item.excerpt || item.shortDescription || item.description || "",
					category:
						item.categoryName ||
						item.category?.name ||
						item.category ||
						"Tin tức",
					createdAt: item.publishedDate || item.createdAt || new Date(),
					date: item.publishedDate
						? new Date(item.publishedDate).toLocaleDateString("vi-VN")
						: item.date ||
							(item.createdAt
								? new Date(item.createdAt).toLocaleDateString("vi-VN")
								: "Mới nhất"),
					isHot: !!item.isHot,
					featured: !!item.featured,
				})),
				pagination: {
					totalCount: data.totalCount,
					totalPages: data.totalPages,
					pageNumber: data.pageNumber,
					pageSize: data.pageSize,
				},
			};
			return ret;
		} catch {
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
				image: item.coverImageUrl,
				content: item.content,
				category: item.categoryName,
				publishedDate: new Date(item.publishedDate).toLocaleDateString("vi-VN"),
				linkedProducts: (item.linkedProducts || []).map((p) => ({
					urlSlug: p.urlSlug,
					variantName: p.variantName,
					colorName: p.colorName,
					imageUrl: p.imageUrl,
				})),
			};
		} catch {
			return null;
		}
	},
};
