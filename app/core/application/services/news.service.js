

export const newsService = {
	getFeaturedNews: async () => {
		const axios = useAxios();
		try {
			const { data } = await axios.get("/api/v1/News", {
				params: {
					pageSize: 3,
					isFeatured: true,
					sorts: "-createdAt",
				},
			});
			return data.items || [];
		} catch (error) {
			console.error("Failed to fetch featured news:", error);
			return [];
		}
	},

	getAllNews: async (params = {}) => {
		const axios = useAxios();
		try {
			const { data } = await axios.get("/api/v1/News", {
				params: {
					page: params.page || 1,
					pageSize: params.pageSize || 10,
					sorts: "-createdAt",
					...params,
				},
			});
			return {
				data: newsMapper.mapNewsList(data.items || []),
				pagination: {
					totalCount: data.totalCount,
					totalPages: data.totalPages,
					pageNumber: data.pageNumber,
					pageSize: data.pageSize,
				},
			};
		} catch (error) {
			console.error("Failed to fetch news list:", error);
			return { data: [], pagination: {} };
		}
	},

	getNewsBySlug: async (slug) => {
		const axios = useAxios();
		try {
			const { data } = await axios.get(`/api/v1/News/${slug}`);
			return data;
		} catch (error) {
			console.error(`Failed to fetch news detail for ${slug}:`, error);
			return null;
		}
	},
};



